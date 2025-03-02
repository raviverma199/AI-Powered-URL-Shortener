import { Request, Response, NextFunction } from "express";
import logger from "../utils/errorlogs";
import { CheckCustomName, isValidURL } from "../utils/helper";
import ExecuteQuery from "../config/db";
import dotenv from "dotenv";
dotenv.config();

interface AuthenticatedRequest extends Request {
    user?: {
        id?: string;
    }
  }

// Controller to Shorten the URL
export const shortUrl = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        let { originalUrl, customName } = req.body;

        if (!originalUrl || !customName) { // if URL is not provided
            return res.status(400).json({ msg: "Please Provide the URL" });
        }

        // Validate the URL
        if(!isValidURL(originalUrl)) {
            return res.status(400).json({ msg: "Invalid URL" });
        }

        // Check if the custom name is provided
        if(!CheckCustomName(customName)) { 
            return res.status(400).json({ msg: "Invalid Custom Name" });
        }

        let userId = req?.user?.id// Get the User ID from the Request
        console.log(userId);

        // Check if the custom name already exists
        let isNameExists = await ExecuteQuery(
            "SELECT customname FROM urls WHERE user_id = $1", 
            [userId]
        );
        if(isNameExists.length > 0) {
            return res.status(400).json({ msg: "Custom Name Already Exists" });
        }

        const shortUrl = `${process.env.BASE_URL}/${customName}`;
        await ExecuteQuery(
          "INSERT INTO urls (original_url, customname, short_url, user_id) VALUES ($1, $2, $3, $4)",
          [originalUrl, customName, shortUrl, userId]
        );

        return res.status(201).json({success: true, shortUrl });


    } catch (error) {
        logger.error(error);
        return res.status(500).json({ msg: "Internal Server Error", error });
    }
}

// Controller to Redirect the Shortened URL
export const redirectUrl = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        let {  customName } = req.params;
        console.log(customName);

        if(!customName) {
            return res.status(400).json({ msg: "Invalid URL" });
        }

        let url = await ExecuteQuery(
            "SELECT original_url FROM urls WHERE customname = $1",
            [customName]
        );

        if(url.length === 0) {
            return res.status(404).json({ msg: "URL Not Found" });
        }
        res.redirect(url[0].original_url);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
}

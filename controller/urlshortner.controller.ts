import { Request, Response, NextFunction } from "express";
import logger from "../utils/errorlogs";
import { CheckCustomName, isValidURL } from "../utils/helper";
import ExecuteQuery from "../config/db";

interface AuthenticatedRequest extends Request {
    user?: unknown;
  }

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

        // Check if the custom name already exists
        let isNameExists = await ExecuteQuery(
            "SELECT customname FROM url_shortener WHERE customname = $1", 
            [customName]
        );
        if(isNameExists.rowCount > 0) {
            return res.status(400).json({ msg: "Custom Name Already Exists" });
        }


        let userId = req?.user// Get the User ID from the Request

    } catch (error) {
        logger.error(error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
}
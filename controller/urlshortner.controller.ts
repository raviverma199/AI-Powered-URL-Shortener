import { Request, Response, NextFunction } from "express";
import logger from "../utils/errorlogs";


export const shortUrl = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        let { originalUrl, customName } = req.body;

        if (!originalUrl || !customName) { // if URL is not provided
            return res.status(400).json({ msg: "Please Provide the URL" });
        }

        try {
            new URL(originalUrl); // Check if the URL is validx
        } catch (error) {
            return res.status(400).json({ msg: "Invalid URL" });// if URL is not valid
        }

    } catch (error) {
        logger.error(error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
}
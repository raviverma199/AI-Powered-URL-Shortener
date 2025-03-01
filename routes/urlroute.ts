import { Router, Request, Response, NextFunction } from "express";
const route = Router();
import { shortUrl } from "../controller/urlshortner.controller";

// Endpoint to handle the URL request
route.post("/shorturl", shortUrl as (req: Request, res: Response, next: NextFunction) => Promise<void>);

export default route;
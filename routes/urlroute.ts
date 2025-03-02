import { Router, Request, Response, NextFunction } from "express";
const route = Router();
import { shortUrl } from "../controller/urlshortner.controller";
import { Authmiddleware } from "../middlewares/authmiddleware"

// Endpoint to handle the URL request
route.post("/shorturl", Authmiddleware, shortUrl as (req: Request, res: Response, next: NextFunction) => Promise<void>);

// Endpoint to handle the Redirect URL
route.get("/:customName", Authmiddleware, shortUrl as (req: Request, res: Response, next: NextFunction) => Promise<void>);

export default route;
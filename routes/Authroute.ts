import { Router, Request, Response, NextFunction } from "express";
import { CreateUser, loginUser } from "../controller/Authcontroller";
import { Authmiddleware } from "../middlewares/authmiddleware"
const route = Router();

// route to handle the auth request
route.post("/register", CreateUser as (req: Request, res: Response, next: NextFunction) => Promise<void>);

// Route to Handle the Login Request
route.post('/login', loginUser as (req: Request, res: Response, next: NextFunction) => Promise<void>);


export default route;
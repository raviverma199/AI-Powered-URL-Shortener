import { Router, Request, Response, NextFunction } from "express";
import { CreateUser, loginUser, logoutUser } from "../controller/Authcontroller";
import { Authmiddleware } from "../middlewares/authmiddleware"
const route = Router();

// route to handle the auth request
route.post("/register", CreateUser as (req: Request, res: Response, next: NextFunction) => Promise<void>);

// Route to Handle the Login Request
route.post('/login', loginUser as (req: Request, res: Response, next: NextFunction) => Promise<void>);

// Route to LogOut the User
route.post('/logout', Authmiddleware, logoutUser as (req: Request, res: Response) => Promise<void>);


export default route;
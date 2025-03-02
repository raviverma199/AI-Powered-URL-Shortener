import jwt from "jsonwebtoken";
import logger from "../utils/errorlogs";
import { Request, Response, NextFunction } from "express";

// Interface for Payload
interface PayLoad {
  id: number;
  username: string;
  useremail: string;
  role?: string;
}

// Fucntion to Assign Token
const AssignToken = (user: PayLoad, res: Response): string => {
  try {
    let Token = jwt.sign(
      {id: user.id, name: user.username, email: user.useremail, role: user?.role ?? "Admin" },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: "1h" }
    );

    res.cookie("authToken", Token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 36000000,
    });
    return Token;
  } catch (error) {
    logger.error(error);
    return null;
  }
};

interface AuthenticatedRequest extends Request {
  user?: unknown;
}

// Function to check the authencatied user
const Authmiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction):void => {
  try {
    let Token = req.cookies.authToken;
    if (!Token) {
      res.status(401).json({ msg: "Provide Token" });
      return
    }

    let decoded = jwt.verify(Token, process.env.JWT_SECRET_KEY as string);
    req.user = decoded;

    next();
  } catch (error) {
    console.error(error);
    logger.error(error);
  }
};

export { AssignToken, Authmiddleware };

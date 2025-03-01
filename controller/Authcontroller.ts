import { Request, Response, NextFunction } from "express";
import ExecuteQuery from "../config/db";
import * as Validator from "validator";
import logger from "../utils/errorlogs";
import { HasedPassword } from "../utils/helper";
import bcrypt from "bcrypt";
import { AssignToken } from "../middlewares/authmiddleware";

export const CreateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    let { name, email, password } = req.body; // Destructuring the Request Body
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, ErrorMsg: "Please provide all the details" });
    }

    if (!Validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, ErrorMsg: "Please provide a valid email" });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        ErrorMsg: "Password must be atleast 6 characters",
      });
    }

    // Check if the user already exists
    const isUserExists = await ExecuteQuery(
      "SELECT useremail FROM user_credentials WHERE useremail = $1",
      [email]
    );

    if (isUserExists.length > 0) {
      return res.json({ message: "User Already Exists" });
    }

    let Hasedpassword = await HasedPassword(password); // Hash the Password

    let qry = `insert 
    into user_credentials (username, useremail, userpassword)
    values ($1, $2, $3)`;
    await ExecuteQuery(qry, [name, email, Hasedpassword]); // Execute the Query with the values

    return res.status(201).json({ message: "User Created Successfully" });
  } catch (error) {
    logger.error(error); // Log the error
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


// Contoller for the Login
export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { email, password } = req.body;

    // Validate request body
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }
    if (!Validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email format." });
    }

    // Fetch user from DB
    const userQuery = await ExecuteQuery(
      "SELECT * FROM user_credentials WHERE useremail = $1",
      [email]
    );
    if (userQuery.length === 0) {
      return res.status(400).json({ message: "Email not registered." });
    }

    const user = userQuery[0].userpassword;

    // Compare password
    const isPasswordMatch = await bcrypt.compare(password, user);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Incorrect password." });
    }

    delete userQuery?.[0].userpassword; // Payload for the Token
    let Token = AssignToken(userQuery?.[0], res); // Assign Token to the User

    // Successful login response
    return res.status(200).json({
      message: "Login successful",
      user: { userQuery: userQuery, Token: Token },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};



export const logoutUser = async (req: Request, res: Response, next: NextFunction):Promise<Response | void> => {
  try {
    res.clearCookie("authToken", {httpOnly: true, secure: true, sameSite: 'strict'}); // Clear the Token

    // Send a success response with proper security headers
    res.setHeader('Cache-Control', 'no-store');

    return res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error(error);
    logger.error(error);
  }
}
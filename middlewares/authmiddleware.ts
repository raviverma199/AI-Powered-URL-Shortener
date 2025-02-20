import jwt from "jsonwebtoken";
import logger from "../utils/errorlogs";

// Interface for Payload
interface PayLoad {
  name: string;
  email: string;
  role?: string;
}

// Fucntion to Assign Token
const AssignToken = (user: PayLoad): string => {
  try {
    let Token = jwt.sign({ name: user.name, email: user.email, role: user.role }, process.env.JWT_SECRET_KEY as string, {expiresIn: "1h"});
    return Token;
  } catch (error) {
    logger.error(error);
    return null;
  }
};

export { AssignToken };

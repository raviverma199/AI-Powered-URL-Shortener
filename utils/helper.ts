import bcrypt from "bcrypt";
import logger from "./errorlogs";

// Function to Hased the Password
async function HasedPassword(password: string): Promise<string> {
  try {
    const salt = await bcrypt.genSalt(10);
    const HasedPassword = await bcrypt.hash(password, salt);
    return HasedPassword;
  } catch (error) {
    logger.error(error); // Log the error
    throw new Error("Error in Hasing the Password");
  }
}



export {  HasedPassword }; 
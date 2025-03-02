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

// Function to check if custom name is correct format
function CheckCustomName(customName: string): boolean {
  try {
    customName = customName.trim();
    if (!/^[a-zA-Z\s]+$/.test(customName)) {
      return false;
    }
    return true;
  } catch (error) {
    logger.error(error); // Log the error
  }
}

// Function to check is URL is valid
function isValidURL(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

export { HasedPassword, CheckCustomName, isValidURL };

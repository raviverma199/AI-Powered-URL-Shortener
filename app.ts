import express, { Application } from "express";
const app: Application = express();
import dotenv from "dotenv";
import helmet from "helmet";
import MainRoute from "./routes/index"
import cookieParser from "cookie-parser";
dotenv.config();

if (!process.env.PORT) {
  throw new Error("Port is not defined");
}
app.use(cookieParser())
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
  app.use(MainRoute);

export default app;

import express, { Application } from "express";
const app: Application = express();
import dotenv from "dotenv";
import helmet from "helmet";
dotenv.config();

if (!process.env.PORT) {
  throw new Error("Port is not defined");
}

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export default app;

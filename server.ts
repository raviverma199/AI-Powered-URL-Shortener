import dotenv from "dotenv";
dotenv.config();
import app from "./app";

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

server.on("error", (error: string) => {
  console.error(error);
  process.exit(1);
});

process.on("SIGINT", () => {
  server.close(() => {
    console.log("Server closed Gracefully");
    process.exit(0);
  });
});

process.on("SIGTERM", () => {
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
});

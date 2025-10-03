import express from "express";
import connectDB from "../src/config/db";
import dotenv from "dotenv";
import user from "./routes/user.routes";
import cors from "cors";
import type { Request, Response } from "express";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: `${process.env.FRONTEND_URL}`,
  })
);

dotenv.config({
  path: ".env",
});

app.use("/api", user);

app.get("/", (_req: Request, res: Response) => {
  res.send("server is running");
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        `server is running on the port http://localhost:${process.env.PORT}`
      );
    });
  })
  .catch((err) => {
    console.log("MongoDb Connection Error", err);
  });

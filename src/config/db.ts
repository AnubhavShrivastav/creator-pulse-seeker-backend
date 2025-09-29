import mongoose from "mongoose";
import dotenv from "dotenv"
import { DB_NAME } from "../constant";

dotenv.config({
  path: "../.env"
})

const connectDB = async () => {
  try {
    const connectionInstances = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    console.log(
      `MongoDB connected !! DB Host: ${connectionInstances.connection.host}`
    );
  } catch (error) {
    console.log("MongoDB connection failed:", error);
    process.exit(1);
  }
};

export default connectDB

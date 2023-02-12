import mongoose from "mongoose";
import logger from "./logger";
const url: string =
  "mongodb+srv://itech:itech@cluster0.buluizv.mongodb.net/test";

const useNewUrlParser: any = { useNewUrlParser: true };

const databaseConnection = async () => {
  try {
    const connection = mongoose.connect(url, useNewUrlParser);
    console.log("database connection successfully!!");
    return connection;
  } catch (error) {
    logger.error("Database connection error");
    console.error(error);
    process.exit(1);
  }
};

export default databaseConnection;

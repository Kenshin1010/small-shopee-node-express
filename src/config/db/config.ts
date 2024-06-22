import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();
export const PORT = process.env.PORT ? parseInt(process.env.PORT) : 5555;
export const mongoDBURL =
  process.env.MONGODB_URL || "mongodb://localhost:27017/default";
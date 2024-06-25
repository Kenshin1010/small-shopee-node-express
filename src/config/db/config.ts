import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();
export const PORT = process.env.PORT;
export const mongoDBURL = process.env.MONGODB_URL!;

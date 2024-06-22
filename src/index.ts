import mongoose from "mongoose";
import { mongoDBURL, PORT } from "./config/db/config";
import { createApp } from "./createApp";

const app = createApp();

// mongoose connection
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");

    // listening server
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error: unknown) => {
    if (error instanceof Error) {
      console.log("Database connection error:", error.message);
    } else {
      console.log("Unknown error:", error);
    }
  });

export default app;

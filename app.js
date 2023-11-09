import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import errorMiddleware from "./middleware/error.js";

const app = express();

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  import("dotenv").then((dotenv) => {
    dotenv.config({ path: "config/config.env" });
  });
}
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// Route Imports
import user from "./routes/userRoutes.js";

app.use("/api/user", user);

// Middleware for Errors
app.use(errorMiddleware);

export { app };

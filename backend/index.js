import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieparser from "cookie-parser";
import cors from "cors";
import connectDB from "./database/dbConfig.js";
import userRoute from "./routes/userRoute.js";
import noteRoute from "./routes/noteRoute.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());
app.use(
  cors({
    origin: ["http://localhost:5173", process.env.FRONTEND_URL],
    credentials: true,
  })
);

app.use("/api/user", userRoute);
app.use("/api/notes", noteRoute);

app.listen(process.env.PORT, () => {
  console.log("Server is started and listening to port: ", process.env.PORT);
  connectDB();
});

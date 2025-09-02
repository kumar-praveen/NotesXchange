import express from "express";
import {
  login,
  logout,
  register,
  verifyEmail,
} from "../controller/userController.js";

const router = express.Router();

router
  .post("/register", register)
  .post("/verify-email", verifyEmail)
  .post("/login", login)
  .get("/logout", logout);

export default router;

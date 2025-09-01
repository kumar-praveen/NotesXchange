import express from "express";
import { login, logout, register } from "../controller/userController.js";

const router = express.Router();

router.post("/register", register).post("/login", login).get("/logout", logout);

export default router;

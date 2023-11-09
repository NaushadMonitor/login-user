import express from "express";
import { loginUser, logout } from "../controllers/userController.js";

const router = express.Router();

router.route("/login").post(loginUser);
router.route("/logout").get(logout);

export default router;
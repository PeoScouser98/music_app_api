import express from "express";
import { activateAccount, getUser, login, refreshToken, register, recoverPassword, resetPassword } from "../controllers/user.controller";
import { checkExpToken } from "../middlewares/checkToken.middleware";

const router = express.Router();
router.get("/user", checkExpToken, getUser);
router.get("/refresh-token/:id", refreshToken);
router.post("/login", login);
router.post("/register", register);
router.post("/activate-account", activateAccount);
router.post("/forgot-password", recoverPassword);
router.post("/reset-password", resetPassword);

export default router;

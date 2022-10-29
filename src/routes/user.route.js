import express from "express";
import {
	activateAccount,
	getUser,
	login,
	refreshToken,
	register,
	recoverPassword,
	resetPassword,
	update,
	list,
	read,
} from "../controllers/user.controller";
import { checkAccessToken } from "../middlewares/checkAuth.middleware";

const router = express.Router();
router.get("/users", list);
router.get("/user", checkAccessToken, getUser);
router.get("/refresh-token/:id", refreshToken);
router.post("/login", login);
router.post("/register", register);
router.post("/activate-account", activateAccount);
router.post("/forgot-password", recoverPassword);
router.post("/reset-password", resetPassword);
router.patch("/user", checkAccessToken, update);
export default router;

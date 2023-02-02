import express from "express";
import {
	activateAccount,
	getUser,
	list,
	login,
	recoverPassword,
	refreshToken,
	register,
	resetPassword,
	update,
} from "../controllers/user.controller";
import { checkAccessToken } from "../middlewares/checkAuth.middleware";

const router = express.Router();

router.get("/users", list);
router.get("/user", checkAccessToken, getUser);
router.get("/refresh-token/:userId", refreshToken);
router.post("/login", login);
router.post("/register", register);
router.get("/activate-account", activateAccount);
router.post("/forgot-password", recoverPassword);
router.post("/reset-password", resetPassword);
router.patch("/user", checkAccessToken, update);

export default router;

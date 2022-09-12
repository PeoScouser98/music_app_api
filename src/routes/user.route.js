import express from "express";
import { activateAccount, getUser, login, refreshToken, register } from "../controllers/user.controller";
import { checkExpToken } from "../middlewares/checkToken";
const router = express.Router();
router.get("/user", getUser);
router.get("/refresh-token/:id", refreshToken);
router.post("/login", login);
router.post("/register", register);
router.post("/activate-account", activateAccount);

export default router;

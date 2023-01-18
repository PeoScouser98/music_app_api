import { create, update, del } from "../controllers/comment.controller";
import { checkAccessToken } from "../middlewares/checkAuth.middleware";
import express from "express";

const router = express.Router();
router.post("/comment", checkAccessToken, create);
router.patch("/comment", checkAccessToken, update);
router.delete("/comment", checkAccessToken, del);

export default router;

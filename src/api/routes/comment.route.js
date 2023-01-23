import { create, update, del } from "../controllers/comment.controller";
import { checkAccessToken } from "../middlewares/checkAuth.middleware";
import express from "express";

const router = express.Router();
router.post("/comments/:trackId", checkAccessToken, create);
router.patch("/comments", checkAccessToken, update);
router.delete("/comments", checkAccessToken, del);

export default router;

import { create, update, del } from "../controllers/comment.controller";
import { requireSignin } from "../middlewares/checkAuth.middleware";
import express from "express";

const router = express.Router();
router.post("/comment", requireSignin, create);
router.patch("/comment", requireSignin, update);
router.delete("/comment", requireSignin, del);

export default router;

import express from "express";
import { list, read, create, update, del } from "../controllers/playlist";
import { requireSignin } from "../middlewares/checkAuth";

const router = express.Router();
router.get("/playlist", requireSignin, list);
router.get("/playlist/:id", requireSignin, read);
router.post("/playlist", create);
router.patch("/playlist/:id", requireSignin, update);
router.delete("/playlist/:id", requireSignin, del);

export default router;

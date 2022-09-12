import express from "express";
import { list, read, create, update, del } from "../controllers/artist.controller";
import { requireSignin } from "../middlewares/checkAuth.middleware";
const router = express.Router();

router.get("/artist", list);
router.get("/artist/:id", read);
router.post("/artist", requireSignin, create);
router.patch("/artist/:id", requireSignin, update);
router.delete("/artist/:id", requireSignin, del);

export default router;

import express from "express";
import { list, read, create, update, del } from "../controllers/genre.controller";
import { requireSignin } from "../middlewares/checkAuth.middleware";
const router = express.Router();

router.get("/genre", list);
router.get("/genre/:id", read);
router.post("/genre", requireSignin, create);
router.patch("/genre/:id", requireSignin, update);
router.delete("/genre/:id", requireSignin, del);

export default router;

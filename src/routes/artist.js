import express from "express";
import { list, read, create, update, del } from "../controllers/artist";
const router = express.Router();

router.get("/artist", list);
router.get("/artist/:id", read);
router.post("/artist", create);
router.patch("/artist/:id", update);
router.delete("/artist/:id", del);

export default router;

import express from "express";
import { list, read, create, update, del } from "../controllers/genre";

const router = express.Router();

router.get("/genre", list);
router.get("/genre/:id", read);
router.post("/genre", create);
router.patch("/genre/:id", update);
router.delete("/genre/:id", del);

export default router;

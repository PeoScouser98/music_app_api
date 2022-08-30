import express from "express";
import { create, del, list, read, update } from "../controllers/album";
import { requireSignin } from "../middlewares/checkAuth";

const router = express.Router();
router.get("/album", list);
router.get("/album/:id", read);
router.create("/album", requireSignin, create);
router.patch("/album/:id", requireSignin, update);
router.delete("/album/:id", requireSignin, del);

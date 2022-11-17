import express from "express";
import { create, del, list, read, update, removeFromAlbum } from "../controllers/album.controller";
import { checkAccessToken, isAdmin } from "../middlewares/checkAuth.middleware";

const router = express.Router();

router.get("/album", list);
router.get("/album/:id", read);
router.post("/album", checkAccessToken, isAdmin, create);
router.patch("/album/:id", checkAccessToken, isAdmin, update);
router.delete("/album/:id", checkAccessToken, isAdmin, del);
router.patch("/album/remove/:id", checkAccessToken, isAdmin, removeFromAlbum);

export default router;

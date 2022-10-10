import express from "express";
import { list, read, create, update, del, albumByArtist, trackByArtist } from "../controllers/artist.controller";
import { checkAccessToken, isAdmin } from "../middlewares/checkAuth.middleware";
const router = express.Router();

router.get("/artist", list);
router.get("/artist/:id", read);
router.post("/artist", checkAccessToken, isAdmin, create);
router.patch("/artist/:id", checkAccessToken, isAdmin, update);
router.delete("/artist/:id", checkAccessToken, isAdmin, del);
router.get("/artist/album/:id", albumByArtist);
router.get("/artist/track/:id", trackByArtist);

export default router;

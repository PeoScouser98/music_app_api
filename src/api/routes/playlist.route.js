import express from "express";
import { list, read, create, update, del, getPlaylistsByUser } from "../controllers/playlist.controller";
import { checkAccessToken } from "../middlewares/checkAuth.middleware";

const router = express.Router();
router.get("/playlists", checkAccessToken, list);
router.get("/playlists/created-by/:userId", getPlaylistsByUser);
router.get("/playlists/:id", read);
router.post("/playlists", checkAccessToken, create);
router.patch("/playlists/:id", checkAccessToken, update);
router.delete("/playlists/:id", checkAccessToken, del);

export default router;

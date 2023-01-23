import express from "express";
import { list, read, create, update, del, listPublicPlaylistsByUser } from "../controllers/playlist.controller";
import { checkAccessToken } from "../middlewares/checkAuth.middleware";

const router = express.Router();
router.get("/playlists", checkAccessToken, list);
router.get("/playlists/created-by/:userId", listPublicPlaylistsByUser);
router.get("/playlists/:id", read);
router.post("/playlists", checkAccessToken, create);
router.patch("/playlists/:id", checkAccessToken, update);
router.delete("/playlists/:id", checkAccessToken, del);

export default router;

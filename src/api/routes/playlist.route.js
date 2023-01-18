import express from "express";
import { list, read, create, update, del, listPublicPlaylistsByUser } from "../controllers/playlist.controller";
import { checkAccessToken } from "../middlewares/checkAuth.middleware";

const router = express.Router();
router.get("/playlist", checkAccessToken, list);
router.get("/playlist/created-by/:userId", listPublicPlaylistsByUser);
router.get("/playlist/:id", read);
router.post("/playlist", checkAccessToken, create);
router.patch("/playlist/:id", checkAccessToken, update);
router.delete("/playlist/:id", checkAccessToken, del);

export default router;

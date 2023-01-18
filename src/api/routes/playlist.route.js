import express from "express";
import { list, read, create, update, del } from "../controllers/playlist.controller";
import { checkAccessToken } from "../middlewares/checkAuth.middleware";

const router = express.Router();
router.get("/playlist", checkAccessToken, list);
router.get("/playlist/:user", checkAccessToken, list);
router.get("/playlist/:id", checkAccessToken, read);
router.post("/playlist", checkAccessToken, create);
router.patch("/playlist/:id", checkAccessToken, update);
router.delete("/playlist/:id", checkAccessToken, del);

export default router;

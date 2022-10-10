import express from "express";
import { list, read, create, update, del } from "../controllers/genre.controller";
import { checkAccessToken } from "../middlewares/checkAuth.middleware";
const router = express.Router();

router.get("/genre", list);
router.get("/genre/:id", read);
router.post("/genre", checkAccessToken, create);
router.patch("/genre/:id", checkAccessToken, update);
router.delete("/genre/:id", checkAccessToken, del);

export default router;

import express from "express";
import { activateAccount, signin, signup } from "../controllers/user";
const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/activate-account", activateAccount);
export default router;

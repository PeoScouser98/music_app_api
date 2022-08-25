import { list, read, create, update, del } from "../controllers/track";
import { checkAuth, isAuth, requireSignin } from "../middlewares/checkAuth";
import express from "express";

const router = express.Router();

router.get("/track", list);
router.get("/track:id", read);
// muốn thêm sửa bài hát thì phải đăng nhập và check quyền tài khoản
router.post("/track", requireSignin, create);
router.patch("/track:id", requireSignin, update);
router.delete("/track:id", requireSignin, del);
export default router;

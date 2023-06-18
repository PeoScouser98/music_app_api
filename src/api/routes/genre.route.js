import express from 'express';
import { list, read, create, update, del } from '../controllers/genre.controller';
import { checkAccessToken } from '../middlewares/checkAuth.middleware';
const router = express.Router();

router.get('/genres', list);
router.get('/genres/:id', read);
router.post('/genres', checkAccessToken, create);
// router.patch("/genres/:id", checkAccessToken, update);
router.patch('/genres/:id', update);
router.delete('/genres/:id', checkAccessToken, del);

export default router;

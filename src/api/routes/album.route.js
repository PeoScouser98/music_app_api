import express from 'express';
import { create, del, list, read, update, removeFromAlbum } from '../controllers/album.controller';
import { checkAccessToken, isAdmin } from '../middlewares/checkAuth.middleware';

const router = express.Router();

router.get('/albums', list);
router.get('/albums/:id', read);
router.post('/albums', checkAccessToken, isAdmin, create);
router.patch('/albums/:id', checkAccessToken, isAdmin, update);
router.delete('/albums/:id', checkAccessToken, isAdmin, del);
router.patch('/albums/remove/:id', checkAccessToken, isAdmin, removeFromAlbum);

export default router;

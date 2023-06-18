import express from 'express';
import { list, read, create, update, del, albumByArtist, trackByArtist } from '../controllers/artist.controller';
import { checkAccessToken, isAdmin } from '../middlewares/checkAuth.middleware';
const router = express.Router();

router.get('/artists', list);
router.get('/artists/:id', read);
router.post('/artists', checkAccessToken, isAdmin, create);
router.patch('/artists/:id', checkAccessToken, isAdmin, update);
router.delete('/artists/:id', checkAccessToken, isAdmin, del);

export default router;

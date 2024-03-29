import * as Collection from '../controllers/collection.controller';
import express from 'express';
import { checkAccessToken } from '../middlewares/checkAuth.middleware';
const router = express.Router();

router.get('/collection/tracks', checkAccessToken, Collection.getTracksCollection);
router.get('/collection/albums', checkAccessToken, Collection.getAlbumsCollection);
router.get('/collection/artists', checkAccessToken, Collection.getArtistsCollection);
router.patch('/collection/tracks', checkAccessToken, Collection.updateTracksCollection);
router.patch('/collection/albums', checkAccessToken, Collection.updateAlbumsCollection);
router.patch('/collection/artists', checkAccessToken, Collection.updateAritstsCollection);

export default router;

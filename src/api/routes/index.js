import express from 'express';
import trackRouter from './track.route';
import userRouter from './user.route';
import artistRouter from './artist.route';
import genreRouter from './genre.route';
import playListRouter from './playlist.route';
import albumRouter from './album.route';
import collectionRouter from './collection.route';
import searchRouter from './search.route';

const router = express.Router();
const appRoutes = [trackRouter, userRouter, artistRouter, genreRouter, playListRouter, albumRouter, collectionRouter, searchRouter];

appRoutes.forEach((route) => router.use(route));

export default router;

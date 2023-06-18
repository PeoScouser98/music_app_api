import express from 'express';
import multer from 'multer';
import {
	uploadTrack,
	deleteTrack,
	list,
	listByUploader,
	listRelatedTracks,
	getOneTrack,
	updateTrack,
} from '../controllers/track.controller';
import { checkAccessToken } from '../middlewares/checkAuth.middleware';
import { checkAudioFileExtension } from '../middlewares/checkFile.middleware';

const router = express.Router();

/* :::::::::::::: Multer config :::::::::::::: */
const upload = multer({
	fileFilter: (req, file, callback) => {
		checkAudioFileExtension(file, callback);
	},
});

router.get('/tracks', list);
router.get('/tracks/user-uploaded', checkAccessToken, listByUploader);
router.get('/tracks/related/:genre', listRelatedTracks);
router.get('/tracks/:id', getOneTrack);
router.post('/tracks', checkAccessToken, upload.any(), uploadTrack);
router.patch('/tracks/:id', checkAccessToken, updateTrack);
router.delete('/tracks/:id', checkAccessToken, deleteTrack);

export default router;

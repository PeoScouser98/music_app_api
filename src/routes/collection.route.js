import * as Collection from "../controllers/collection.controller";
import express from 'express'
import { checkAccessToken } from "../middlewares/checkAuth.middleware"
const router = express.Router()

router.get("/collection/tracks", checkAccessToken, Collection.getTracksCollection)
router.get("/collection/albums", checkAccessToken, Collection.getAlbumsCollection)
router.get("/collection/artists", checkAccessToken, Collection.getArtistsCollection)
router.patch("/collection/tracks/:id", checkAccessToken, Collection.updateTracksCollection)
router.patch("/collection/albums/:id", checkAccessToken, Collection.updateAlbumsCollection)
router.patch("/collection/artists/:id", checkAccessToken, Collection.updateAritstsCollection)

export default router
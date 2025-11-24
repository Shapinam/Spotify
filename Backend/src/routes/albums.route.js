import { Router } from "express";
import { getAllAlbums, getAlbumById } from "../controller/album.controller.js";


const router =Router();

//it can be protected by adding protectRoute so that unauthorised users cannot access
router.get('/',getAllAlbums);
router.get('/:albumId',getAlbumById);

export default router;
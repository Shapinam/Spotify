import { Router } from "express";
import { FeaturedSongs, getAllSongs, MadeForYouSongs, TrendingSongs } from "../controller/song.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";


const router =Router();
router.get('/',protectRoute,requireAdmin,getAllSongs);
router.get('/FeaturedSongs',FeaturedSongs);
router.get('/MadeForYou',MadeForYouSongs);
router.get('/Trending',TrendingSongs);

export default router;
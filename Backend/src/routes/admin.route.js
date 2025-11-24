import { Router } from "express";
import { createSong, deleteSong,createAlbum,deleteAlbum, checkAdmin} from "../controller/admin.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";


const router =Router();
router.use(protectRoute,requireAdmin);
router.get("/checkadmin",checkAdmin);

router.post("/songs",createSong);// /api/admin/songs will check if the user is authenticated and is admin to create a song
router.delete("/songs/:id",deleteSong);

router.post("/albums",createAlbum);// /api/admin/songs will check if the user is authenticated and is admin to create a song
router.delete("/albums/:id",deleteAlbum);

export default router;
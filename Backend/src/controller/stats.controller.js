import {Song} from "../models/song.model.js";
import {Album} from "../models/Album.model.js";
import {User} from "../models/user.model.js";


export const getStats =async (req,res,next)=>{
    try{
        /*const totalSongs =await Song.countDocuments();
        const totalAlbums =await Album.countDocuments();
        const totalUsers =await User.countDocuments();
        */
       const [totalSongs,totalAlbums,totalUsers,UniqueArtists] = await Promise.all([
        Song.countDocuments(),
        Album.countDocuments(),
        User.countDocuments(),
        //Song.distinct("artist")
        Song.aggregate([
        {
            $unionWith:{
                coll:"albums",
                pipeline:[]
            },
        },
            {$group:{_id:"$artist"},},
        {$count :"count",},
    ]),
    ]);
        res.status(200).json({totalAlbums,totalSongs,totalUsers,totalArtists:UniqueArtists[0]?.count || 0});
    
     }catch(error){
        next(error);
    }
};
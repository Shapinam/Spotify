import {Song} from "../models/song.model.js";

export const getAllSongs =async (req,res,next)=>{
    try{
        const songs =await Song.find().sort({createdAt:-1} );
        res.status(200).json(songs);
    
     }catch(error){
        next(error);
    
     }
};
//get 6 random songs
export const FeaturedSongs =async (req,res,next)=>{
    try{
        const songs =await Song.aggregate([
            {
                $sample:{size:6},
            },
            {
                $project:{
                    _id:1,
                    title:1,
                    artist:1,
                    imageUrl:1,
                    audioUrl:1,
                },
            },
        ]);
        res.status(200).json(songs);
    
     }catch(error){
        next(error);
    }
    
};
//get 4 random songs
export const MadeForYouSongs =async (req,res,next)=>{
    try{
        const songs =await Song.aggregate([
            {
                $sample:{size:4},
            },
            {
                $project:{
                    _id:1,
                    title:1,
                    artist:1,
                    imageUrl:1,
                    audioUrl:1,
                },
            },
        ]);
        res.status(200).json(songs);
    
     }catch(error){
        next(error);
    }
};
//get 4 random songs
export const TrendingSongs =async (req,res,next)=>{
    try{
        const songs =await Song.aggregate([
            {
                $sample:{size:4},
            },
            {
                $project:{
                    _id:1,
                    title:1,
                    artist:1,
                    imageUrl:1,
                    audioUrl:1,
                },
            },
        ]);
        res.status(200).json(songs);
    
     }catch(error){
        next(error);
    }
};

//MadeForYouSongs and TrendingSongs are same but it can be changed in the future using ML
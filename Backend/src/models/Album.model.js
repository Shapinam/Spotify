import mongoose from "mongoose";
//declaring the full outline and fields of a specific model in the db 
const AlbumSchema =new mongoose.Schema({
    title: {
        type: String,
        required:true
    },
    artist:{
        type:String,
        required : true
    },
    imageUrl :{
        type:String,
        required: true
    },
    releaseYear :{
        type:Number,
        required: true
    },
    songs :[{type:mongoose.Schema.Types.ObjectId,
        ref:"Song"
    }]
},{timestamps:true}//Created at/ updated at 
);

export const Album = mongoose.model("Album",AlbumSchema);//this is the model that we can export it to actually interact with
import mongoose from "mongoose";
//declaring the full outline and fields of a specific model in the db 
const songSchema =new mongoose.Schema({
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
    audioUrl :{
        type:String,
        required: true
    },
    duration :{
        type : Number,
        required : true
    },
    albumId :{
        type : mongoose.Schema.Types.ObjectId,
        ref :'Album',
        required: false
    }
},{timestamps:true}//Created at/ updated at 
);

export const Song = mongoose.model("Song",songSchema);//this is the model that we can export it to actually interact with
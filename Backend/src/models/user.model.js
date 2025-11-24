import mongoose from "mongoose";
//declaring the full outline and fields of a specific model in the db 
const userSchema =new mongoose.Schema({
    fullName: {
        type: String,
        required:true
    },
    imageUrl:{
        type:String,
        required : true,
    },
    clerkId :{
        type:String,
        required: true,
        unique:true,
    }
},{timestamps:true});

export const User = mongoose.model("user",userSchema);//this is the model that we can export it to actually interact with
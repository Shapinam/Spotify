import mongoose from "mongoose";
//declaring the full outline and fields of a specific model in the db 
const MessageSchema =new mongoose.Schema({
    serverId:{
        type:String,
        required:true
    },
    receiverId:{
        type:String,
        required:true
    },
    content:{
        type: String,
        required: true
    }
},{timestamps:true}//Created at/ updated at 
);

export const Message = mongoose.model("Message",MessageSchema);//this is the model that we can export it to actually interact with
import {User} from "../models/user.model.js";

export const getAllUsers =async (req,res,next)=>{
    try{
        const CurrentUserId = req.auth.userId;
        const users =await User.find({clerkId:{$ne:CurrentUserId}});//get all users except the current user
        res.status(200).json(users);
    
     }catch(error){
        next(error);
    
     }
};
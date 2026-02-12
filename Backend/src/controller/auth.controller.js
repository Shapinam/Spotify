import {User} from "../models/user.model.js";

export const authCallback=async (req,res,next)=>{
    try {
        const {id,firstName,lastName,imageUrl}=req.body;

        //check if user exists
        const user =await User.findOne({clerkId:id});

        //signup mood if the user was not found
        if (!user){
            //save it is the db 
            //each user will be saved in the db once
            await User.create({
                clerkId:id,
                fullName: `${firstName|| ""} ${lastName || ""}`.trim(),
                imageUrl,
            })
        } 

        res.status(200).json({success:true});

    } catch (error) {
        console.log("Error in auth callback",error);
        next(error);
    }
};
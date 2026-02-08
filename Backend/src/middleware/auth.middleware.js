import { clerkClient } from "@clerk/express";



//function/ method to make sure this user is authenticated or not for doing such operation like liking a song ...etc
export const protectRoute = async (req,res,next)=>{
    const auth = req.auth();
    if (!auth.userId){
        res.status(401).json({message: "Unauthorized - you must be logged in"});
        return;
    }
    next();


};
//function if user is admin or not
export const requireAdmin= async (req,res,next)=>{
    try{
        const auth = req.auth();
        const currentUser = await clerkClient.users.getUser(auth.userId);
        const isAdmin = process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress;
        if (!isAdmin){
            return res.status(403).json({message:"unauthorised - you must be an admin"});

        }
        next();

    }catch (error){
        res.status(500).json({message:"internal server error",error});

    }

};
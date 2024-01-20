import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import createError from "../utils/create-error.js";

export const userDelete = async (req, res,next) => {
  const user = await User.findById(req.params.id)
  
    if(req.userId !== user._id.toString()){
        return next(createError(401,"Unauthorized"))
    }
    await User.findByIdAndDelete(req.params.id)
    res.status(200).send("User deleted Successfully")
  
};

export const getSingleUser = async(req,res,next)=>{
  const user = await User.findById(req.params.id)
  if(req.userId !== user._id.toString()){
    return next(createError(401,"Unauthorized"))
}
  res.status(200).send(user)
}

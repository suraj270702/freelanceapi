import jwt from "jsonwebtoken"
import createError from "../utils/create-error.js";

export const verifyToken = async(req,res,next)=>{
    const token = req.cookies.accessToken;
  if (!token) return next(createError(401,"Unauthorized"))
  jwt.verify(token, process.env.JWT_SECRET, async(err, payload) => {
    if (err) return next(createError(403,"Invalid Token"))
    req.userId = payload.id
    req.isSeller = payload.isSeller
    next()
  });
}
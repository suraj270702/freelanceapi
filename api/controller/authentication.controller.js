import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createError from "../utils/create-error.js";

export const registerUser = async (req, res,next) => {
  try {
    const hashPassword = bcrypt.hashSync(req.body.password, 15);
    const newUser = new User({ ...req.body, password: hashPassword });

    await newUser.save();

    res.status(201).send("User has been created successfully");
  } catch(err) {
    next(err)
  }
};

export const loginUser = async (req, res,next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    
    
    if (!user) {
      return next(createError(404,"User not found"))
    }
    const decryptPassword = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!decryptPassword) {
      return next(createError(400,"Invalid username or password"))
    }
    const token = jwt.sign({
      id: user._id,
      isSeller: user.isSeller,
    },process.env.JWT_SECRET);
    const { password, ...userInfo } = user._doc;
    res.cookie("accessToken",token,{
        httpOnly:true
    }).status(200).send(userInfo);
  } catch {
    return next(createError(500,"Internal Server Error"))
  }
};
export const logoutUser = async (req, res) => {
    res.clearCookie('accessToken',{sameSite : "none",secure:true}).status(200).send("Logged out successfully");
};

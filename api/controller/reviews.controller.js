import createError from "../utils/create-error.js";
import Review from "../models/review.model.js"
import Gig from "../models/gig.model.js"


export const createReview = async (req, res, next) => {
    if(req.isSeller){
        return next(createError(403,"Sellers can't create a review"))
    }
    const createReview = new Review({
        userId:req.userId,
        gigId:req.body.gigId,
        desc:req.body.desc,
        star:req.body.star
    })
  try {

    const review = await Review.findOne({
        gigId:req.body.gigId,
        userId:req.userId
    })
    if(review){
    return next(createError(403,'You have already left a review for this gig'))
    }
    const savedReview = await createReview.save()
    await Gig.findByIdAndUpdate(req.body.gigId,{$inc:{totalStars:req.body.star,starNumber:1}})
    res.status(201).send(savedReview)
  } catch (err) {
    next(err);
  }
};

export const deleteReview = async (req, res, next) => {};


export const getReviews = async (req, res, next) => {
    try{
const reviews = await Review.find({gigId:req.params.id})
res.status(201).send(reviews)
    }
    catch(err){
        next(err)
    }
};

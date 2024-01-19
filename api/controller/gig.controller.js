import createError from "../utils/create-error.js";
import Gig from "../models/gig.model.js";
import gigModel from "../models/gig.model.js";

export const createGig = async (req, res, next) => {
  if (!req.isSeller) {
    return next(createError(404, "Only Sellers can create a account"));
  }
  const newGig = new Gig({
    userId: req.userId,
    ...req.body,
  });

  try {
    const savedGig = await newGig.save();
    res.status(201).json(savedGig);
  } catch (err) {
    next(err);
  }
};
export const deleteGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);

    if (gigModel.userId !== req.params.userId) {
      return next(
        createError(403, "You do not have permission to perform this action")
      );
    }

    await Gig.findByIdAndDelete(req.params.id);

    res.status(200).send("Gig deleted successfully");
  } catch (err) {
    next(err);
  }
};
export const getSingleGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);

    if (!gig) {
      return next(createError(404, "Not Found"));
    }

    res.status(200).send(gig);
  } catch (err) {
    next(err);
  }
};
export const getAllGigs = async (req, res, next) => {
  try {
    const q = req.query
    const filters ={
        ...(q.userId && {userId:q.userId}),
        ...(q.cat && {cat:q.cat}),
        ...((q.min || q.max) && {
            price: {
              ...(q.min && { $gte: parseInt(q.min) }),
              ...(q.max && { $lte: parseInt(q.max) }),
            },
          }),
        ...(q.search && {title:{$regex:q.search,$options:"i"}})
    }

    console.log(filters)

    const gigs = await Gig.find(filters);

    if (!gigs) {
      return next(createError(404, "Not Found"));
    }

    res.status(200).send(gigs);
  } catch (err) {
    next(err);
  }
};

import express from "express"
import reviewModel from "../models/reviewModel.js"
import productModel from "../models/productModel.js"

const reviewRouter = express.Router()

//add a review
reviewRouter.post("/add", async (req, res) => {
  const review = new reviewModel({ ...req.body })
  try {
    const addedReview = await review.save()
    await productModel.findByIdAndUpdate(addedReview.productId, {
      $push: { reviews: addedReview._id },
    })
    const allReviews = await reviewModel.find({ productId: req.body.productId })
    res
      .status(201)
      .json({ response: "Added Successfully!!!", reviews: allReviews })

    console.log(allReviews.length)
  } catch (error) {
    console.log(error)
  }
})

///get reviews by id
reviewRouter.get("/:id", async (req, res) => {
  const { id } = req.params
  console.log(id)
  try {
    const allReviewsByProdId = await reviewModel.find({ productId: id })
    if (allReviewsByProdId) {
      res.send(allReviewsByProdId)
      res.end()
    } else {
      res.send("none found")
      return
    }
  } catch (error) {
    console.log(error)
  }
})

export default reviewRouter

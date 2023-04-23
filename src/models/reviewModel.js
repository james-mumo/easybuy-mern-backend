import mongoose from "mongoose"

//Create table for Order
const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    productId: { type: String, required: true },
    profileImage: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String },
    phone: { type: String },
    comment: { type: String },
    rating: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
      default: 1,
    },
  },
  {
    timestamps: true, //for date
  }
)

const reviewModel = mongoose.model("review", OrderSchema)
export default reviewModel

import mongoose from "mongoose"

const productSchema = new mongoose.Schema(
  {
    sellerID: {
      type: String,
      required: true,
      // unique: true,
    },
    sellerName: {
      type: String,
      required: true,
      // unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    shopname: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
    subcategory: {
      type: String,
    },
    brand: {
      type: String,
    },
    quantity: {
      type: Number,
      default: 1,
    },
    description: {
      type: String,
      default: "Add product desc",
      required: true,
    },
    minPurchaseQty: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    reelVideo: {
      type: String,
      // required: true,
    },
    mainImg: {
      type: String,
      default: "../../img/Squish.png",
      // required: true,
      // unique: true,
    },
    otherImgs: {
      type: [String],
      // required: true,
      // unique: true,
    },
    rating: {
      type: String,
      default: 0,
      // required: true,
      // unique: true,
    },
    reviews: {
      type: [Object],
    },
  },
  {
    timestamps: true,
  }
)

const productModel = mongoose.model("product", productSchema)
export default productModel

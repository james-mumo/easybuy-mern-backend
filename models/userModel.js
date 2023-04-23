import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      default: "buyer",
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      // required: true,
      // unique: true,
    },
    shopname: {
      type: String,
      default: "Add your shop name",
      // required: true,
      // unique: true,
    },
    phone: {
      type: String,
      // required: true,
      // unique: true,
    },
    profileImage: {
      type: String,
      default: "../../img/Squish.png",
      // required: true,
      // unique: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
      // required: true,
      // unique: true,
    },
    sellerProducts: {
      type: [String],
    },
    allOrders: {
      type: [String],
    },
    totalEarned: {
      type: String,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

const userModel = mongoose.model("user", userSchema)
export default userModel

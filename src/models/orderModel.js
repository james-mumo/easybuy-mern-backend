import mongoose from "mongoose"

//Create table for Order
const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String },
    phone: { type: String },
    products: { type: [Object], required: true },
    deliveryStatus: {
      type: String,
      enum: ["Delivered", "Pending", "Shipped"],
      default: "Pending",
    },
    paymentStatus: {
      type: String,
      enum: ["Unpaid", "Paid", "Pending"],
      default: "Unpaid",
    },
    total: { type: Number, required: true },
    quantity: { type: Number, required: true },
  },
  {
    timestamps: true, //for date
  }
)

const orderModel = mongoose.model("order", OrderSchema)
export default orderModel

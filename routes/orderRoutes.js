import express from "express"
import orderModel from "../models/orderModel.js"

const orderRouter = express.Router()

//get all orders
orderRouter.get("/", async (req, res) => {
  const allOrders = await orderModel.find({})
  if (allOrders.length < 1) {
    res.status(200).json("No orders found")
    return
  }
  res.status(200).send(allOrders)
  res.end()
  console.log(allOrders)
})
//get all orders by id
orderRouter.get("/:id", async (req, res) => {
  const { id } = req.params
  const userOrders = await orderModel.find({ userId: id })
  if (userOrders.length < 1) {
    res.status(200).json({
      response: "No orders found",
      data: [],
    })
    return
  }
  res.status(201).send({ response: "Order added!!!", data: userOrders })
  res.end()
  console.log(userOrders)
})

//add new orders
orderRouter.post("/add", async (req, res) => {
  console.log(req.body)
  try {
    const newOrder = new orderModel(req.body)
    const savedOrder = await newOrder.save()
    res.status(201).send(savedOrder)
    console.log(savedOrder)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

export default orderRouter

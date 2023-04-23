import express from "express"
import productModel from "../models/productModel.js"

const prodRouter = express.Router()

//add products

//get All Prods
prodRouter.get("/", async (req, res) => {
  try {
    const allProds = await productModel.find({})
    if (allProds) {
      res.status(200).send(allProds)
      res.end()
    } else {
      res.status(500).send("No items fetched!!!")
      return
    }
  } catch (error) {
    console.log(error)
  }
})

//getSingleProduct by its ID
prodRouter.get("/view/:prodId", async (req, res) => {
  const { prodId } = req.params
  try {
    const productItem = await productModel.findById(prodId)
    if (productItem) {
      res.status(200).send(productItem)
      res.end()
    } else {
      res.status(404).send("Item not found!!!")
      return
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({ error: error.message })
    return
  }
})

///get all pros by sellers
prodRouter.get("/:sellerId", async (req, res) => {
  const { sellerId } = req.params
  try {
    const products = await productModel.find({ sellerID: sellerId })
    res.status(200).send(products)
    res.end()
  } catch (error) {
    console.log(error)
    res.status(501).end(error)
    return
  }
})

export default prodRouter

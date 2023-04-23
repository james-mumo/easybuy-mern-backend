import express from "express"
import bcrypt from "bcryptjs"
import { faker } from "@faker-js/faker"
import data from "../data.js"
import productModel from "../models/productModel.js"
import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"

const seedRouter = express.Router()

////Seeed Users
seedRouter.get("/signup", async (req, res) => {
  //   const { count } = req.query // Get the count of records to create from the query parameter
  const count = 15
  const users = []

  const type = ["buyer", "seller"]

  for (let i = 0; i < count; i++) {
    // Generate fake user data using Faker.js
    const username = faker.internet.userName()
    const email = faker.internet.email()
    const password = "fakepass"
    const userType = type[Math.floor(Math.random() * 2)]
    const address = faker.address.city()
    const phone = faker.phone.number("+2547 ## ### ###")
    const profileImage = "../../img/Squish.png"
    const isAdmin = false
    const sellerProducts = []
    const allOrders = []
    const totalEarned = 0

    // Create a new user document with the fake data
    const newUser = new userModel({
      username: username,
      userType: userType,
      email: email,
      address: address,
      password: bcrypt.hashSync(password),
      phone: phone,
      profileImage: profileImage,
      isAdmin: isAdmin,
      sellerProducts: sellerProducts,
      allOrders: allOrders,
      totalEarned: totalEarned,
    })

    // Add the user document to the array of users to be saved
    users.push(newUser)
  }

  try {
    // Use the insertMany method of the Mongoose model to save the array of users to the database
    const savedUsers = await userModel.insertMany(users)
    res.status(200).send(savedUsers)
  } catch (error) {
    console.log(error)
    res.status(500).send("Error creating users")
  }
})

///Seed Products
seedRouter.get("/products", async (req, res) => {
  //   const { count } = req.query // Get the count of records to create from the query parameter
  const count = 10
  const products = []
  const savedProductsIds = []

  const shops = ["BidiBadu", "EasyCapers", "MrMeeks Best Deals"]
  const images = [
    "../../img/Meta Legend.png",
    "../../img/Hooligan.png",
    "../../img/Hooligan.png",
  ]
  const sellerId = [
    "63fa89ada8fc9a1e1c93a0b5",
    "63fa89ada8fc9a1e1c93a0b6",
    "63fa89aea8fc9a1e1c93a0b7",
  ]
  const sellerUsername = ["Donald_Bechtelar", "Donald_Bechtelar", "Meta_Russel"]
  const itemCategory = [
    "Shoes",
    "Accessories",
    "Clothes",
    "Health & Hair Beauty",
    "Kids & Toys",
  ]

  for (let i = 0; i < count; i++) {
    // Generate fake prod data using Faker.js
    // const sellerID = sellers[Math.floor(Math.random() * 4)]
    const sellerID = sellerId[2]
    const sellerName = sellerUsername[2]
    const name = faker.commerce.product()
    const shopname = faker.company.name()
    const category = itemCategory[Math.floor(Math.random() * 5)]
    const subcategory = "Add Sub Category Please"
    const brand = "Add Brand Please"
    const description = faker.lorem.paragraph()
    const minPurchaseQty = Math.floor(Math.random() * 11)
    const price = faker.finance.amount()
    const reelVideo = ""
    const mainImg = images[Math.floor(Math.random() * 2)]
    const otherImgs = [
      mainImg,
      "../../img/Crypto bull.png",
      "../../img/Hooligan.png",
    ]
    const rating = Math.floor(Math.random() * 2)
    const comments = []
    const reviews = []

    // Create a new user document with the fake data
    const newProduct = new productModel({
      sellerID: sellerID,
      name: name,
      sellerName: sellerName,
      shopname: shopname,
      category: category,
      subcategory: subcategory,
      brand: brand,
      description: description,
      minPurchaseQty: minPurchaseQty,
      price: price,
      reelVideo: reelVideo,
      otherImgs: otherImgs,
      comments: comments,
      rating: rating,
      reviews: reviews,
    })

    // Add the user document to the array of users to be saved
    products.push(newProduct)
    savedProductsIds.push(newProduct._id)
  }

  try {
    // Use the insertMany method of the Mongoose model to save the array of users to the database
    const savedProds = await productModel.insertMany(products)
    try {
      await userModel.findByIdAndUpdate(sellerId[2], {
        $push: { sellerProducts: savedProductsIds },
      })
    } catch (error) {
      console.log(error)
    }
    res.status(200).send(savedProds)
  } catch (error) {
    console.log(error)
    res.status(500).send("Error creating products")
  }
})

// seeed from data
seedRouter.get("/data", async (req, res) => {
  //   await userModel.deleteMany({})
  await productModel.deleteMany({})
  //   await orderModel.deleteMany({})

  //   const createdUser = await userModel.insertMany(data.users)
  const createdProducts = await productModel.insertMany(data.products)
  //   const createdCategory = await Category.insertMany(data.category)

  res.send({
    // users: createdUser,
    prods: createdProducts,
    // category: createdCategory,
  })
  res.end()
})

export default seedRouter

import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import userRoutes from "./routes/userRoutes.js"
import seedRoutes from "./routes/seedRoutes.js"
import productRoutes from "./routes/productsRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import reviewsRoutes from "./routes/reviewRoutes.js"

const app = express()
dotenv.config()

//middleware
app.use(cors())
app.use(express.json())

//routes
app.use("/api/seed", seedRoutes)
app.use("/api/user", userRoutes)
app.use("/api/products", productRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/reviews", reviewsRoutes)

app.get("/", (req, res) => {
  res.json({
    ">>>>>>>>": "all seeding routes",
    seed_users: "/api/seed/signup",
    seed_prods: "/api/seed/products",
    seed_data: "/api/seed/data",

    ">>>>>>>>": "all users routes",
    allUsers: "/api/user/all",
    allSellers: "/api/user/?usertype=seller",
    allBuyers: "/api/user/?usertype=buyer",
    singleUser: "/api/user/:id",

    ">>>>>>>": "all products routes",
    allproducts: "/api/products/",
    allProductsBySeller: "/api/products/:sellerId",
    singleProdById: "/api/products/view/:prodId",

    ">>>>>>>>": "all orders routes",
    allOrders: "/api/orders/",
    ordersByUserId: "/api/orders/:id",
    addOrder: "/api/orders/add",

    ">>>>>>>>": "all reviews routes",
    allReviews: "/api/reviews/",
    allReviewsByProdId: "/api/reviews/:id",
    addReview: "/api/reviews/add",
  })
})

//nelfify settings
app.use("/.netlify/functions/api", userRoutes)
app.use("/.netlify/functions/api", productRoutes)

//
mongoose.set("strictQuery", false)

//conn db
const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URL)
    console.log("Connected to MongoDB")
  } catch (error) {
    console.log(error)
    throw error
  }
}

///listening for connections
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB Disconnected")
})

const port = process.env.PORT || 5000

app.listen(port, () => {
  connectDB()
  console.log(`Server running at http://localhost:${port}`)
})

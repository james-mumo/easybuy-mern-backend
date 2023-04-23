import express from "express"
import bcrypt from "bcryptjs"
import userModel from "../models/userModel.js"
import { faker } from "@faker-js/faker"

const userRouter = express.Router()

// Add User
userRouter.post("/auth/signup", async (req, res) => {
  const { email, userType, password, fullname } = req.body

  const newUser = await userModel.findOne({ email: email })

  if (newUser) {
    res.status(500).send({ msg: "User Already Exists" })
    return
  } else {
    const newUser = new userModel({
      ...req.body,
      password: bcrypt.hashSync(password),
    })
    // console.log(newUser);
    const savedUser = await newUser.save()
    res.status(201).send(savedUser)
    console.log(savedUser)
  }
})

//user login
userRouter.post("/auth", async (req, res) => {
  const { email, password } = req.body

  const user = await userModel.findOne({ email: email })
  try {
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        //token
        // const accessToken = jwt.sign(
        //   {
        //     id: user._id,
        //     isAdmin: user.isAdmin,
        //   },
        //   "mySecretKey"
        // );

        res.send(user)
      } else {
        res.send("Pass is wrong")
      }
    } else {
      res.status(401).send({ msg: "user not found" })
      return
    }
  } catch (error) {
    res.end(error)
  }
})

//get all users
userRouter.get("/all", async (req, res) => {
  const users = await userModel.find({})
  if (users) {
    res.status(200).send(users)
    res.end()
  } else {
    console.log("Nothing fetched!")
    res.status(404).send("No data found")
    return
  }
})

//get users based on their types
userRouter.get("/", async (req, res) => {
  const { usertype } = req.query

  const users = await userModel.find({ userType: usertype })
  if (users) {
    res.status(200).send(users)
    res.end()
  } else {
    console.log("nothing fetched!")
    res.status(404).send("No data found")
    return
  }
})

//get a single user
userRouter.get("/:id", async (req, res) => {
  const { id } = req.params
  try {
    const user = await userModel.findById(id)
    if (user) {
      res.send(user)
      res.end()
    } else {
      res.status(404).send("Not found")
    }
  } catch (error) {
    res.send(error)
  }
})

export default userRouter

import bcrypt from "bcryptjs"

const data = {
  users: [
    {
      username: "James Mumo",
      userType: "seller",
      email: "seller1@mail.com",
      password: bcrypt.hashSync("seller1"),
      profileImage: "../../img/Squish.png",
    },
    {
      username: "John Carter",
      userType: "seller",
      email: "seller2@mail.com",
      password: bcrypt.hashSync("seller2"),
      profileImage: "../../img/Squish.png",
    },
    {
      username: "Mike Ruto",
      userType: "buyer",
      email: "buyer@mail.com",
      password: bcrypt.hashSync("buyer"),
      profileImage: "../../img/Squish.png",
    },
  ],

  category: [
    {
      name: "Sport & Outdoor",
    },
    {
      name: "Kids & Toys",
    },
    {
      name: "Health & Hair Beauty",
    },
    {
      name: "Fruits",
    },
  ],

  products: [
    {
      name: "Broccolli",
      category: "Fruits",
      price: 2000,
      brand: "",
      minPurchaseQty: "Kg",
    },
    {
      name: "AstraMan",
      category: "Kids & Toys",
      price: 2000,
      subcategory: "",
      brand: "",
    },
    {
      name: "AstraMan",
      category: "Kids & Toys",
      price: 2000,
      subcategory: "",
      brand: "",
    },
    {
      name: "Nikey Shoes",
      category: "Sport & Outdoor",
      price: 2000,
      subcategory: "",
      brand: "",
    },
  ],
}

export default data

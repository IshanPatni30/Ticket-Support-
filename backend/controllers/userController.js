const bcrypt = require("bcrypt")
const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")

const User = require("../models/userModel")

// Description: register a new user
// @route api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) {
    res.status(400)
    throw new Error("please include all fields")
  }

  //   Find if user already exists
  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400)
    throw new Error("user already exists")
  }

  //   Hash password using bcrypt
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  //  create user
  const user = await User.create({
    name,
    email,
    // iss point pe mistake hui thi
    //  I directly passed hashedPassword which is
    //  not a valid field instead
    // of password:hashedPassword
    password: hashedPassword,
  })
  //   If User was created print these  to postman console
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error("Invalid user data")
  }
})
// Description: login a new user
// @route api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  //   get email, password from the body
  const { email, password } = req.body

  // find if the user exists
  // Yaha galti se await likna bhul gaya jisse ki user create
  // nahi ho paya and mera bcrypt.comapre method bana hi nahi
  const user = await User.findOne({ email })
  //   Check whether password matches
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,

      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error("Invalid Credentials")
  }
})

// Description: get Current user
// @route api/users/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
  const user = {
    id: req.user._id,
    email: req.user.email,
    name: req.user.name,
  }
  res.status(200).json(user)
})

// Generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  })
}

module.exports = {
  registerUser,
  loginUser,
  getMe,
}

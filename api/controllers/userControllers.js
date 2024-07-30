const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// create a new user
const createUser = async (req, res) => {
  const { email, password, name } = req.body;
  // check if user exist or not
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json("This email already exist");
  }
  // hashing password to create new user
  const hashedPassword = bcrypt.hashSync(password, 10);
  // create new user with hashed password
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    role: "GENERAL",
  });
  // save new user to DB
  try {
    const savedUser = await newUser.save();
    res.status(201).json({
      message: "User created successfully",
      user: savedUser,
      success: true,
      error: false,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: err.message || err, error: true, success: false });
  }
};

// login endpoint
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // find user
    const findUser = await User.findOne({ email });
    if (!findUser) {
      return res.status(400).json("Wrong email or password");
    }
    // comparing password
    const passwordMatch = await bcrypt.compare(password, findUser.password);
    if (!passwordMatch) {
      return res.status(400).json("Wrong email or password");
    }
    const tokenData = {
      _id: findUser._id,
      email: findUser.email,
    };
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: 60 * 60 * 8,
    });
    const tokeOptions = {
      httpOnly: true,
      secure: true,
    };
    res.cookie("token", token, tokeOptions).status(200).json({
      message: "Logged in successfully",
      data: findUser,
      success: true,
      error: false,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: err.message || err, error: true, success: false });
  }
};

// logout endpoint
const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(201).json({
      message: "Logged out successfully",
      success: true,
      error: false,
      data: [],
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: err.message || err, error: true, success: false });
  }
};

// get user details
const userDetails = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.status(200).json({
      data: user,
      error: false,
      success: true,
      message: "User details shown successfully",
    });
  } catch (err) {
    res
      .status(400)
      .json({ message: err.message || err, error: true, success: false });
  }
};

// get all users
const allUsers = async (req, res) => {
  try {
    const findAllUsers = await User.find();
    res.status(200).json({
      error: false,
      success: true,
      data: findAllUsers,
      message: "All users shown successfully",
    });
  } catch (err) {
    res
      .status(400)
      .json({ message: err.message || err, error: true, success: false });
  }
};

// make an user as an admin
const updateUser = async (req, res) => {
  try {
    const sessionUser = req.usrId;
    const { userId, role, email, name } = req.body;
    const payload = {
      ...(email && { email: email }),
      ...(name && { name: name }),
      ...(role && { role: role }),
    };
    const user = await User.findById(sessionUser);

    const updateUser = await User.findByIdAndUpdate(userId, payload);
    res.status(200).json({
      data: updateUser,
      message: "User updated successfully",
      success: true,
      error: false,
    });
  } catch (err) {
    res
      .status(400)
      .json({ message: err.message || err, error: true, success: false });
  }
};

module.exports = {
  createUser,
  login,
  logout,
  userDetails,
  allUsers,
  updateUser,
};

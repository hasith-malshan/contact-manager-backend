const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// POST
// Register Users
const registerUser = expressAsyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword);

  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  if (newUser) {
    res.status(201).json({ _id: newUser.id, username, email });
  } else {
    res.status(500);
    throw new Error("Something went wrong user not created");
  }
  res.status(200);
  res.json({ messege: "Register the user" });
});

// POST
// Login Users
const loginUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All Fields are madotory");
  }

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {expiresIn : "1m"}
    );
    res.status(200).json({ accessToken });
  }else{
    res.status(401);
    throw new Error("Email or password is not valid");
  }

  res.json({ messege: "Login user" });
});

// get
// Current Users
// Private Enpoint
const currentUser = expressAsyncHandler(async (req, res) => {
  res.json({ messege: "Current user information" });
});

module.exports = { registerUser, loginUser, currentUser };

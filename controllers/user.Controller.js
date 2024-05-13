const { Error } = require("mongoose");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const formatError = (errors) => {
  const formattedErrors = {};
  let errorMessage = "";

  Object.keys(errors).forEach((key) => {
    formattedErrors[key] = errors[key].map((error) => error.message);
    errorMessage += `${errors[key]
      .map((error) => error.message)
      .join(", ")} (and ${errors[key].length - 1} more errors)`;
  });

  return { message: errorMessage, errors: formattedErrors };
};

//register User
const registerUser = asyncHandler(async (request, response) => {
  const { name, email, phone, password } = request.body;
  const errors = {};
  // Validate name
  if (!name || name.trim().length < 3) {
    errors.name = [{ message: "The name field is required." }];
  }

  // Validate email
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!email || !emailRegex.test(email)) {
    errors.email = [{ message: "Invalid email address" }];
  }

  // Validate phone
  const phoneRegex = /^\d{11}$/; // Assuming a 11-digit phone number
  if (!phone || !phoneRegex.test(phone)) {
    errors.phone = [{ message: "The phone field is required." }];
  }

  if (Object.keys(errors).length > 0) {
    const formattedError = formatError(errors);
    response.status(400);
    throw new Error(JSON.stringify(formattedError));
  }

  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    errors.email = [{ message: "The email has already been taken." }];
    const formattedError = formatError(errors);
    response.status(400);
    throw new Error(JSON.stringify(formattedError));
  }
  //hash password
  const hashPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    phone,
    password: hashPassword,
  });
  console.log("data: " + user);
  const responseData = {
    status: "SUCCESS",
    data: {
      name: user.name,
      email: user.email,
      phone: user.phone,
    },
    message: "User registration successfully done",
  };
  response.status(200).json(responseData);
});

//login User
const loginUser = asyncHandler(async (request, response) => {
  const { email, password } = request.body;
  const errors = {};
  // Validate email
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!email) {
    errors.email = [{ message: "email address is required" }];
  } else if (!emailRegex.test(email)) {
    errors.email = [{ message: "invalid email address" }];
  }
  if (!password) {
    errors.password = [{ message: "password is required" }];
  }

  if (Object.keys(errors).length > 0) {
    const formattedError = formatError(errors);
    response.status(400);
    throw new Error(JSON.stringify(formattedError));
  }

  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          name: user.name,
          email: user.email,
          id: user.id,
        },
      },
      "backend_screet_key",
      { expiresIn: "10m" }
    );
    const responseData = {
      status: "SUCCESS",
      data: {
        token: accessToken,
        expiry: 6,
      },
      message: "Login successfully",
    };
    response.status(200).json(responseData);
  } else {
    const responseData = {
      status: "FAILED",
      message: "Email or Password is Invalid",
    };
    response.status(401).json(responseData);
  }
});

//User Profile
const userProfile = asyncHandler(async (request, response) => {
  response.json({ message: "Profile info" });
});

module.exports = {
  registerUser,
  loginUser,
  userProfile,
};

const { Error } = require("mongoose");
const Product = require("../models/product.model");
const asyncHandler = require("express-async-handler");

//add product
const createProduct = asyncHandler(async (request, response) => {
  const { name, quantity, price, image } = request.body;

  if (!name || !quantity || !price) {
    response.status(400);
    throw new Error("All fields are required");
  }
  const product = await Product.create({
    name,
    quantity,
    price,
    user_id: request.user.id,
  });

  const responseData = {
    status: "SUCCESS",
    data: product,
    message: "Product add successfully",
  };
  response.status(200).json(responseData);
});

//get all products
const getAllProduct = asyncHandler(async (request, response) => {
  const product = await Product.find({ user_id: request.user.id });
  const responseData = {
    status: "SUCCESS",
    data: product,
    message: "Product List",
  };
  response.status(200).json(responseData);
});

//get single products

const getSingleProduct = asyncHandler(async (request, response) => {
  const { id } = request.params;
  const product = await Product.findById(id);
  if (!product) {
    response.status(404);
    throw new Error("Product not found");
  }
  const responseData = {
    status: "SUCCESS",
    data: product,
    message: "Product details",
  };
  response.status(200).json(responseData);
});

//update product

const updateProduct = asyncHandler(async (request, response) => {
  const { id } = request.params;
  const product = await Product.findByIdAndUpdate(id, request.body);
  if (!product) {
    response.status(404);
    throw new Error("Product not found");
  } else {
    const updatedProduct = await Product.findById(id);
    const responseData = {
      status: "SUCCESS",
      data: updatedProduct,
      message: "Product updated",
    };
    response.status(200).json(responseData);
  }
});

//delete product
const deleteProduct = asyncHandler(async (request, response) => {
  const { id } = request.params;
  const product = await Product.findByIdAndDelete(id);
  if (!product) {
    response.status(404);
    throw new Error("Product not found");
  } else {
    response.status(200).json("Product Deleted Successfully!");
  }
});

module.exports = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};

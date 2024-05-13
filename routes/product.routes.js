const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");
const validateToken = require("../middleware/validedTokenHandler");

router
  .route("/")
  .post(validateToken, createProduct)
  .get(validateToken, getAllProduct); //create Single product //get All productr
router
  .route("/:id")
  .get(validateToken, getSingleProduct)
  .put(validateToken, updateProduct)
  .delete(validateToken, deleteProduct); //get Single product //update Single product //delete Single product

module.exports = router;

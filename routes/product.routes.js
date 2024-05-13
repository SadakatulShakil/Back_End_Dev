const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");

router.route("/").post(createProduct).get(getAllProduct); //create Single product //get All productr
router
  .route("/:id")
  .get(getSingleProduct)
  .put(updateProduct)
  .delete(deleteProduct); //get Single product //update Single product //delete Single product

module.exports = router;

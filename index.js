const express = require("express");
const bodyParser = require("body-parser");
const productRoute = require("./routes/product.routes.js");
const userRoute = require("./routes/userRoute.js");
const errorHandler = require("./middleware/errorHandler.js");
const multer = require("multer");
const forms = multer();
const mongoose = require("mongoose");
const app = express();

///Middleware for API

//Url encoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(forms.array());

///Routes
app.use("/api/products", productRoute);
app.use("/api/users", userRoute);
app.use(errorHandler);

mongoose
  .connect(
    "mongodb+srv://sadakatulshakil94:zLz7VjEQnJ5t78JP@cluster0.hwrsnyb.mongodb.net/Node-API?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to MongoDB!");
    app.listen(3000, () => {
      console.log("Hello ! DEV");
    });
  })
  .catch(() => {
    console.log("Failed to Connect MongoDB!");
  });

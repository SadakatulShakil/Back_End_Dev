const { constants } = require("../constans");
const errorHandler = (error, request, response, next) => {
  const statusCode = response.statusCode ? response.statusCode : 500;

  switch (statusCode) {
    case constants.VALIDATION_ERROR: //400
      response.json({
        title: "Validation error !",
        message: error.message,
      });
      break;
    case constants.UNAUTHORIZED: //401
      response.json({
        title: "Unauthorized user !",
        message: error.message,
      });
      break;
    case constants.FORBIDDEN: //403
      response.json({
        title: "Bad data, Unable to process !",
        message: error.message,
      });
      break;
    case constants.NOT_FOUND: //404
      response.json({
        title: "Not found !",
        message: error.message,
      });
      break;
    case constants.SERVER_ERROR: //500
      response.json({
        title: "Server error !",
        message: error.message,
      });
      break;
    default:
      console.log("No error here. ALL are good");
      break;
  }
};

module.exports = errorHandler;

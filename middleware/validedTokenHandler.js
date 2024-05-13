const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (request, response, next) => {
  let token;
  let authHeader =
    request.headers.Authorization || request.headers.authorization;
  if (authHeader) {
    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
      jwt.verify(token, "backend_screet_key", (error, decoded) => {
        if (error) {
          response.status(401);
          throw new Error("User is not authorized!");
        }
        request.user = decoded.user;
        next();
      });
    }
  } else {
    response.status(500);
    throw new Error("Token is required!");
  }
});

module.exports = validateToken;

const errorHandler = require("./errorHandler");
const jwt = require("jsonwebtoken");
require("dotenv").config();

function verifyAdminAuthenticationToken(req, res, next) {
  const adminAccessToken = req.cookies.admin_access_token;
  if (!adminAccessToken) return next(errorHandler(401, "Unauthorized"));
  jwt.verify(adminAccessToken, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) return next(errorHandler(403, "Forbidden"));
    req.verifiedAdminEmail = decoded.email;
    next();
  });
}

module.exports = verifyAdminAuthenticationToken;
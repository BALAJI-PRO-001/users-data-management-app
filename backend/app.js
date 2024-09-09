const express = require("express");
const pageRouter = require("./routes/page.route");
const adminRouter = require("./routes/admin.route");
const cookieParser = require("cookie-parser");
const path = require("path");
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/admin", adminRouter);

app.use(express.static(path.join(__dirname, "../client/public")));
app.use("/", pageRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  res.status(statusCode).json({
    success: false,
    statusCode: statusCode,
    message: message
  });
});



module.exports = app;
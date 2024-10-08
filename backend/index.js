const express = require("express");
const pageRouter = require("./routes/page.route");
const adminRouter = require("./routes/admin.route");
const recordRouter = require("./routes/record.route");
const cookieParser = require("cookie-parser");
const verifyAdminAuthenticationToken = require("./utils/verifyAdminAuthenticationToken");
const path = require("path");
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", adminRouter);
app.use("/api/v1", verifyAdminAuthenticationToken, recordRouter);

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

const HOST = process.env.HOST || "localhost";
const PROTOCOL = process.env.PROTOCOL || "http";
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`);
  console.log("URL: " + `${PROTOCOL}://${HOST}:${PORT}/` )
});
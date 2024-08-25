const express = require("express");
const pageRouter = require("./routes/page.route");
const app = express();

app.use(express.json());

app.use("/", pageRouter);

const HOST = process.env.HOST || "localhost";
const PROTOCOL = process.env.PROTOCOL || "http";
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`);
  console.log("URL: " + `${PROTOCOL}://${HOST}:${PORT}/` )
});
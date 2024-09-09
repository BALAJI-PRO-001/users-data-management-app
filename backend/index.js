const app = require("./app");
const sqlite3 = require("./db/sqlite3");

sqlite3.connect();

const HOST = process.env.HOST || "localhost";
const PROTOCOL = process.env.PROTOCOL || "http";
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`);
  console.log("URL: " + `${PROTOCOL}://${HOST}:${PORT}/` )
});
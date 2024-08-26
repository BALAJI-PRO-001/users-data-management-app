const sqlite3 = require("sqlite3").verbose();

const db = sqlite3.Database("users", (err) => {
  if (err) console.log("Error: " + err.message);
  else console.log("Sqlite3 database connected!");
});

db.serialize(() => {
  db.run();
});
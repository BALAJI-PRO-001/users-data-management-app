const path = require("path");

const USERS_RECORDS_JSON_FILE_PATH = path.join(__dirname, "../data/usersRecords.json");
const RECORDS_CSV_FILE_PATH = path.join(__dirname, "../data/records.csv");
const HEADER_COMPONENT_FILE_PATH = path.join(__dirname, "../../client/views/components/header.component.html");
const INDEX_PAGE_FILE_PATH = path.join(__dirname, "../../client/views/index.html");
const HOME_PAGE_FILE_PATH = path.join(__dirname, "../../client/views/pages/home.html");
const ADD_USER_PAGE_FILE_PATH = path.join(__dirname, "../../client/views/pages/add-user.html");
const SQLITE3_DATABASE_PATH = path.join(__dirname, "../db/sqlite3/db/database.db");


const CSV_WRITER_HEADERS = [
  {id: "userId", title: "USER_ID"},
  {id: "name", title: "NAME"},
  {id: "phoneNumber", title: "PHONE_NUMBER"},
  {id: "address", title: "ADDRESS"},
  {id: "cowNames", title: "COW_NAMES"},
  {id: "recordCreatedAt", title: "DATE_AND_TIME_IN_DB"}
];

module.exports = {
  USERS_RECORDS_JSON_FILE_PATH,
  RECORDS_CSV_FILE_PATH,
  SQLITE3_DATABASE_PATH,
  HEADER_COMPONENT_FILE_PATH,
  INDEX_PAGE_FILE_PATH,
  HOME_PAGE_FILE_PATH,
  ADD_USER_PAGE_FILE_PATH,
  CSV_WRITER_HEADERS
};
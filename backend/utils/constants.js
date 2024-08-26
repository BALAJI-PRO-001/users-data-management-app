const path = require("path");

const USERS_RECORDS_JSON_FILE_PATH = path.join(__dirname, "../data/usersRecords.json");
const HEADER_COMPONENT_FILE_PATH = path.join(__dirname, "../../client/views/components/header.component.html");
const INDEX_PAGE_FILE_PATH = path.join(__dirname, "../../client/views/index.html");
const HOME_PAGE_FILE_PATH = path.join(__dirname, "../../client/views/pages/home.html");
const ADD_USER_PAGE_FILE_PATH = path.join(__dirname, "../../client/views/pages/add-user.html");


module.exports = {
  USERS_RECORDS_JSON_FILE_PATH,
  HEADER_COMPONENT_FILE_PATH,
  INDEX_PAGE_FILE_PATH,
  HOME_PAGE_FILE_PATH,
  ADD_USER_PAGE_FILE_PATH
};
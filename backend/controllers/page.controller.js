const path = require("path");
const fs = require("fs");
const { 
  HEADER_COMPONENT_FILE_PATH,
  INDEX_PAGE_FILE_PATH,
  HOME_PAGE_FILE_PATH,
  ADD_USER_PAGE_FILE_PATH
} = require("../utils/constants");

const headerHTML = fs.readFileSync(HEADER_COMPONENT_FILE_PATH, "utf8");
const indexHTML = fs.readFileSync(INDEX_PAGE_FILE_PATH, "utf8");
const homeHTML = fs.readFileSync(HOME_PAGE_FILE_PATH, "utf-8");
const addUserHTML = fs.readFileSync(ADD_USER_PAGE_FILE_PATH, "utf-8");

function indexPage(req, res) {
  return res.end(indexHTML);
}

function homePage(req, res) {
  return res.end(homeHTML.replace("{{HEADER}}", headerHTML));
}

function addUserPage(req, res) {
  return res.end(addUserHTML.replace("{{HEADER}}", headerHTML));
}

module.exports = {
  indexPage,
  homePage,
  addUserPage
};
const path = require("path");
const fs = require("fs");

const headerHTML = fs.readFileSync(path.join(__dirname, "../../client/views/components/header.component.html"), "utf8");
const indexHTML = fs.readFileSync(path.join(__dirname, "../../client/views/index.html"), "utf8");
const homeHTML = fs.readFileSync(path.join(__dirname, "../../client/views/pages/home.html"), "utf-8");

function indexPage(req, res) {
  return res.end(indexHTML);
}

function homePage(req, res) {
  return res.end(homeHTML.replace("{{HEADER}}", headerHTML));
}

function addUserPage(req, res) {

}

module.exports = {
  indexPage,
  homePage,
  addUserPage
};
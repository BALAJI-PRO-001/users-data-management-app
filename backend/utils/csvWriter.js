const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const { USERS_RECORDS_CSV_FILE_PATH, CSV_WRITER_HEADERS } = require("./constants");

const csvWriter = createCsvWriter({
  path: USERS_RECORDS_CSV_FILE_PATH,
  header: CSV_WRITER_HEADERS,
});

module.exports = csvWriter;
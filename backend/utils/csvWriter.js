const createCsvWriter = require("csv-writer").createObjectCsvWriter;

async function writeRecords({path, header}, arrayOfObjRecords) {
  if (!path || !header) {
    throw new Error("Path or header are null or undefined");
  }

  if (!arrayOfObjRecords) {
    throw new Error("Records is null or undefined");
  }

  const csvWriter = createCsvWriter({
    path: path,
    header: header
  });

  await csvWriter.writeRecords(arrayOfObjRecords);
}

module.exports = {
  writeRecords
};
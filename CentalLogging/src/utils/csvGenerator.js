const fs = require("fs");
const util = require("util");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

const writeFile = util.promisify(fs.writeFile);
module.exports = async function generateCsvLogs(
  csvHeaders,
  fileName,
  Filedata
) {
  const csvWriter = createCsvWriter({
    path: fileName,
    header: csvHeaders,
  });
  await csvWriter.writeRecords(Filedata);
  console.log("createing the file");
  // //   const data = await new Promise((resolve, reject) => {
  // //     writeFile(fileName, "", (err) => {
  // //       if (err) reject(err);
  // //       resolve("Success");
  // //     });
  // //   });
  //   console.log("created the file");
  //   return data;
};

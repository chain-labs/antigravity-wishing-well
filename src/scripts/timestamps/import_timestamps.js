const moment = require("moment/moment")
const fs = require("fs");
const path = require("path");

function convertUnixToDateTime(unixTimestamp) {
    // 2024-07-18 23:30:00
    return moment(unixTimestamp * 1000).format('YYYY-MM-DD HH:mm:ss')
}

const writeFile = (filePath, data) => {
    return new Promise((resolve, reject) => {
      fs.writeFile(filePath, data, "utf8", (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  };

const main = async (timestamps, outputFilePath) => {
    const result = timestamps.map(time => convertUnixToDateTime(time))
    await writeFile(outputFilePath, JSON.stringify(result));
    console.log({result})
}

const timestamps = [1721466000, 1721473200, 1721480400,1721487600, 1721489400, 1721493000]
const outputFilePath = path.join(__dirname, "output.json");

main(timestamps,outputFilePath)
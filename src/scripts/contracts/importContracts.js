const fs = require("fs");
const path = require("path");

const readFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

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

const processData = (data) => {
  const formattedData = data.split("\n").map(text => text.charAt(0).toLowerCase() + text.slice(1));
  const filteredList = formattedData.filter(data => data !== "")
  const contracts = []

  const possibleChains = ['sepolia', 'baseSepolia', 'base', 'pulsechain', 'pulsechainTestnet']

  let currentChain = ""
  let currentObject = {}
  console.log({filteredList})

  filteredList.forEach(data => {
    if (possibleChains.includes(data)) {
      currentChain = data;
      if (currentObject) {
        contracts.push(currentObject)
      }
      currentObject = {}
    } else {
      const parts = data.split(": ")
      currentObject[parts[0]] = parts[1]
    }

  })

  console.log({contracts})
  // console.log({filteredList})
  return JSON.stringify(contracts);
};

const main = async (inputFilePath, outputFilePath) => {
  try {
    const inputData = await readFile(inputFilePath);
    const formattedData = processData(inputData);
    await writeFile(outputFilePath, formattedData);
    console.log(`Data has been formatted and written to ${outputFilePath}`);
  } catch (err) {
    console.error({ err });
  }
};

const inputFilePath = path.join(__dirname, "input_contracts.txt");
const outputFilePath = path.join(__dirname, "output.json");

main(inputFilePath, outputFilePath);

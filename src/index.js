import fs from "fs";
import readline from "readline";
import StockOperationDTO from "./shared/dtos/StockOperationDTO.js";
import OperationService from "./application/services/OperationService.js";

function convertLineToOperations(line) {
  const stockOperationsBatch = JSON.parse(line);
  return stockOperationsBatch.map(
    (stockOperationData) => new StockOperationDTO(stockOperationData)
  );
}

function main() {
  const args = process.argv.slice(2);
  const defaultFilePath = "inputs/input.txt";
  const filePath = args[0] || defaultFilePath;

  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
  }

  const operationService = new OperationService();

  const readLineInterface = readline.createInterface({
    input: fs.createReadStream(filePath),
    output: process.stdout,
    terminal: false,
  });

  readLineInterface.on("line", (line) => {
    if (!line.trim()) {
      return;
    }

    const operations = convertLineToOperations(line);

    if (!operations) {
      return;
    }

    try {
      const result = operationService.process(operations);
      console.log(JSON.stringify(result));
    } catch (error) {
      console.error(`Error processing line: ${line}`);
      console.error(error);
    }
  });

  readLineInterface.on("close", () => {
    console.error("Processing completed.");
  });
}

main();

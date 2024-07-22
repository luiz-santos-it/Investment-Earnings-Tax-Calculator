import fs from 'fs';
import readline from 'readline';
import StockOperationDTO from './shared/dtos/StockOperationDTO.js';
import OperationService from './application/services/OperationService.js';

function convertLineToOperations(line) {
  const stockOperationsBatch = JSON.parse(line);
  return stockOperationsBatch.map(
    (stockOperationData) => new StockOperationDTO(stockOperationData),
  );
}

function main() {
  const args = process.argv.slice(2);
  const defaultFilePath = 'inputs/input.txt';
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

  readLineInterface.on('line', (line) => {
    if (!line.trim()) {
      return null;
    }

    const result = operationService.process(convertLineToOperations(line));

    if (result !== null) {
      console.log(JSON.stringify(result));
    }
  });

  readLineInterface.on('close', () => {
    console.log('Processing completed.');
  });
}

main();

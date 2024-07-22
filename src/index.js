import readline from 'readline';
import StockOperationDTO from './dtos/StockOperationDTO';
import StockOperationProcessor from './processor/StockOperationProcessor';
import OperationService from './services/OperationService';

function main() {
  const operationService = new OperationService();
  const stockProcessor = new StockOperationProcessor(operationService);

  const readLineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
  });

  let lineIndex = 0;
  let batch = [];
  readLineInterface.on('line', (inputLine) => {
    if (!inputLine.trim()) {
      return;
    }

    if (inputLine == 'end') {
      readLineInterface.close();
      return;
    }

    const stockOperationsBatch = JSON.parse(inputLine);

    stockOperationsBatch.forEach((stockOperationData) => {
      if (!batch[lineIndex]) {
        batch[lineIndex] = [];
      }

      batch[lineIndex].push(new StockOperationDTO(stockOperationData));
    });

    lineIndex++;
  });

  readLineInterface.on('close', () => {
    batch.forEach((operations) => {
      console.log(stockProcessor.process(operations));
    });
  });
}

main();

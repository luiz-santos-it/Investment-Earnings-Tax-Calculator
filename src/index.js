import readline from 'readline';
import StockOperationFactories from './factories/StockOperationFactories';

function main() {
  const stockOperationFactories = new StockOperationFactories();
  const stockProcessor = stockOperationFactories.createStockProcessor();

  const readLineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
  });

  let lineIndex = 0;

  readLineInterface.on('line', (inputLine) => {
    if (inputLine.trim()) {
      if (inputLine == 'end') {
        readLineInterface.close();
        return;
      }

      const stockOperationsBatch = JSON.parse(inputLine);
      stockOperationsBatch.forEach((stockOperationData) => {
        stockProcessor.addOperation(
          lineIndex,
          stockOperationFactories.createStockOperationDTO(stockOperationData),
        );
      });

      lineIndex++;
    }
  });

  readLineInterface.on('close', () => {
    const result = stockProcessor.processOperations();
    console.log('🚀 ~ readLineInterface.on ~ result:', result);

    console.log('Stocks processed successfully!');
  });
}

main();

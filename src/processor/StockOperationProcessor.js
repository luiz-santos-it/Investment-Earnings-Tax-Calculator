export default class StockOperationProcessor {
  #operationsBatch;
  #stockOperationFactories;

  constructor(stockOperationFactories) {
    this.#stockOperationFactories = stockOperationFactories;
    this.#operationsBatch = [];
  }

  addOperation(line, operation) {
    if (!this.#operationsBatch[line]) {
      this.#operationsBatch[line] = [];
    }

    this.#operationsBatch[line].push(operation);
  }

  processOperations() {
    let processedOperations = [];

    this.#operationsBatch.forEach((operationTransaction) => {
      const handlerFactory = this.#stockOperationFactories.createOperationHandlerFactory();

      operationTransaction.forEach((operationData) => {
        const handler = handlerFactory.createHandler(operationData.operation);

        if (handler) {
          const processedOperation = handler.handle(operationData);

          console.log(`Processed operation: ${JSON.stringify(processedOperation)}`);
          processedOperations.push(processedOperation);
        }
      });
    });

    return processedOperations;
  }
}

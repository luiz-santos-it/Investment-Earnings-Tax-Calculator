export default class StockOperationProcessor {
  #operationService;

  constructor(operationService) {
    this.#operationService = operationService;
  }

  process(operations) {
    this.#operationService.resetState();
    let results = [];

    operations.forEach((operation) => {
      results.push(this.#operationService.process(operation));
    });

    return results;
  }
}

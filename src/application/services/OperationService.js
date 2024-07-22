import OperationFactory from '../../infra/factories/OperationFactory.js';

export default class OperationService {
  constructor() {
    this.resetState();
  }

  resetState() {
    this.state = {
      averagePrice: 0,
      sharesQuantity: 0,
      totalLoss: 0,
    };
  }

  process(operations) {
    this.resetState();
    let results = [];

    operations.forEach((operation) => {
      const handler = OperationFactory.createOperation(operation.operation);
      results.push(handler.execute(operation, this.state));
    });

    return results;
  }
}

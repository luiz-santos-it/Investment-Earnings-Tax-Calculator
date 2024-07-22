import OperationFactory from '../factories/OperationFactory';

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

  process(operation) {
    const handler = OperationFactory.createOperation(operation.operation);
    return handler.execute(operation, this.state);
  }
}

import OperationType from '../enums/OperationType';
import StandardTaxCalculatorStrategyService from '../services/StandardTaxCalculatorStrategyService';
import BuyOperationHandler from '../handlers/BuyOperationHandler';
import SellOperationHandler from '../handlers/SellOperationHandler';

export default class OperationHandlerFactory {
  #stockService;

  constructor(stockService) {
    this.#stockService = stockService;
  }

  createHandler(operationType) {
    console.log(`Creating handler for operation type: ${operationType}`);
    switch (operationType) {
      case OperationType.BUY:
        return new BuyOperationHandler(this.#stockService);
      case OperationType.SELL:
        return new SellOperationHandler(
          this.#stockService,
          new StandardTaxCalculatorStrategyService(),
        );
      default:
        throw new Error('Invalid operation type');
    }
  }
}

import AbstractStockOperationHandler from './AbstractStockOperationHandler';

export default class BuyOperationHandler extends AbstractStockOperationHandler {
  constructor(stockService) {
    super();
    this.stockService = stockService;
  }

  handle(stockOperation) {
    this.stockService.processBuy(stockOperation.unitCost, stockOperation.quantity);

    return { tax: Number('0.00') };
  }
}

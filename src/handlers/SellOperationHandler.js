import AbstractStockOperationHandler from './AbstractStockOperationHandler';

export default class SellOperationHandler extends AbstractStockOperationHandler {
  constructor(stockService, taxStrategy) {
    super();
    this.stockService = stockService;
    this.taxStrategy = taxStrategy;
  }

  handle(stockOperation) {
    const { totalSaleValue, profit } = this.stockService.processSell(
      stockOperation.unitCost,
      stockOperation.quantity,
    );

    return { tax: this.taxStrategy.calculateTax(totalSaleValue, profit) };
  }
}

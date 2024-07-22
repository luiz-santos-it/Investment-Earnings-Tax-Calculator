import AbstractTaxCalculatorStrategy from './AbstractTaxCalculatorStrategy';

export default class StandardTaxCalculatorStrategyService extends AbstractTaxCalculatorStrategy {
  #transactionExemptionThreshold;

  constructor() {
    super();
    this.#transactionExemptionThreshold = 20000;
  }

  calculateTax(totalSaleValue, gainOrLoss) {
    if (totalSaleValue <= this.#transactionExemptionThreshold || gainOrLoss <= 0) {
      return 0;
    }

    return +(gainOrLoss * 0.2).toFixed(2);
  }
}

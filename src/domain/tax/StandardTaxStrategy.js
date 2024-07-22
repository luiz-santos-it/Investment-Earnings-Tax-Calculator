import TaxStrategy from './TaxStrategy.js';

export default class StandardTaxStrategy extends TaxStrategy {
  #transactionExemptionThreshold;

  constructor() {
    super();
    this.#transactionExemptionThreshold = 20000;
  }

  calculateTax(args) {
    const { totalSaleValue, adjustedProfit } = args;

    if (totalSaleValue <= this.#transactionExemptionThreshold || adjustedProfit <= 0) {
      return 0;
    }

    return +(adjustedProfit * 0.2).toFixed(2);
  }
}

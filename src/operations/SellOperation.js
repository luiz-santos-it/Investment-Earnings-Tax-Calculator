import Operation from './Operation';
import StandardTaxStrategy from '../services/StandardTaxStrategy';

export default class SellOperation extends Operation {
  #taxStrategy;

  constructor(taxStrategy = new StandardTaxStrategy()) {
    super();
    this.#taxStrategy = taxStrategy;
  }

  execute(operation, state) {
    const totalSaleValue = operation.unitCost * operation.quantity;
    const gainOrLoss = (operation.unitCost - state.averagePrice) * operation.quantity;

    state.sharesQuantity -= operation.quantity;

    const adjustedProfit = this.#updateLossAndCalculateAdjustedProfit(gainOrLoss, state);

    return {
      tax: this.#taxStrategy.calculateTax({ totalSaleValue, adjustedProfit }),
    };
  }

  #updateLossAndCalculateAdjustedProfit(gainOrLoss, state) {
    if (gainOrLoss < 0) {
      state.totalLoss += gainOrLoss;
      return 0;
    } else if (gainOrLoss > 0 && state.totalLoss < 0) {
      const adjustedGainOrLoss = gainOrLoss + state.totalLoss;
      state.totalLoss = Math.min(adjustedGainOrLoss, 0);

      return Math.max(adjustedGainOrLoss, 0);
    } else {
      return gainOrLoss;
    }
  }
}

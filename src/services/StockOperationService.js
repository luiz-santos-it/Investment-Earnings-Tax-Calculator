export default class StockOperationService {
  #averagePrice = 0;
  #sharesQuantity = 0;
  #totalLoss = 0;

  constructor() {}

  processBuy(unitCost, quantity) {
    const totalCost = this.#averagePrice * this.#sharesQuantity + unitCost * quantity;
    this.#sharesQuantity += quantity;
    this.#averagePrice = totalCost / this.#sharesQuantity;
  }

  processSell(unitCost, quantity) {
    const totalSaleValue = unitCost * quantity;
    const gainOrLoss = (unitCost - this.#averagePrice) * quantity;
    this.#sharesQuantity -= quantity;
    const adjustedProfit = this.#updateLossAndCalculateAdjustedProfit(gainOrLoss);

    return { totalSaleValue, profit: adjustedProfit };
  }

  #updateLossAndCalculateAdjustedProfit(gainOrLoss) {
    if (gainOrLoss < 0) {
      this.#totalLoss += gainOrLoss;

      return 0;
    } else if (gainOrLoss > 0 && this.#totalLoss < 0) {
      const adjustedGainOrLoss = this.#totalLoss + gainOrLoss;
      this.#totalLoss = Math.min(adjustedGainOrLoss, 0);

      return adjustedGainOrLoss > 0 ? adjustedGainOrLoss : 0;
    }

    return gainOrLoss;
  }
}

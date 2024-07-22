export default class AbstractTaxCalculatorStrategy {
  calculateTax(totalSaleValue, gainOrLoss) {
    throw new Error('You have to implement the method calculateTax!');
  }
}

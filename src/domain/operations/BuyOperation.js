import Operation from "./Operation.js";

export default class BuyOperation extends Operation {
  execute(operation, state) {
    const totalCost =
      state.averagePrice * state.sharesQuantity +
      operation.unitCost * operation.quantity;

    state.sharesQuantity += operation.quantity;

    state.averagePrice = this.roundToTwoDecimals(
      totalCost / state.sharesQuantity
    );

    return {
      tax: 0.0,
    };
  }
}

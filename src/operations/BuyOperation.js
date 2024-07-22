import Operation from './Operation';

export default class BuyOperation extends Operation {
  execute(operation, state) {
    const totalCost =
      state.averagePrice * state.sharesQuantity + operation.unitCost * operation.quantity;

    state.sharesQuantity += operation.quantity;
    state.averagePrice = totalCost / state.sharesQuantity;

    return {
      tax: 0.0,
    };
  }
}

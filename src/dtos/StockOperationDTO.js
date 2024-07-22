export default class StockOperationDTO {
  #operation;
  #unitCost;
  #quantity;

  constructor({ operation, 'unit-cost': unitCost, quantity }) {
    this.#operation = operation;
    this.#unitCost = unitCost;
    this.#quantity = quantity;
  }

  get operation() {
    return this.#operation;
  }

  get unitCost() {
    return this.#unitCost;
  }

  get quantity() {
    return this.#quantity;
  }
}

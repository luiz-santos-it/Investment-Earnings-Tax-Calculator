import { test } from "node:test";
import { strict as assert } from "assert";
import BuyOperation from "#domain/operations/BuyOperation.js";

test("BuyOperation should return tax as 0.00", () => {
  const input = {
    state: { averagePrice: 0, sharesQuantity: 0 },
    operation: { unitCost: 10, quantity: 10000 },
  };

  const result = executeBuyOperation(input.operation, input.state);

  assert.deepEqual(result, { tax: 0.0 });
});

test("BuyOperation should populate empty state", () => {
  const input = {
    state: { averagePrice: 0, sharesQuantity: 0 },
    operation: { unitCost: 20, quantity: 10000 },
  };

  const result = executeBuyOperation(input.operation, input.state);

  assert.deepEqual(input.state, { averagePrice: 20, sharesQuantity: 10000 });
  assert.deepEqual(result, { tax: 0.0 });
});

test("BuyOperation should populate existing state correctly", () => {
  const input = {
    state: { averagePrice: 20, sharesQuantity: 10000 },
    operation: { unitCost: 30, quantity: 300 },
  };

  const result = executeBuyOperation(input.operation, input.state);

  assert.deepEqual(input.state, {
    averagePrice: +((20 * 10000 + 30 * 300) / 10300).toFixed(2),
    sharesQuantity: 10300,
  });
  assert.deepEqual(result, { tax: 0.0 });
});

const executeBuyOperation = (operation, state) =>
  new BuyOperation().execute(operation, state);

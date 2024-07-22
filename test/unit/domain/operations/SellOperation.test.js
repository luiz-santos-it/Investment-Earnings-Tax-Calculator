import { test } from 'node:test';
import { strict as assert } from 'assert';
import SellOperation from '#domain/operations/SellOperation.js';
import StandardTaxStrategy from '#domain/tax/StandardTaxStrategy.js';

test('SellOperation should handle empty state', () => {
  const input = {
    state: { averagePrice: 0, sharesQuantity: 0, totalLoss: 0 },
    operation: { unitCost: 10, quantity: 100 },
  };

  executeSellOperation(input.operation, input.state);
});

test('SellOperation should calculate tax correctly on profit', () => {
  const input = {
    state: { averagePrice: 10, sharesQuantity: 10000, totalLoss: 0 },
    operation: { unitCost: 20, quantity: 5000 },
  };

  const result = executeSellOperation(input.operation, input.state);

  assert.deepEqual(result, { tax: 10000 });
  assert.deepEqual(input.state, { averagePrice: 10, sharesQuantity: 5000, totalLoss: 0 });
});

test('SellOperation should record loss correctly', () => {
  const input = {
    state: { averagePrice: 10, sharesQuantity: 10000, totalLoss: 0 },
    operation: { unitCost: 5, quantity: 5000 },
  };

  const result = executeSellOperation(input.operation, input.state);

  assert.deepEqual(result, { tax: 0 });
  assert.deepEqual(input.state, { averagePrice: 10, sharesQuantity: 5000, totalLoss: -25000 });
});

test('SellOperation should handle break-even correctly', () => {
  const input = {
    state: { averagePrice: 10, sharesQuantity: 10000, totalLoss: 0 },
    operation: { unitCost: 10, quantity: 5000 },
  };

  const result = executeSellOperation(input.operation, input.state);

  assert.deepEqual(result, { tax: 0 });
  assert.deepEqual(input.state, { averagePrice: 10, sharesQuantity: 5000, totalLoss: 0 });
});

test('SellOperation should handle negative quantity', () => {
  const input = {
    state: { averagePrice: 10, sharesQuantity: 10000, totalLoss: 0 },
    operation: { unitCost: 20, quantity: -100 },
  };

  try {
    executeSellOperation(input.operation, input.state);
  } catch (e) {
    assert.ok(e instanceof Error);
  }
});

test('SellOperation should handle selling more shares than available', () => {
  const input = {
    state: { averagePrice: 10, sharesQuantity: 100, totalLoss: 0 },
    operation: { unitCost: 20, quantity: 200 },
  };
  const taxStrategy = new StandardTaxStrategy();

  try {
    executeSellOperation(input.operation, input.state, taxStrategy);
  } catch (e) {
    assert.ok(e instanceof Error);
  }
});

const executeSellOperation = (operation, state) =>
  new SellOperation().execute(operation, state);

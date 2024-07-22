import { test } from 'node:test';
import { strict as assert } from 'assert';
import OperationService from '#application/services/OperationService.js';

test('OperationService should process operations correctly', () => {
  const operationService = new OperationService();

  const input = [
    { operation: 'buy', unitCost: 10, quantity: 10000 },
    { operation: 'sell', unitCost: 20, quantity: 5000 },
  ];

  const results = operationService.process(input);

  assert.deepEqual(results, [{ tax: 0.0 }, { tax: 10000.0 }]);
});

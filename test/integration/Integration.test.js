import assert from 'assert';
import OperationService from '#application/services/OperationService.js';

const createOperation = (operation, unitCost, quantity) => ({ operation, unitCost, quantity });
const createExpectedTaxArray = (taxes) => taxes.map((tax) => ({ tax }));

const testCases = [
  {
    description: 'Caso #1',
    input: [
      createOperation('buy', 10.0, 100),
      createOperation('sell', 15.0, 50),
      createOperation('sell', 15.0, 50),
    ],
    expected: createExpectedTaxArray([0, 0, 0]),
  },
  {
    description: 'Caso #2',
    input: [
      createOperation('buy', 10.0, 10000),
      createOperation('sell', 20.0, 5000),
      createOperation('sell', 5.0, 5000),
    ],
    expected: createExpectedTaxArray([0.0, 10000.0, 0.0]),
  },
  {
    description: 'Caso #3',
    input: [
      createOperation('buy', 10.0, 10000),
      createOperation('sell', 5.0, 5000),
      createOperation('sell', 20.0, 3000),
    ],
    expected: createExpectedTaxArray([0.0, 0.0, 1000.0]),
  },
  {
    description: 'Caso #4',
    input: [
      createOperation('buy', 10.0, 10000),
      createOperation('buy', 25.0, 5000),
      createOperation('sell', 15.0, 10000),
    ],
    expected: createExpectedTaxArray([0, 0, 0]),
  },
  {
    description: 'Caso #5',
    input: [
      createOperation('buy', 10.0, 10000),
      createOperation('buy', 25.0, 5000),
      createOperation('sell', 15.0, 10000),
      createOperation('sell', 25.0, 5000),
    ],
    expected: createExpectedTaxArray([0, 0, 0, 10000.0]),
  },
  {
    description: 'Caso #6',
    input: [
      createOperation('buy', 10.0, 10000),
      createOperation('sell', 2.0, 5000),
      createOperation('sell', 20.0, 2000),
      createOperation('sell', 20.0, 2000),
      createOperation('sell', 25.0, 1000),
    ],
    expected: createExpectedTaxArray([0.0, 0.0, 0.0, 0.0, 3000.0]),
  },
  {
    description: 'Caso #7',
    input: [
      createOperation('buy', 10.0, 10000),
      createOperation('sell', 2.0, 5000),
      createOperation('sell', 20.0, 2000),
      createOperation('sell', 20.0, 2000),
      createOperation('sell', 25.0, 1000),
      createOperation('buy', 20.0, 10000),
      createOperation('sell', 15.0, 5000),
      createOperation('sell', 30.0, 4350),
      createOperation('sell', 30.0, 650),
    ],
    expected: createExpectedTaxArray([0.0, 0.0, 0.0, 0.0, 3000.0, 0.0, 0.0, 3700.0, 0.0]),
  },
  {
    description: 'Caso #8',
    input: [
      createOperation('buy', 10.0, 10000),
      createOperation('sell', 50.0, 10000),
      createOperation('buy', 20.0, 10000),
      createOperation('sell', 50.0, 10000),
    ],
    expected: createExpectedTaxArray([0.0, 80000.0, 0.0, 60000.0]),
  },
];

testCases.forEach(({ description, input, expected }) => {
  console.log(`Running ${description}`);
  const service = new OperationService();
  const result = service.process(input);
  assert.deepStrictEqual(result, expected);
});

import assert from "assert";
import { exec } from "child_process";
import { describe, it } from "node:test";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const entryPoint = path.resolve(__dirname, "../../src/index.js");

const createOperation = (operation, unitCost, quantity) => ({
  operation,
  "unit-cost": unitCost,
  quantity,
});
const createExpectedTaxArray = (taxes) => taxes.map((tax) => ({ tax }));

const testCases = [
  {
    description: "Case #1",
    input: [
      createOperation("buy", 10.0, 100),
      createOperation("sell", 15.0, 50),
      createOperation("sell", 15.0, 50),
    ],
    expected: createExpectedTaxArray([0, 0, 0]),
  },
  {
    description: "Case #2",
    input: [
      createOperation("buy", 10.0, 10000),
      createOperation("sell", 20.0, 5000),
      createOperation("sell", 5.0, 5000),
    ],
    expected: createExpectedTaxArray([0.0, 10000.0, 0.0]),
  },
  {
    description: "Case #3",
    input: [
      createOperation("buy", 10.0, 10000),
      createOperation("sell", 5.0, 5000),
      createOperation("sell", 20.0, 3000),
    ],
    expected: createExpectedTaxArray([0.0, 0.0, 1000.0]),
  },
  {
    description: "Case #4",
    input: [
      createOperation("buy", 10.0, 10000),
      createOperation("buy", 25.0, 5000),
      createOperation("sell", 15.0, 10000),
    ],
    expected: createExpectedTaxArray([0, 0, 0]),
  },
  {
    description: "Case #5",
    input: [
      createOperation("buy", 10.0, 10000),
      createOperation("buy", 25.0, 5000),
      createOperation("sell", 15.0, 10000),
      createOperation("sell", 25.0, 5000),
    ],
    expected: createExpectedTaxArray([0, 0, 0, 10000.0]),
  },
  {
    description: "Case #6",
    input: [
      createOperation("buy", 10.0, 10000),
      createOperation("sell", 2.0, 5000),
      createOperation("sell", 20.0, 2000),
      createOperation("sell", 20.0, 2000),
      createOperation("sell", 25.0, 1000),
    ],
    expected: createExpectedTaxArray([0.0, 0.0, 0.0, 0.0, 3000.0]),
  },
  {
    description: "Case #7",
    input: [
      createOperation("buy", 10.0, 10000),
      createOperation("sell", 2.0, 5000),
      createOperation("sell", 20.0, 2000),
      createOperation("sell", 20.0, 2000),
      createOperation("sell", 25.0, 1000),
      createOperation("buy", 20.0, 10000),
      createOperation("sell", 15.0, 5000),
      createOperation("sell", 30.0, 4350),
      createOperation("sell", 30.0, 650),
    ],
    expected: createExpectedTaxArray([
      0.0, 0.0, 0.0, 0.0, 3000.0, 0.0, 0.0, 3700.0, 0.0,
    ]),
  },
  {
    description: "Case #8",
    input: [
      createOperation("buy", 10.0, 10000),
      createOperation("sell", 50.0, 10000),
      createOperation("buy", 20.0, 10000),
      createOperation("sell", 50.0, 10000),
    ],
    expected: createExpectedTaxArray([0.0, 80000.0, 0.0, 60000.0]),
  },
];

describe("Integration Tests", () => {
  testCases.forEach(({ description, input, expected }) => {
    it(description, (done) => {
      const inputFilePath = path.resolve(__dirname, "test_input.json");

      fs.writeFileSync(inputFilePath, JSON.stringify(input));

      exec(`node ${entryPoint} ${inputFilePath}`, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing the script: ${stderr}`);
          return done(error);
        }

        console.log(`Raw output: ${stdout}`);

        const jsonOutput = stdout.split("\n")[0];

        let result;
        try {
          result = JSON.parse(jsonOutput);
        } catch (parseError) {
          console.error(`Error parsing the output: ${jsonOutput}`);
          return done(parseError);
        }

        try {
          assert.deepStrictEqual(result, expected);
        } catch (assertionError) {
          return done(assertionError);
        }

        fs.unlinkSync(inputFilePath);

        done();
      });
    });
  });
});

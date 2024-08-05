import { strict as assert } from "assert";
import { describe, it, before } from "node:test";
import StandardTaxStrategy from "#domain/tax/StandardTaxStrategy.js";

describe("StandardTaxStrategy", () => {
  let standardTaxStrategy;

  before(() => {
    standardTaxStrategy = new StandardTaxStrategy();
  });

  it("should return 0 when totalSaleValue is less than or equal to the transaction exemption threshold", () => {
    const args = { totalSaleValue: 20000, adjustedProfit: 5000 };
    const tax = standardTaxStrategy.calculateTax(args);
    assert.equal(
      tax,
      0,
      "Tax should be 0 when total sale value is <= exemption threshold"
    );
  });

  it("should return 0 when adjustedProfit is less than or equal to 0", () => {
    const argsZeroProfit = { totalSaleValue: 25000, adjustedProfit: 0 };
    const argsNegativeProfit = { totalSaleValue: 25000, adjustedProfit: -1000 };
    assert.equal(
      standardTaxStrategy.calculateTax(argsZeroProfit),
      0,
      "Tax should be 0 when adjusted profit is 0"
    );
    assert.equal(
      standardTaxStrategy.calculateTax(argsNegativeProfit),
      0,
      "Tax should be 0 when adjusted profit is negative"
    );
  });

  it("should calculate tax correctly for valid values", () => {
    const args = { totalSaleValue: 25000, adjustedProfit: 5000 };
    const tax = standardTaxStrategy.calculateTax(args);
    assert.equal(
      tax,
      1000,
      "Tax should be correctly calculated for valid values"
    );
  });

  it("should round the tax value to two decimal places", () => {
    const args = { totalSaleValue: 25000, adjustedProfit: 12345.6789 };
    const tax = standardTaxStrategy.calculateTax(args);
    assert.equal(tax, 2469.14, "Tax should be rounded to two decimal places");
  });

  it("should calculate tax correctly for high totalSaleValue and valid adjustedProfit", () => {
    const args = { totalSaleValue: 50000, adjustedProfit: 15000 };
    const tax = standardTaxStrategy.calculateTax(args);
    assert.equal(
      tax,
      3000,
      "Tax should be correctly calculated for high total sale value"
    );
  });
});

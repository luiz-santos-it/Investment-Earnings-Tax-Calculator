export default class Operation {
  execute(operation, state) {
    throw new Error("Method not implemented");
  }

  roundToTwoDecimals(value) {
    return +value.toFixed(2);
  }
}

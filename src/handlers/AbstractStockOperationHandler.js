export default class AbstractStockOperationHandler {
  handle(stockOperation) {
    throw new Error('You have to implement the method handle!');
  }
}

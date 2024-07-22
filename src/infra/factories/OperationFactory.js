import OperationType from '../../shared/enums/OperationType.js';
import BuyOperation from '../../domain/operations/BuyOperation.js';
import SellOperation from '../../domain/operations/SellOperation.js';

const createOperation = (operationType) => {
  switch (operationType) {
    case OperationType.BUY:
      return new BuyOperation();
    case OperationType.SELL:
      return new SellOperation();
    default:
      throw new Error('Invalid operation type');
  }
};

export default { createOperation };

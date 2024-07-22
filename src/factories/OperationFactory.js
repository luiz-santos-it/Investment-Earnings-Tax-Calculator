import OperationType from '../enums/OperationType';
import BuyOperation from '../operations/BuyOperation';
import SellOperation from '../operations/SellOperation';

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

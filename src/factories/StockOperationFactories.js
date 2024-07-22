import StockOperationDTO from '../dtos/StockOperationDTO';
import OperationHandlerFactory from './OperationHandlerFactory';
import StockProcessor from '../processor/StockOperationProcessor';
import StockOperationService from '../services/StockOperationService';

export default class StockOperationFactories {
  createStockOperationDTO(stockOperationData) {
    return new StockOperationDTO(stockOperationData);
  }

  createStockProcessor() {
    return new StockProcessor(this);
  }

  createStockOperationService() {
    return new StockOperationService();
  }

  createOperationHandlerFactory() {
    return new OperationHandlerFactory(this.createStockOperationService());
  }
}

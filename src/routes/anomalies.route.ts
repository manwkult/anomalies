import { Router } from 'express';
import AnomaliesController from '@/controllers/anomalies.controller';
import { Routes } from '@interfaces/routes.interface';

class AnomaliesRoute implements Routes {
  public path = '/v1/api/anomalies';
  public router = Router();
  public anomaliesController = new AnomaliesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.anomaliesController.getAnomalies);
    this.router.post(`${this.path}/validate`, this.anomaliesController.validateAnomalies);
  }
}

export default AnomaliesRoute;

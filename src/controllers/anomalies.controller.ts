import { NextFunction, Request, Response } from 'express';
import { Anomaly } from '@interfaces/anomaly.interface';
import AnomalyService from '@services/anomalies.service';
import hasAnomalies from '@utils/anomalies/has-anomalies';

class AnomaliesController {
  public anomalyService = new AnomalyService();

  public getAnomalies = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result: Anomaly[] = await this.anomalyService.getAnomalies();
      const count_anomalies = result.filter(anomaly => anomaly.withAnomalies).length;
      const count_no_anomalies = result.filter(anomaly => !anomaly.withAnomalies).length;
      const ratio = count_anomalies / count_no_anomalies;

      const data = {
        count_anomalies,
        count_no_anomalies,
        ratio,
      };

      res.status(200).json({ data, message: 'Anomalies' });
    } catch (error) {
      next(error);
    }
  };

  public validateAnomalies = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { dna } = req.body;

      const withAnomalies = hasAnomalies(dna, 3);
      const data = await this.anomalyService.createAnomaly({ withAnomalies });

      if (withAnomalies) {
        res.status(200).json({ data, message: 'Anomalies' });
      } else {
        res.status(403).json({ data, message: 'Anomalies' });
      }
    } catch (error) {
      next(error);
    }
  };
}

export default AnomaliesController;

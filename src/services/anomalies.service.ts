import { AnomalyEntity } from '@entities/anomaly.entity';
import { Anomaly } from '@interfaces/anomaly.interface';

class AnomalyService {
  public async getAnomalies(): Promise<Anomaly[]> {
    const response: Anomaly[] = await AnomalyEntity.find();
    return response;
  }

  public async createAnomaly(anomaly: Anomaly): Promise<Anomaly> {
    const response: Anomaly = await AnomalyEntity.save(anomaly as AnomalyEntity);
    return response;
  }
}

export default AnomalyService;

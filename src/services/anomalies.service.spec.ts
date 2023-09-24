import AnomalyService from './anomalies.service'; // Importa tu servicio real
import { AnomalyEntity } from '@entities/anomaly.entity';

describe('AnomalyService', () => {
  let anomalyService: AnomalyService;

  beforeEach(() => {
    anomalyService = new AnomalyService();
  });

  it('should get anomalies', async () => {
    const mockAnomalies = [
      { id: 1, withAnomalies: true },
      { id: 2, withAnomalies: false },
    ] as AnomalyEntity[];

    jest.spyOn(AnomalyEntity, 'find').mockResolvedValue(mockAnomalies);

    const result = await anomalyService.getAnomalies();

    expect(result).toEqual(mockAnomalies);
  });

  it('should create an anomaly', async () => {
    const newAnomaly = { id: 3, withAnomalies: true } as AnomalyEntity;

    jest.spyOn(AnomalyEntity, 'save').mockResolvedValue(newAnomaly);

    const result = await anomalyService.createAnomaly(newAnomaly);

    expect(result).toEqual(newAnomaly);
  });
});

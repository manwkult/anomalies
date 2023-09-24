import { Request, Response, NextFunction } from 'express';
import AnomaliesController from './anomalies.controller';

describe('AnomaliesController', () => {
  let anomaliesController: AnomaliesController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: jest.Mock<NextFunction>;

  beforeEach(() => {
    anomaliesController = new AnomaliesController();
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
  });

  describe('getAnomalies', () => {
    it('should return the count of anomalies and ratio', async () => {
      const mockAnomalies = [
        { id: 1, withAnomalies: true },
        { id: 2, withAnomalies: true },
        { id: 3, withAnomalies: false },
      ];
      jest.spyOn(anomaliesController.anomalyService, 'getAnomalies').mockResolvedValue(mockAnomalies);

      await anomaliesController.getAnomalies(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: {
          count_anomalies: 2,
          count_no_anomalies: 1,
          ratio: 2,
        },
        message: 'Anomalies',
      });
    });

    it('should handle errors and call next', async () => {
      const errorMessage = 'An error occurred';
      jest.spyOn(anomaliesController.anomalyService, 'getAnomalies').mockRejectedValue(new Error(errorMessage));

      await anomaliesController.getAnomalies(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(new Error(errorMessage));
    });
  });

  describe('validateAnomalies', () => {
    it('should return 200 with anomalies', async () => {
      // Simula el comportamiento del servicio y de hasAnomalies
      jest.spyOn(anomaliesController.anomalyService, 'createAnomaly').mockResolvedValue({ withAnomalies: true });

      await anomaliesController.validateAnomalies(
        {
          body: {
            dna: [
              ['A', 'B', 'C', 'D', 'E'],
              ['B', 'C', 'A', 'D', 'E'],
              ['C', 'B', 'C', 'B', 'A'],
              ['D', 'D', 'A', 'B', 'A'],
              ['E', 'B', 'C', 'A', 'D'],
            ],
          },
        } as Request,
        mockResponse as Response,
        mockNext,
      );

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: { withAnomalies: true },
        message: 'Anomalies',
      });
    });

    it('should return 403 without anomalies', async () => {
      jest.spyOn(anomaliesController.anomalyService, 'createAnomaly').mockResolvedValue({ withAnomalies: false });

      await anomaliesController.validateAnomalies(
        {
          body: {
            dna: [
              ['A', 'B', 'C', 'D', 'E'],
              ['B', 'C', 'A', 'D', 'E'],
              ['A', 'B', 'C', 'B', 'A'],
              ['D', 'D', 'A', 'B', 'A'],
              ['E', 'B', 'C', 'A', 'D'],
            ],
          },
        } as Request,
        mockResponse as Response,
        mockNext,
      );

      expect(mockResponse.status).toHaveBeenCalledWith(403);
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: { withAnomalies: false },
        message: 'Anomalies',
      });
    });

    it('should handle errors and call next', async () => {
      const errorMessage = 'An error occurred';
      jest.spyOn(anomaliesController.anomalyService, 'createAnomaly').mockRejectedValue(new Error(errorMessage));

      await anomaliesController.validateAnomalies({ body: { dna: [[], [], []] } } as Request, mockResponse as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(new Error(errorMessage));
    });
  });
});

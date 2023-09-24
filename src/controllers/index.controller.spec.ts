import { Request, Response, NextFunction } from 'express';
import IndexController from './index.controller';

describe('IndexController', () => {
  let indexController: IndexController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: jest.Mock<NextFunction>;

  beforeEach(() => {
    indexController = new IndexController();
    mockRequest = {} as Partial<Request>;
    mockResponse = {
      sendStatus: jest.fn(),
    } as Partial<Response>;
    mockNext = jest.fn();
  });

  it('should respond with status 200', () => {
    indexController.index(mockRequest as Request, mockResponse as Response, mockNext);

    expect(mockResponse.sendStatus).toHaveBeenCalledWith(200);
  });

  it('should handle errors and call next', () => {
    const errorMessage = 'An error occurred';

    jest.spyOn(mockResponse, 'sendStatus').mockImplementation(() => {
      throw new Error(errorMessage);
    });

    indexController.index(mockRequest as Request, mockResponse as Response, mockNext);

    expect(mockNext).toHaveBeenCalledWith(new Error(errorMessage));
  });
});

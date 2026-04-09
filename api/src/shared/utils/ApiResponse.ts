import { StatusCode } from "@shared/constants/statusCodes.constants";

export class ApiResponse<T = unknown> {
  public readonly statusCode: number;
  public readonly data: T | null;
  public readonly message: string;
  public readonly success: boolean;

  constructor(statusCode: number, message: string, data: T | null = null) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.success = statusCode < 400;
  }

  static success<T>(message: string, data: T, statusCode: number = StatusCode.OK): ApiResponse<T> {
    return new ApiResponse<T>(statusCode, message, data);
  }

  static error(message: string, statusCode: number = StatusCode.INTERNAL_SERVER_ERROR): ApiResponse<null> {
    return new ApiResponse<null>(statusCode, message, null);
  }
}

export class CustomError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = "CustomError";
    this.statusCode = statusCode || 500;
    Error.captureStackTrace(this, this.constructor);
  }
}

export interface TValidationIssue {
  message: string;
  path?: any[];
}

export class ValidationError extends CustomError {
  public errors: TValidationIssue[];

  constructor(message: string, statusCode: number, errors: TValidationIssue[]) {
    super(message, statusCode);
    this.name = "ValidationError";
    this.errors = errors;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ApiError extends Error {
  public statusCode: number;
  public errors: string[];
  public stackTrace?: string;
  constructor(
    statusCode: number,
    Message: string = "Something went Wrong",
    errors: string[] = [],
    stack = ""
  ) {
    super(Message);
    this.statusCode = statusCode;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

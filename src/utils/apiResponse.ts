export class ApiResponse<T> {
  public statusCode: number;
  public Data: T | null;
  public Message: string;
  public Success: boolean;

  constructor(statusCode: number, Data: T | null, Message = "Success") {
    (this.statusCode = statusCode),
      (this.Data = Data),
      (this.Message = Message),
      (this.Success = statusCode < 400);
  }
}
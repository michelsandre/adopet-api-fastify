export class CustomError extends Error {
  constructor(
    public message: string,
    public statusCode: number,
    public options?: ErrorOptions
  ) {
    super(message, options);
    this.statusCode = statusCode;
  }
}

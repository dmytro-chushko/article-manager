export interface IPayloadError {
  errorType: string;
  message: string | string[];
  path: string;
  statusCode: number;
}

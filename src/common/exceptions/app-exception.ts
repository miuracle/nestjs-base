import { HttpException, HttpStatus } from '@nestjs/common';

export class AppException extends HttpException {
  data: any;
  code: string;
  statusCode: number;

  private constructor(errorCode: string, statusCode?: number, errorData?: any) {
    const status = statusCode || HttpStatus.OK;
    super(null, status);

    this.data = errorData;
    this.code = errorCode;
    this.statusCode = status;
  }

  static error(errorCode: string, errorData?: any): AppException {
    return new AppException(errorCode, null, errorData);
  }
}

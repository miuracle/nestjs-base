import { Error } from '@common/enum/errors';
import { AppResponse } from '@constants/app-response';
import { ExceptionFilter, HttpException, ArgumentsHost, Catch } from '@nestjs/common';
import { Request, Response } from 'express';
import { I18nService } from 'nestjs-i18n';
import { AppException } from '../exceptions/app-exception';

@Catch(HttpException)
export class AppExceptionFilter implements ExceptionFilter {
  constructor(private readonly i18n: I18nService) {}

  private readonly ExceptionHandler = {
    BadRequestException: (exception: HttpException, lang?: string) => {
      const errors = (exception.getResponse() as any).message;

      return {
        message: errors.join(', '),
        code: Error.INVALID_INPUT,
      };
    },
    AppException: (exception: HttpException, lang?: string) => {
      const code = (exception as AppException).code;

      const message = this.i18n.translate(`messages.${code}`, { lang });

      return {
        message,
        code,
      };
    },
    UnauthorizedException: (exception: HttpException, lang?: string) => {
      const code = Error.UNAUTHORIZE;

      const message = this.i18n.translate(`messages.${code}`, { lang });

      return {
        message,
        code,
      };
    },
    ForbiddenException: (exception: HttpException, lang?: string) => {
      const code = Error.FORBIDDEN;

      const message = this.i18n.translate(`messages.${code}`, { lang });

      return {
        message,
        code,
      };
    },
  };

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const lang = request['i18nLang'];

    const instance = exception.constructor.name;

    if (!this.ExceptionHandler[instance]) {
      const message = this.i18n.translate(`messages.${Error.SYSTEM_ERROR}`, { lang });

      const errResponse = AppResponse.error(Error.SYSTEM_ERROR, message);

      return response.status(status).json(errResponse);
    }

    const { message, code } = this.ExceptionHandler[instance](exception, lang);

    const errResponse = AppResponse.error(code, message);

    return response.status(status).json(errResponse);
  }
}

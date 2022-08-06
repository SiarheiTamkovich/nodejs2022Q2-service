import { Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { AbstractHttpAdapter, BaseExceptionFilter } from '@nestjs/core';
import { LogService } from '../logger/logger.service';

@Catch()
export class ExceptionsFilter extends BaseExceptionFilter {
  constructor(
    httpAdapter: AbstractHttpAdapter,
    private logService: LogService,
  ) {
    super(httpAdapter);
  }

  catch(exception: HttpException, host: ArgumentsHost) {
    super.catch(exception, host);

    const [req, res] = host.getArgs();
    const { method, url, query, body } = req;
    const { statusCode } = res;
    const { name, message } = exception;
    const now = Date.now();

    this.logService.warn({
      method,
      url,
      query,
      body,
      statusCode,
      exception: message,
      classException: name,
      responseTime: `${Date.now() - now}ms`,
    });
  }
}

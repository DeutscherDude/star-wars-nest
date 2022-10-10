import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { ErrorHandlingService } from '../../error-handling/error-handling.service';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly errorHandlingService: ErrorHandlingService,
    private readonly loggerSerice: Logger,
  ) {}

  public async catch(exception: Error, host: ArgumentsHost): Promise<void> {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const bodyToLog = JSON.stringify(request.body);

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    this.loggerSerice.log(
      `Exception at ${request.url}`,
      `HTTP-EXCEPTION ${status}`,
    );

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      message: exception.message,
      path: request.url,
    });

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      await this.errorHandlingService.errorHandler(exception, bodyToLog);
    }
  }
}

import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ErrorHandlingService {
  constructor(private readonly loggerService: Logger) {
    process.on('uncaughtException', async (err: Error) => {
      await this.loggerService.error(err);
    });

    process.on('unhandledRejection', async (err: Error) => {
      await this.loggerService.error(err);
    });

    process.on('rejectionHandled', async (err: Error) => {
      this.loggerService.error(err);
    });

    process.on('disconnect', async (err: Error) => {
      await this.loggerService.error(err);
    });
  }

  public async errorHandler(error: Error, errorPaylod: any) {
    this.loggerService.error(
      // Just a joke, wouldn't leave it in a real-life project ;)
      error.message + '/n Something is not yes',
      errorPaylod.stack,
    );
  }
}

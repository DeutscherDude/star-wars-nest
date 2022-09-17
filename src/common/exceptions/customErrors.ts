import { HttpException, HttpStatus } from '@nestjs/common';
import { DotenvParseOutput } from 'dotenv';
import Joi from 'joi';
import { errorMessages } from './error-messages';

export class PlanetNotFoundException extends Error {
  constructor(message?: string) {
    super(message);
  }
}

export class EnvValidationError extends Error {
  constructor(errors: Joi.ValidationError | DotenvParseOutput | undefined) {
    super(`${
      errors ? errorMessages.ENV_VALIDATION : errorMessages.ENV_FILE_MISSING
    }: 
    Error message: ${errors}
    `);
  }
}

export class AxiosException extends Error {
  constructor(reason?: string) {
    const message = reason ? reason : '';
    super(message);
  }
}

export class AxiosTimeoutException extends HttpException {
  constructor(reason?: string) {
    super(
      {
        message: errorMessages.AXIOS_TIMEOUT,
        reason: reason ? reason : '',
      },
      HttpStatus.GATEWAY_TIMEOUT,
    );
  }
}

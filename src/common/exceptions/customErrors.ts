import { HttpException, HttpStatus } from '@nestjs/common';
import Joi from 'joi';
import { errorMessages } from './error-messages';

export class PlanetNotFoundException extends Error {
  constructor(message?: string) {
    super(message);
  }
}

export class EnvValidationError extends Error {
  constructor(errors: Joi.ValidationError) {
    super(`${errorMessages.ENV_VALIDATION} ${errors}
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

import { HttpException, HttpStatus } from '@nestjs/common';
import Joi from 'joi';
import { errorMessages } from './error-messages';

export class PlanetNotFoundException extends HttpException {
  constructor(message?: string) {
    super(
      {
        message: message ? message : `${errorMessages.PLANET_ID_NOT_FOUND}`,
      },
      HttpStatus.NOT_FOUND,
    );
  }
}

export class EnvValidationError extends Error {
  constructor(errors: Joi.ValidationError) {
    super(`${errorMessages.ENV_VALIDATION} ${errors}
    `);
  }
}

export class AxiosException extends HttpException {
  constructor(reason?: string) {
    super(
      {
        message: errorMessages.AXIOS_ERROR,
        reason: reason ? reason : '',
      },
      HttpStatus.BAD_REQUEST,
    );
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

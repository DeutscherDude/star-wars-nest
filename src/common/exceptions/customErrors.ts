import { HttpException, HttpStatus } from '@nestjs/common';
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

export class MissingEnvVars extends Error {
  constructor() {
    super();
  }
}

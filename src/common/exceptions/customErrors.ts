import { HttpException, HttpStatus } from '@nestjs/common';
import { errorMessages } from './error-messages';

export class PlanetNotFoundException extends HttpException {
  constructor() {
    super(
      {
        message: `${errorMessages.PLANET_ID_NOT_FOUND}`,
      },
      HttpStatus.NOT_FOUND,
    );
  }
}

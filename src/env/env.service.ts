import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { ValidationResult } from 'joi';
import path from 'path';
import { EnvValidationError } from '../common/exceptions/customErrors';
import { isUndefined } from '../common/utils/type.guards';
import { NODE_ENV, NODE_PORT, SWAPI_URL } from './constants.tokens';
import { envSchema } from './env.schema';

@Injectable()
export class EnvService {
  private readonly env: ValidationResult<any>;
  public readonly nodePort: number;
  public readonly swapiURL: string;
  public readonly nodeEnv: string;

  constructor() {
    const vars = dotenv.config({
      path: path.resolve(__dirname + '../../../.env'),
    }).parsed;

    this.env = envSchema.validate(vars);
    const errors = this.env.error;

    if (errors || isUndefined(vars)) {
      throw new EnvValidationError(errors);
    }

    this.nodePort = this.env.value[NODE_PORT];
    this.swapiURL = this.env.value[SWAPI_URL];
    this.nodeEnv = this.env.value[NODE_ENV];
  }
}

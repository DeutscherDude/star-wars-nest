import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { ValidationResult } from 'joi';
import path from 'path';
import { EnvValidationError } from '../common/exceptions/customErrors';
import { NODE_PORT, SWAPI_URL } from './constants.tokens';
import { envSchema } from './env.schema';

@Injectable()
export class EnvService {
  private readonly env: ValidationResult<any>;
  public readonly nodePort: number;
  public readonly swapiURL: string;
  constructor() {
    const vars = dotenv.config({
      path: path.resolve(__dirname + '../../../.env'),
    }).parsed;
    this.env = envSchema.validate(vars);
    if (this.env.error) {
      throw new EnvValidationError(this.env.error);
    }
    this.nodePort = this.env.value[NODE_PORT];
    this.swapiURL = this.env.value[SWAPI_URL];
  }
}

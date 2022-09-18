import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { ValidationResult } from 'joi';
import path from 'path';
import { EnvValidationError } from '../common/exceptions/customErrors';
import { isUndefined } from '../common/utils/type.guards';
import {
  NODE_ENV,
  NODE_PORT,
  REDIS_HOST,
  REDIS_PASSWORD,
  REDIS_PORT,
  REDIS_URL,
  REDIS_USERNAME,
  SWAPI_URL,
} from './constants.tokens';
import { envSchema } from './env.schema';

@Injectable()
export class EnvService {
  private readonly env: ValidationResult<any>;
  public readonly nodePort: number;
  public readonly swapiURL: string;
  public readonly nodeEnv: string;
  public readonly redisUrl: string;
  public readonly redisPassword: string;
  public readonly redisUsername: string;
  public readonly redisPort: number;
  public readonly redisHost: string;

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
    this.redisUrl = this.env.value[REDIS_URL];
    this.redisHost = this.env.value[REDIS_HOST];
    this.redisPassword = this.env.value[REDIS_PASSWORD];
    this.redisUsername = this.env.value[REDIS_USERNAME];
    this.redisPort = this.env.value[REDIS_PORT];
  }
}

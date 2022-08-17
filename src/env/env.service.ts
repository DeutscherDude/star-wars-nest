import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import path from 'path';
import { MissingEnvVars } from '../common/exceptions/customErrors';

@Injectable()
export class EnvService {
  private readonly env: dotenv.DotenvParseOutput;
  constructor() {
    const vars = dotenv.config({
      path: path.resolve(__dirname + '../../../.env'),
    }).parsed;
    if (!vars) throw new MissingEnvVars();
    this.env = vars;
  }

  async get(key: string): Promise<string | number> {
    if (
      Object.keys(this.env as object).find((key) => key === key) === undefined
    )
      throw new Error();
    return this.env[key];
  }
}

import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import path from 'path';

@Injectable()
export class EnvService {
  private readonly env: Record<string, any>;
  constructor() {
    this.env = dotenv.config({
      path: path.resolve(__dirname + '../../../.env'),
    }).parsed;
  }

  async get(key: string): Promise<string|number> {
    if (Object.keys(this.env).find((key) => key === key) === undefined)
      throw new Error();
    return this.env[key];
  }
}

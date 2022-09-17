import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService {
  private client: Redis;

  setClient(client: Redis) {
    this.client = client;
  }

  getClient() {
    return this.client;
  }
}

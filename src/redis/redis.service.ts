import { Injectable } from '@nestjs/common';
import Redis, { RedisKey } from 'ioredis';
import { EnvService } from '../env/env.service';

type RedisValue = string | number | Buffer;

@Injectable()
export class RedisService {
  private client: Redis;
  constructor(private readonly envService: EnvService) {
    this.client = new Redis(this.envService.redisUrl);
  }

  public setClient(client: Redis) {
    this.client = client;
  }

  public getClient() {
    return this.client;
  }

  public async get(key: RedisKey): Promise<string | null> {
    return this.client.get(key);
  }

  public async set(key: RedisKey, value: RedisValue): Promise<'OK'> {
    return this.client.set(key, value);
  }
}

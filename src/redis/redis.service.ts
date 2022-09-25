import { Inject, Injectable } from '@nestjs/common';
import Redis, { RedisKey } from 'ioredis';
import { EnvService } from '../env/env.service';

type RedisValue = string | number | Buffer;
export interface RedisOptions {
  ttl?: number;
  max?: number;
}

@Injectable()
export class RedisService {
  private readonly ttl: number = 30;
  private readonly max: number = 20;
  private client: Redis;
  constructor(
    private readonly envService: EnvService,
    @Inject('REDIS_OPTIONS') options?: RedisOptions,
  ) {
    if (options?.ttl) {
      this.ttl = options.ttl;
    }
    if (options?.max) {
      this.max = options.max;
    }

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

  public async set(key: string, args: RedisValue): Promise<'OK'> {
    this.client.set(key, args);
    this.client.expire(key, this.ttl);
    return 'OK';
  }
}

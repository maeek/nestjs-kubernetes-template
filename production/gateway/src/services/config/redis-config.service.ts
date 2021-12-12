export class RedisConfigService {
  private readonly redisConfig: { [key: string]: any } = null;

  constructor() {
    this.redisConfig = {};
    this.redisConfig.host = process.env.REDIS_HOST;
    this.redisConfig.port = parseInt(process.env.REDIS_PORT) || 6379;
  }

  get(key: string): any {
    return this.redisConfig[key];
  }
}

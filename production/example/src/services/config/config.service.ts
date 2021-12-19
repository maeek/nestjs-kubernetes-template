export class ConfigService {
  private readonly envConfig: { [key: string]: any } = null;

  constructor() {
    this.envConfig = {};
    this.envConfig.host = '0.0.0.0';
    this.envConfig.port = process.env.API_PORT;

    console.log(this.envConfig);
  }

  get(key: string): any {
    return this.envConfig[key];
  }
}

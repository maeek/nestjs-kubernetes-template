import { Injectable } from '@nestjs/common';

@Injectable()
export class ExampleService {
  public async calculateExample(num: string): Promise<number> {
    return 100 + parseInt(num);
  }
}

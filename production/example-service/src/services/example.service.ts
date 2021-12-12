import { Injectable } from '@nestjs/common';

@Injectable()
export class ExampleService {
  public async calculateExample(num: number): Promise<number> {
    return 100 + num;
  }
}

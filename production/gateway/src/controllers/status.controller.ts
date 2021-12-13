import {
  Controller,
  Get,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('status')
@ApiTags('status')
export class StatusController {
  @Get()
  public async getStatus(): Promise<any> {
    return {
      healthy: true
    };
  }
}

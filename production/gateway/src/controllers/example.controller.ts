import {
  Controller,
  Get,
  Inject,
  HttpStatus,
  HttpException,
  Param,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { EXAMPLE_SERVICE_ACTIONS_ENUM } from '../constants';
import { Permission } from '../decorators/permission.decorator';
import { ExampleResponse } from '../interfaces/example.interface';
import { ExampleService } from 'shared-types';

@Controller('example')
@ApiTags('example')
export class ExampleController {
  constructor(
    @Inject('EXAMPLE_SERVICE')
    private readonly exampleServiceClient: ClientProxy,
  ) {}

  @Get()
  public async index() {
    return {
      message: 'Use /example/:num to get the sum of numbers: 100 + :num',
    };
  }

  @Get('/:num')
  @Permission('example.get')
  public async postResult(@Param('num') num: number): Promise<ExampleResponse> {
    const exampleResponse: ExampleService.ServiceResponse = await firstValueFrom(
      this.exampleServiceClient.send(
        EXAMPLE_SERVICE_ACTIONS_ENUM.EXAMPLE_SERVICE_ACTION_1,
        {
          data: num,
        }
      ),
    );

    if (exampleResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message: exampleResponse.message,
          errors: exampleResponse.errors,
        },
        exampleResponse.status,
      );
    }

    return {
      result: exampleResponse.result
    };
  }
}

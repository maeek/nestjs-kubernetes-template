import {
  Controller,
  Get,
  Inject,
  HttpStatus,
  HttpException,
  Post,
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
  @Permission('example.get')
  public async postResult(): Promise<ExampleResponse> {
    const exampleResponse: ExampleService.ServiceResponse = await firstValueFrom(
      this.exampleServiceClient.send(
        EXAMPLE_SERVICE_ACTIONS_ENUM.EXAMPLE_SERVICE_ACTION_1,
        {
          data: 42,
        }
      ),
    );

    if (exampleResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message: exampleResponse.message,
          data: null,
          error: exampleResponse.errors,
        },
        exampleResponse.status,
      );
    }

    return {
      result: exampleResponse.result,
      error: exampleResponse?.errors,
    };
  }
}

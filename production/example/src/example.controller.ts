import { Controller, HttpStatus, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ExampleService } from './services/example.service';
import { MESSAGE_PATTERNS } from './constants';
import { ExampleResponse } from './interfaces/example-response.interface';

@Controller('example')
export class ExampleController {
  private readonly logger = new Logger();

  constructor(private readonly exampleService: ExampleService) {}

  @MessagePattern(MESSAGE_PATTERNS.EXAMPLE_SERVICE_ACTION_1)
  public async registerDevice(
    data: { data: string },
  ): Promise<ExampleResponse> {
    try {
      const { data: num } = data || {};

      if (!num)
        return {
          status: HttpStatus.BAD_REQUEST,
          message: 'example_action_1_bad_request',
          errors: {
            example_action_1_bad_request:
              'Insufficient data to complete the request',
          },
        };

      const result = await this.exampleService.calculateExample(num);

      if (!result)
        return {
          status: HttpStatus.BAD_REQUEST,
          message: 'example_action_1_bad_request',
          errors: {
            example_action_1_bad_request: 'exampleService.calculateExample did not return proper response',
          },
        };

      return {
        status: HttpStatus.OK,
        result,
        message: 'example_action_1_success'
      };
    } catch (e) {
      this.logger.error(e);
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'example_action_1_bad_request',
        errors: {
          example_action_1_bad_request: "Couldn't create a new example",
        },
      };
    }
  }
}

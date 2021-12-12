import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport, TcpOptions } from '@nestjs/microservices';

import { ExampleModule } from './example.module';
import { ConfigService } from './services/config/config.service';

async function bootstrap() {
  const configService = new ConfigService();
  const app = await NestFactory.createMicroservice(ExampleModule, {
    transport: Transport.TCP,
    options: {
      host: configService.get('host'),
      port: configService.get('port')
    }
  } as TcpOptions);

  app.useLogger(Logger);
  await app.listen();
}
bootstrap();

import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ClientProxyFactory } from '@nestjs/microservices';
import { ExampleController } from './controllers/example.controller';
import { StatusController } from './controllers/status.controller';
import { ConfigService } from './services/config/config.service';
import { PermissionGuard } from './services/guards/permission.guard';

@Module({
  imports: [],
  controllers: [StatusController, ExampleController],
  providers: [
    ConfigService,
    {
      provide: 'EXAMPLE_SERVICE',
      useFactory: (configService: ConfigService) => {
        const exampleServiceOptions = configService.get('exampleService');
        return ClientProxyFactory.create(exampleServiceOptions);
      },
      inject: [ConfigService],
    },
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    },
  ],
})
export class AppModule {}

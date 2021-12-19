import { Module } from '@nestjs/common';
import { ExampleController } from './example.controller';
import { ExampleService } from './services/example.service';

/**
 * import { MongooseModule } from '@nestjs/mongoose';
 * import { MongoConfigService } from './services/config/mongo-config.service';
 */

@Module({
  imports: [
    /**
     * Uncomment this lines to use MongoDB
     * 
     * MongooseModule.forRootAsync({
     *   useClass: MongoConfigService,
     * }),
     * MongooseModule.forFeature([
     *   {
     *     name: Example.name,
     *     schema: ExampleSchema,
     *   },
     * ]),
     */
  ],
  controllers: [ExampleController],
  providers: [ExampleService],
})
export class ExampleModule {}

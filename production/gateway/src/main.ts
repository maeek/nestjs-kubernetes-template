import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Response } from 'express';
import { AppModule } from './app.module';
import { ConfigService } from './services/config/config.service';

// Default fallback values
const FALLBACK_TITLE = 'Nodejs boilerplate API';
const FALLBACK_SWAGGER_PATH = 'api-docs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle(`${process.env.PROJECT_NAME || FALLBACK_TITLE} API`)
    .addTag('example')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(process.env.SWAGGER_PATH || FALLBACK_SWAGGER_PATH, app, document);

  app.enableCors();
  app.use((_req, res: Response, next) => {
    res.removeHeader('X-Powered-By');
    next();
  });
  app.use(helmet());

  await app.listen(new ConfigService().get('port'));
}
bootstrap();

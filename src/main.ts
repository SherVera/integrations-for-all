import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug'],
  });
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  const configSwagger = new DocumentBuilder()
    .setTitle('Fintech Integrations')
    .setContact('API Support', 'http://example.com', 'vera8german@gmail.com')
    .setExternalDoc('Download to JSON', 'http://localhost:3000/v1/docs-json')
    .setDescription('Integrations FinTech API description')
    .setVersion('1.0')
    .addOAuth2()
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('docs', app, document, {
    customSiteTitle: 'API Support',
    swaggerOptions: {
      tagsSorter: 'alpha',
      sorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });
  app.enableCors();

  await app.listen(process.env.PORT || 3000);
}
bootstrap();

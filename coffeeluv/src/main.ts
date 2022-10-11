import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  /// init App
  const app = await NestFactory.create(AppModule);

  /// Setup Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  /// Swagger Setup
  const options = new DocumentBuilder()
    .setTitle('IluvCoffee')
    .setDescription('Coffee application with Postgres database')
    .setVersion('0.0.1')
    .addTag('coffees')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  /// Start Server
  await app.listen(3000, () => {
    console.log(`\n App running on http://localhost:3000 \n`);
  });
}
bootstrap();

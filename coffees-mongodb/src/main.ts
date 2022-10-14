import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { env } from 'process';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const port = env.PORT || 3000;
  const host = env.HOST || 'localhost';
  await app.listen(port, () => {
    console.log(`Coffeeluv Mongo db app runs on http://${host}:${port}`);
  });
}
bootstrap();

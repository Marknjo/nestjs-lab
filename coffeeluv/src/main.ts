import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
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

  /// Start Server
  await app.listen(3000, () => {
    console.log(`\n App running on http://localhost:3000 \n`);
  });
}
bootstrap();

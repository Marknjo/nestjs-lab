import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { env } from 'process';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);

  const port = env.PORT || 3000;
  await app.listen(port);

  /// Logger
  logger.log(
    `Server running on http://localhost:${port}, view health: http://localhost:${port}/coffees/health`,
  );
  logger.log(`Server health check - http://localhost:${port}/coffees/health`);
}
bootstrap();

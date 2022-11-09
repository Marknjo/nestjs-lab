import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { env } from 'process';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);

  const port = env.PORT || 3000;
  await app.listen(port);
  logger.log(
    `Coffee luv graphql schema first app running on http://localhost:${port}`,
    'Coffee Luv GQL',
  );
}
bootstrap();

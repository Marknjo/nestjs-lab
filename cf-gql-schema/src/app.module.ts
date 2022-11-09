import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envLoaderOptions } from './common/configs/env-loader-options';

@Module({
  imports: [ConfigModule.forRoot(envLoaderOptions)],
  controllers: [],
  providers: [],
})
export class AppModule {}

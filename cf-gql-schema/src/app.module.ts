import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envLoaderOptions } from './common/configs/env-loader-options';

@Module({
  imports: [
    ConfigModule.forRoot(envLoaderOptions),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        port: config.get('DB_PORT'),
        host: config.get('DB_HOST'),
        username: config.get('DB_USER'),
        password: config.get('DB_PASS'),
        database: config.get('DB_NAME'),
        autoLoadEntities: true,
        ...(config.get('NODE_ENV') !== 'production'
          ? { synchronize: true }
          : {}),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

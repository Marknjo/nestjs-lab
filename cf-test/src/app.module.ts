import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesModule } from './coffees/coffees.module';
import { confOptions } from './common/configs/globalEnvConfigOptions';

@Module({
  imports: [
    ConfigModule.forRoot(confOptions),
    CoffeesModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const host = config.get('DB_HOST');
        const port = +config.get('DB_PORT');
        const username = config.get('DB_USER');
        const password = config.get('DB_PASS');
        const database = config.get('DB_NAME');
        const nodeEnv = config.get('NODE_ENV');

        return {
          type: 'postgres',
          host,
          port,
          username,
          password,
          database,
          autoLoadEntities: true,
          ...(nodeEnv === 'production' ? {} : { synchronize: true }),
        };
      },
    }),
  ],
  controllers: [],
})
export class AppModule {}

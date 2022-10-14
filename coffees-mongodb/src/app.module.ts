import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigOptions } from './common/utils/configs-options';
import { CoffeesModule } from './coffees/coffees.module';

@Module({
  imports: [
    ConfigModule.forRoot(ConfigOptions),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      connectionName: 'coffees',
      useFactory: (configSrv: ConfigService) => {
        const dbUser = configSrv.get<string>('DB_USER');
        const dbPass = configSrv.get<string>('DB_PASS');
        const dbHost = configSrv.get<string>('DB_HOST');
        const dbPort = +configSrv.get<string>('DB_PORT');
        const dbName = configSrv.get<string>('DB_NAME');

        const uri = `mongodb://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}?authSource=admin`;

        return {
          uri,
          retryAttempts: 5,
          retryDelay: 15,
        };
      },
      inject: [ConfigService],
    }),
    CoffeesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

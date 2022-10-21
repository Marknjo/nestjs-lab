import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { env } from 'process';
import { CoffeesModule } from './coffees/coffees.module';

@Module({
  imports: [
    CoffeesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'coffees',
      password: 'cf-dev-secret',
      database: 'postgres',
      autoLoadEntities: true,
      ...(env.NODE_ENV === 'production' ? {} : { synchronize: true }),
    }),
  ],
  controllers: [],
})
export class AppModule {}

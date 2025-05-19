import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { MetricsController } from './metrics/metrics.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'userdb',
      entities: [User],
      synchronize: false,
    }),
    UsersModule,
  ],
  controllers: [MetricsController],
})
export class AppModule {}

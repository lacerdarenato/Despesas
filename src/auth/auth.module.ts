import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from '../database/database.module';
// import { LoggerModule } from '../logger/logger.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategy/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../users/user.entity';
import { userProviders } from '../users/user.provider';

@Module({
  imports: [
    DatabaseModule,
    PassportModule,
    // LoggerModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<string>('keys.jwtSecretKey'),
          signOptions: { expiresIn: '60s' },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [
    JwtStrategy,
    AuthService,
    ...userProviders,
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule { }
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from './../users/users.module';
import { jwtConstants } from './constants';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { JwtServicer } from './jwt/jwt.service';

@Module({
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtServicer],
  controllers: [AuthController],
  imports: [
    PassportModule,
    UsersModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600s' }
    })
  ],
  exports: [JwtServicer]
})
export class AuthModule {}

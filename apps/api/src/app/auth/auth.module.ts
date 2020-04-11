import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from './jwt/jwt.module';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [JwtModule]
})
export class AuthModule {}

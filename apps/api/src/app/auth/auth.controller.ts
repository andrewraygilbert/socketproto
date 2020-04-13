import { Controller, Request, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Credentials } from '@sockets/api-interfaces';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
    async login(@Request() req) {
      return this.authService.login(req.user);
    }
}



import { Controller, Post, Request, Body, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService
  ) {}

  @Post('create')
  async createUser(@Body() body) {
    return this.usersService.create(body);
  }

  @Get()
  async findAll() {
    return this.usersService.findAllUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Post('findone')
  async getUser(@Body() body) {
    return this.usersService.findByUsername(body.username);
  }

  @UseGuards(JwtAuthGuard)
  @Get('whoami')
  async whoAmI(@Request() req) {
    return req.user;
  }

}

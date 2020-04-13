import { Injectable, HttpException } from '@nestjs/common';
import { UsersService } from './../users/users.service';
import { Credentials } from '@sockets/api-interfaces';
import { User } from '@sockets/api-interfaces';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async verifyPassword(user: User, pass: string): Promise<boolean> {
    if (user.password !== pass) {
      return false;
    }
    return true;
  }

  async validateUser(username: string, password: string): Promise<User> {
    const user: User = await this.usersService.findByUsername(username);
    const validPassword = this.verifyPassword(user, password);
    if (!validPassword) {
      return null;
    }
    return user;
  }

  async login(user: any) {
    const payload = { username: user.username, _id: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

}

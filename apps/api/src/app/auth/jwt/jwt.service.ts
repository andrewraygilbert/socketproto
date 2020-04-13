import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { User } from '@sockets/api-interfaces';
import { Model } from 'mongoose';
import { WsException } from '@nestjs/websockets';
import { UsersService } from './../../users/users.service';
import { jwtConstants } from './../constants';

@Injectable()
export class JwtServicer {

  constructor(
    private readonly usersService: UsersService,
  ) {}

  async verify(token: string): Promise<User | null> {
    try {
      const payload = <any>jwt.verify(token, jwtConstants.secret);
      const user = await this.usersService.findUserById(payload._id);

      if (!user) {
        throw new WsException('Unauthorized.');
      }

      return user;
    } catch (err) {
      throw new WsException(err.message);
    }

  }

}

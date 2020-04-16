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
      console.log('in the verify');
      const payload = <any>jwt.verify(token, jwtConstants.secret);
      console.log('after the payload', payload);
      const user = await this.usersService.findUserById(payload._id);
      console.log('here ia m ');
      if (!user) {
        console.log('in no user err', user);
        throw new WsException('Unauthorized.');
      }

      return user;
    } catch (err) {
      throw new WsException(err.message);
    }

  }

}

import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { User } from '@sockets/api-interfaces';
import { Model } from 'mongoose';
import { WsException } from '@nestjs/websockets';
import { UsersService } from './../../users/users.service';
import { jwtConstants } from './../constants';
import { Socket } from 'socket.io';

@Injectable()
export class JwtServicer {

  constructor(
    private readonly usersService: UsersService,
  ) {}

  async verify(socket: Socket): Promise<User | null> {
    const token = (socket.handshake && socket.handshake.query) ? socket.handshake.query.token : false;
    if (!token) {
      throw new WsException('Unauthorized. No token found');
    }
    const payload = <any>jwt.verify(token, jwtConstants.secret);
    const user = await this.usersService.findUserById(payload._id);
    return user;
  }

}

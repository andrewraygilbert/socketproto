import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Room, User } from '@sockets/api-interfaces';
import { Model } from 'mongoose';
import { Message } from '@sockets/api-interfaces';
import { UsersService } from './../users/users.service';

@Injectable()
export class RoomsService {

  constructor(
    @InjectModel('Rooms') private readonly RoomModel: Model<Room>,
    @InjectModel('User') private readonly UserModel: Model<User>,
    private readonly usersService: UsersService
  ) {}

  async create(room: Room): Promise<Room> {
    const createdRoom = new this.RoomModel(room);
    return createdRoom.save();
  }

  async addCollaborator(info): Promise<Room> {
    const collaborator = await this.usersService.findByUsername(info.username);
    if (!collaborator) {
      throw new HttpException('Could not find collaborator', 400)
    }
    const room = await this.RoomModel.findById(info.roomId).exec();
    if (!room) {
      throw new HttpException('could not find room', 400);
    }
    const newCollab = {
      firstName: collaborator.firstName,
      lastName: collaborator.lastName,
      userId: collaborator._id,
      username: collaborator.username
    };
    room.collaborators.push(newCollab);
    const updatedRoom = await room.save();
    return updatedRoom;
  }

  async getRoomById(roomId: string): Promise<Room> {
    const room = this.RoomModel.findById(roomId).exec();
    if (!room) {
      throw new HttpException('could not find room', 400);
    }
    return room;
  }

}

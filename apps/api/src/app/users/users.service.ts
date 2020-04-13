import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '@sockets/api-interfaces';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly UserModel: Model<User>
  ) {}

  async create(user: User): Promise<User> {
    const createdUser = new this.UserModel(user);
    return createdUser.save();
  }

  async findUserById(_id: string): Promise<User> {
    const user = this.UserModel.findById(_id).exec();
    if (!user) {
      throw new HttpException('Could not find user', null);
    }
    return user;
  }

  async findByUsername(username: string): Promise<User> {
    const user = this.UserModel.findOne({username: username}).exec();
    if (!user) {
      throw new HttpException('Could not locate user.', null);
    }
    return user;
  }

}

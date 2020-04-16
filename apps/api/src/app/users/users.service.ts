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
    const createdUser = await new this.UserModel(user);
    return createdUser.save();
  }

  async findUserById(_id: string): Promise<User> {
    const user = await this.UserModel.findById(_id).exec();
    if (!user) {
      throw new HttpException('Could not find user', 401);
    }
    return user;
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.UserModel.findOne({username: username}).exec();
    if (!user) {
      throw new HttpException('Could not locate user.', 401);
    }
    return user;
  }

}

import { Module } from '@nestjs/common';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomSchema } from './schemas/room.schema';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([{
      name: 'Rooms',
      schema: RoomSchema
    }])
  ],
  controllers: [RoomsController],
  providers: [RoomsService],
  exports: [RoomsService]
})
export class RoomsModule {}

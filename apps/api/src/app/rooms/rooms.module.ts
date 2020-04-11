import { Module } from '@nestjs/common';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
  ],
  controllers: [RoomsController],
  providers: [RoomsService]
})
export class RoomsModule {}

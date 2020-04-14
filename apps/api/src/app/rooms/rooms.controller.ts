import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { Room } from '@sockets/api-interfaces';

@Controller('rooms')
export class RoomsController {

  constructor(
    private roomsService: RoomsService
  ) {}

  @Get('all')
  async getRooms(): Promise<Room[]> {
    return this.roomsService.getRooms();
  }

  @Get(':id')
  async roomById(@Param() params): Promise<Room> {
    return this.roomsService.getRoomById(params.id);
  }

  @Post('create')
  async createRoom(@Body() room): Promise<Room> {
    return this.roomsService.create(room);
  }

  @Post('add-collaborator')
  async addCollaborator(@Body() info): Promise<Room> {
    return this.roomsService.addCollaborator(info);
  }

}

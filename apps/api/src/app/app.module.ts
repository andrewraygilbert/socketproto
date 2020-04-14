import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { RoomsModule } from './rooms/rooms.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ReactiveFormsModule } from '@angular/forms';

const dbURI = process.env.NODE_ENV === 'production' ? process.env.MONGODB_URI : 'mongodb://localhost/sockets';

@Module({
  imports: [
    ReactiveFormsModule,
    MongooseModule.forRoot(dbURI),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'socketproto'),
      exclude: ['/api*']
    }),
    AuthModule,
    ChatModule,
    RoomsModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}

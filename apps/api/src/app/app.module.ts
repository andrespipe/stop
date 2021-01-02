import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { from } from 'rxjs';

@Module({
  imports: [MongooseModule.forRoot('mongodb:localhost/stop_game_db', { connectionName: 'stop_game_db' })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

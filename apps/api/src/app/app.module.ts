import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { StopGameModule } from './modules/stop-game/stop-game.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { env } from 'process';

console.log({env});

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [ '.env.local' ],
    }),
    MongooseModule.forRoot(process.env.MONGO_CONNECTION_STRING, { connectionName: 'stop_game_db' }),
    StopGameModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

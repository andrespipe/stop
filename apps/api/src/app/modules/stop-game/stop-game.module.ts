import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StopGameSchema } from './stop-game.schema';
import { StopGameController } from './stop-game.controller';
import { StopGameService } from './stop-game.service';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: 'StopGame', schema: StopGameSchema }],
      'stop_game_db',
    ),
  ],
  controllers: [StopGameController],
  providers: [StopGameService],
})
export class StopGameModule {}

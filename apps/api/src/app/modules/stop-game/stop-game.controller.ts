import { Body, Controller, Get, Post } from '@nestjs/common';

import { INewStopGame, IStopGame } from '@stop-game/data';
import { mongoUUID } from '@stop-game/utils';

@Controller('stop-game')
export class StopGameController {

  @Post('game')
  newGame(@Body() newGame: INewStopGame): IStopGame {
    const game: IStopGame = {
      ...newGame,
      gameId: mongoUUID(),
      players: newGame.players.map(player => ({...player, userId: mongoUUID() })),
    };

    return game;
  }
}
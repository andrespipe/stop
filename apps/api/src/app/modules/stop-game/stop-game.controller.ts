import { Body, Controller, Get, Post } from '@nestjs/common';

import { INewStopGame, IStopGame } from '@stop-game/data';
// import { mongoUUID } from '@stop-game/utils';
import { StopGameService } from './stop-game.service';

@Controller('stop-game')
export class StopGameController {

  constructor(private stopGameService: StopGameService){

  }

  @Post('game')
  async newGame(@Body() newGame: INewStopGame): Promise<IStopGame> {
    const game: IStopGame = {
      ...newGame,
      // id: mongoUUID(),
      // players: newGame.players.map(player => ({...player, userId: mongoUUID() })),
    };

    const result = await this.stopGameService.create(game);
    return result;
  }

  @Get('all')
  async allGames(): Promise<IStopGame[]> {
    const result = await this.stopGameService.findAll();
    return result;
  }
}

import { Body, Controller, Get, Post } from '@nestjs/common';

import { AppService } from './app.service';

import { INewStopGame, IStopGame } from '@stop-game/data';
import { mongoUUID } from '@stop-game/utils';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}

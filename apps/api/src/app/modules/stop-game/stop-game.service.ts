import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StopGameDocument } from './stop-game.schema';
import { IStopGame } from '@stop-game/data';

@Injectable()
export class StopGameService {
  
  constructor (@InjectModel('StopGame') private readonly stopGameModel: Model<StopGameDocument>) {
  }

  async create(createStopGameDTO: IStopGame): Promise<IStopGame> {
    const createdGame = new this.stopGameModel(createStopGameDTO);
    const result = await createdGame.save();
    return result;
  }

  async findAll(): Promise<IStopGame[]> {
    const result = this.stopGameModel.find().exec();
    return result;
  }
}

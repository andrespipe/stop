import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StopGameDocument } from './stop-game.schema';
import { IPlayer, IStopGame, stopGameMapper } from '@stop-game/data';
import * as mongoose from 'mongoose';

@Injectable()
export class StopGameService {
  constructor(
    @InjectModel('StopGame')
    private readonly stopGameModel: Model<StopGameDocument>,
  ) {}

  async create(createStopGameDTO: IStopGame): Promise<IStopGame> {
    const createdGame = new this.stopGameModel(createStopGameDTO);
    const result = await createdGame.save();
    return stopGameMapper(result);
  }

  async findAll(): Promise<IStopGame[]> {
    const result = await this.stopGameModel.find().exec();
    const processedResult: IStopGame[] = result.map((game) =>
      stopGameMapper(game),
    );
    return processedResult;
  }

  async findByPrivacy(isPrivateGame: boolean): Promise<IStopGame[]> {
    const result = await this.stopGameModel
      .find({ isPrivateGame: isPrivateGame })
      .exec();
    const processedResult: IStopGame[] = result.map((game) =>
      stopGameMapper(game),
    );
    return processedResult;
  }

  private async findGameById(gameId: string): Promise<StopGameDocument> {
    console.log('findGameById', gameId);
    const isValidId = mongoose.Types.ObjectId.isValid(gameId);

    if (!isValidId) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `Invalid game id ${gameId}`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const result = await this.stopGameModel.findById(gameId);
    if (result) {
      return result;
    }

    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        error: `Game not found ${gameId}`,
      },
      HttpStatus.NOT_FOUND,
    );
  }

  async findGame(gameId: string): Promise<IStopGame> {
    const result = await this.findGameById(gameId);
    return stopGameMapper(result);
  }

  async updateGame(game: IStopGame): Promise<IStopGame> {
    const { id } = game;
    const result = await this.findGameById(id);
    result.isPrivateGame = game.isPrivateGame;
    result.language = game.language;
    result.players = game.players;
    result.rounds = game.rounds;
    const savedGame = await result.save();
    return stopGameMapper(savedGame);
  }

  async addPlayer(gameId: string, player: IPlayer): Promise<IStopGame> {
    const result = await this.findGameById(gameId);
    result.players.push(player);
    const savedGame = await result.save();
    return stopGameMapper(savedGame);
  }
}

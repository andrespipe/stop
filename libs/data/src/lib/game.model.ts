export interface INewStopGame {
  isPrivateGame: boolean;
  language: string;
  players: IPlayer[];
  rounds: number;
}

export interface IStopGame extends INewStopGame {
  id?: string;
}

export interface IUser {
  countryId?: number;
  userId?: number | {};
}
export interface IPlayer extends IUser {
  nickName: string;
}

export function stopGameMapper(game): IStopGame {
  return {
    isPrivateGame: game.isPrivateGame,
    language: game.language,
    players: game.players,
    rounds: game.rounds,
    id: game._id,
  };
}

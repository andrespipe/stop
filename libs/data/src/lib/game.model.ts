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
  moves?: Map<string, IMove>;
}

export interface IMove {
  name: IWord[];
  lastName: IWord[];
  cityCountry: IWord[];
  animal: IWord[];
  food: IWord[];
  score?: number;
}

export interface IMovement {
  nickName: string;
  round: string;
  move: IMove;
}

export interface IWord {
  score?: number;
  word: string;
}

export function getEmptyMove(): IMove {
  return {
    animal: [],
    cityCountry: [],
    food: [],
    lastName: [],
    name: [],
  };
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

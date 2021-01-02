export interface INewStopGame {
  isPrivateGame: boolean;
  language: string;
  players: IPlayer[];
  rounds: number;
}

export interface IStopGame extends INewStopGame{
  gameId: string | {};
}

export interface IUser {
  countryId?: number;
  userId?: number | {};
}
export interface IPlayer extends IUser{
  nickName: string;
}

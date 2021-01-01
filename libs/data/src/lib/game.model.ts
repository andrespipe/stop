export interface INewStopGame {
  isPrivateGame: boolean;
  language: string;
  nickName: string;
  rounds: number;
}

export interface IStopGame extends INewStopGame{
  gameId: string;
}

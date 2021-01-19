import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  getEmptyMove,
  IMove,
  IMovement,
  IPlayer,
  IStopGame,
} from '@stop-game/data';
import { StopGameService } from '@stop-game/fe/services/stop-game.service';
import { BehaviorSubject } from 'rxjs';
import { StopGameSocketService } from '@stop-game/fe/modules/stop-game/services/stop-game-socket.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'stop-game-stop-game',
  templateUrl: './stop-game.component.html',
  styleUrls: ['./stop-game.component.scss'],
})
export class StopGameComponent implements OnInit {
  currentRound = 'A';
  formNickName = this.fb.group({ nickName: [, Validators.required] });
  formPlaying = this.fb.group({
    animal: [, Validators.required],
    cityCountry: [, Validators.required],
    food: [, Validators.required],
    lastName: [, Validators.required],
    name: [, Validators.required],
  });
  game = new BehaviorSubject<IStopGame>(null);
  gameId = new BehaviorSubject<string>(null);
  nickName = new BehaviorSubject<string>(null);

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private stopGameService: StopGameService,
    private stopGameSocketService: StopGameSocketService,
  ) {
    this.activatedRoute.params.subscribe(this.onActivatedRoute.bind(this));
  }

  ngOnInit(): void {}

  private onActivatedRoute(params): void {
    const gameId = params.id;
    this.gameId.next(gameId);
    if (this.nickName.value) {
      this.loadGame(gameId);
    }
  }

  private loadGame(gameId: string): void {
    if (gameId) {
      this.stopGameService
        .loadGame(gameId)
        .subscribe((game) => this.onGameLoaded(game));
    }
  }

  private onGameLoaded(game: IStopGame): void {
    this.game.next(game);
    this.joinGame(game);
  }

  private joinGame(game: IStopGame): void {
    const { id } = game;
    this.stopGameSocketService.connectGame(id);
    this.stopGameSocketService.moveReporter.subscribe(
      this.handleMovement.bind(this),
    );
    this.stopGameSocketService.playerReporter.subscribe(
      this.handleNewPlayer.bind(this),
    );
  }

  // Nickname input
  private findPlayer(nickname: string): void {
    const gameId = this.gameId.value;
    this.stopGameService
      .findPlayer(gameId, nickname)
      .subscribe(this.onPlayerLoaded.bind(this));
  }

  private onPlayerLoaded(player: IPlayer) {
    const { gameId } = this;
    const { nickName } = player;
    this.nickName.next(nickName);
    this.loadGame(gameId.value);
  }

  public onSubmitNickname(): void {
    const { formNickName } = this;
    const nickName = formNickName.get('nickName').value;
    console.log('onSubmitNickname', nickName);
    this.findPlayer(nickName);
  }
  // Nickname input end

  public sendMovement(currentPlayer: IPlayer) {
    const { nickName, currentRound: round } = this;
    const { moves } = currentPlayer;
    const move = moves.get(round);
    const myMove: IMovement = { nickName: nickName.value, round, move };
    this.stopGameSocketService.sendMyMove(myMove);
  }

  public getCurrentPlayer(
    nickName: string,
    game: BehaviorSubject<IStopGame>,
  ): IPlayer {
    const currentGame: IStopGame = game.value;
    const { players } = currentGame;
    const currentPlayer: IPlayer = players.find(
      (player) => player.nickName === nickName,
    );
    return currentPlayer;
  }

  public handleMovement(movement: IMovement): void {
    if (movement) {
      const { game } = this;
      const currentPlayer = this.getCurrentPlayer(movement.nickName, game);
      console.log(currentPlayer);
      if (!currentPlayer.moves) {
        currentPlayer.moves = new Map<string, IMove>();
      }
      currentPlayer.moves.set(movement.round, movement.move);
      this.game.next(game.value);
    }
  }

  private handleNewPlayer(player: IPlayer): void {
    const currentGame = this.game.value;
    const { players } = currentGame;
    const foundedPlayer = players.find((p) => p.nickName === player.nickName);
    if (!foundedPlayer) {
      players.push(player);
    }
  }

  public addWord(element: string): void {
    const { game, nickName, currentRound } = this;
    const currentPlayer = this.getCurrentPlayer(nickName.value, game);
    if (!currentPlayer.moves) {
      currentPlayer.moves = new Map<string, IMove>();
      const emptyMove: IMove = getEmptyMove();
      currentPlayer.moves.set(currentRound, emptyMove);
    }
    const currentMoves = currentPlayer.moves.get(currentRound);
    const inputElement = this.formPlaying.get(element);
    const wordToAdd = inputElement.value;
    inputElement.reset();
    if (this.isValidWord(wordToAdd)) {
      const categoryMoves = [...currentMoves[element], { word: wordToAdd }];
      currentMoves[element] = categoryMoves;
      this.sendMovement(currentPlayer);
    }
  }

  private isValidWord(word: string): boolean {
    return !!word && !!word.trim();
  }
}

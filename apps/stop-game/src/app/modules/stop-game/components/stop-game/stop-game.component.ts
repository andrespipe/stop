import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  getEmptyMove,
  IMove,
  IMovement,
  IPlayer,
  IStopGame,
  IWord,
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
  game = new BehaviorSubject<IStopGame>(null);
  nickName: string = 'AFMV';
  playingForm = this.fb.group({
    animal: [, Validators.required],
    cityCountry: [, Validators.required],
    food: [, Validators.required],
    lastName: [, Validators.required],
    name: [, Validators.required],
  });

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
  }

  public sendMovement(currentPlayer: IPlayer) {
    const { nickName, currentRound: round } = this;
    const { moves } = currentPlayer;
    const move = moves.get(round);
    const myMove: IMovement = { nickName, round, move };
    this.stopGameSocketService.sendMyMove(myMove);
  }

  private getCurrentPlayer(
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

  public handleMovement(movement: IMovement) {
    if (movement) {
      const { game, nickName } = this;
      const currentPlayer = this.getCurrentPlayer(nickName, game);
      if (!currentPlayer.moves) {
        currentPlayer.moves = new Map<string, IMove>();
      }
      currentPlayer.moves.set(movement.round, movement.move);
      this.game.next(game.value);
    }
  }

  public addWord(element: string): void {
    const { game, nickName, currentRound } = this;
    const currentPlayer = this.getCurrentPlayer(nickName, game);
    if (!currentPlayer.moves) {
      currentPlayer.moves = new Map<string, IMove>();
      const emptyMove: IMove = getEmptyMove();
      currentPlayer.moves.set(currentRound, emptyMove);
    }
    const currentMoves = currentPlayer.moves.get(currentRound);
    const inputElement = this.playingForm.get(element);
    const wordToAdd = inputElement.value;
    inputElement.reset();
    const categoryMoves = [...currentMoves[element], { word: wordToAdd }];
    currentMoves[element] = categoryMoves;
    this.sendMovement(currentPlayer);
  }
}

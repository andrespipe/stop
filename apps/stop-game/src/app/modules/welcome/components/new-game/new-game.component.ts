import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { StopGameService } from '@stop-game/fe/services/stop-game.service';
import { INewStopGame, IPlayer, IStopGame } from '@stop-game/data';
@Component({
  selector: 'stop-game-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.scss'],
})
export class NewGameComponent implements OnInit {
  formNewGame = this.fb.group({
    isPrivateGame: [true, Validators.required],
    language: ['', Validators.required],
    nickName: ['', Validators.required],
    rounds: [5, Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private stopGameService: StopGameService,
  ) {}

  ngOnInit(): void {}

  public onSubmitNewGame(): void {
    const {
      formNewGame: {
        value: { nickName, isPrivateGame, language, rounds },
      },
    } = this;
    const player: IPlayer = { nickName };
    const newGame: INewStopGame = {
      isPrivateGame,
      language,
      players: [player],
      rounds,
    };
    this.stopGameService
      .createNewGame(newGame)
      .subscribe((game) => this.handleNewGame(game, nickName));
  }

  private handleNewGame(game: IStopGame, myNickname: string) {
    this.stopGameService.openGame(game, myNickname);
  }
}

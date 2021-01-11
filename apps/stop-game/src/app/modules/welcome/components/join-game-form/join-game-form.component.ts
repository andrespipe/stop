import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IStopGame } from '@stop-game/data';
import { StopGameService } from '@stop-game/fe/services/stop-game.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'stop-game-join-game-form',
  templateUrl: './join-game-form.component.html',
  styleUrls: ['./join-game-form.component.scss'],
})
export class JoinGameFormComponent implements OnInit {
  @Input() gameCode: string;
  @Output() joinedGame = new EventEmitter<[IStopGame, string]>();

  _gameCode = new BehaviorSubject<string>(null);

  formJoinGame = this.fb.group({
    gameCode: ['', Validators.required],
    nickName: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private stopGameService: StopGameService,
  ) {}

  ngOnInit(): void {
    const { gameCode } = this;
    if (gameCode) {
      this._gameCode.next(gameCode);
      this.formJoinGame.get('gameCode').setValue(gameCode);
    }
  }

  public onSubmitJoinGame() {
    const {
      formJoinGame: {
        value: { gameCode, nickName },
      },
    } = this;
    this.stopGameService
      .joinGame(gameCode, { nickName })
      .subscribe((joinedGame) => this.joinedGame.emit([joinedGame, nickName]));
  }
}

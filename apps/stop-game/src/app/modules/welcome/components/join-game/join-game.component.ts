import { Component, OnInit } from '@angular/core';
import { IStopGame } from '@stop-game/data';
import { StopGameService } from '@stop-game/fe/services/stop-game.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'stop-game-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.scss'],
})
export class JoinGameComponent implements OnInit {
  publicGames = new BehaviorSubject<IStopGame[]>(null);
  selectedGame = new BehaviorSubject<string>(null);

  constructor(private stopGameService: StopGameService) {}

  ngOnInit(): void {
    this.stopGameService
      .getPublicGames()
      .subscribe((publicGames) => this.publicGames.next(publicGames));
  }

  public trackById(index: number, game: IStopGame): string {
    return game.id;
  }

  public selectGame(gameId: string) {
    console.log(gameId);
    this.selectedGame.next(gameId);
  }

  public onJoinedGame(gameInfo: [IStopGame, string]) {
    this.stopGameService.openGame(gameInfo[0], gameInfo[1]);
  }
}

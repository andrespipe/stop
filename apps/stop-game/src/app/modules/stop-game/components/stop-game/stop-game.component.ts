import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IStopGame } from '@stop-game/data';
import { StopGameService } from '@stop-game/fe/services/stop-game.service';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'stop-game-stop-game',
  templateUrl: './stop-game.component.html',
  styleUrls: ['./stop-game.component.scss'],
})
export class StopGameComponent implements OnInit {
  game = new BehaviorSubject<IStopGame>(null);
  routeSubscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private stopGameService: StopGameService,
  ) {
    this.routeSubscription = this.activatedRoute.params.subscribe((params) =>
      this.onActivatedRoute(params),
    );
  }

  ngOnInit(): void {}

  private onActivatedRoute(params): void {
    // this.routeSubscription.unsubscribe();
    console.log('subscription', this.routeSubscription);
    const gameId = params.id;
    if (gameId) {
      this.stopGameService
        .loadGame(gameId)
        .subscribe((game) => this.onGameLoaded(game));
    } else {
    }
  }

  private onGameLoaded(game: IStopGame) {
    console.log('onGameLoaded', game);
    this.game.next(game);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { INewStopGame, IPlayer, IStopGame } from '@stop-game/data';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StopGameService {
  baseURL = 'api/stop-game';
  currentGameId = new BehaviorSubject<string>(null);
  currentNickName = new BehaviorSubject<string>(null);

  constructor(private http: HttpClient, private router: Router) {}

  public createNewGame(newGame: INewStopGame): Observable<IStopGame> {
    return this.http.post<IStopGame>(this.baseURL, newGame);
  }

  public getPublicGames(): Observable<IStopGame[]> {
    const url = `${this.baseURL}/publicGames`;
    return this.http.get<IStopGame[]>(url);
  }

  public joinGame(gameCode: string, player: IPlayer): Observable<IStopGame> {
    const url = `${this.baseURL}/${gameCode}/addPlayer`;
    return this.http.put<IStopGame>(url, player);
  }

  public openGame(game: IStopGame, myNickname: string) {
    const { id } = game;
    this.currentGameId.next(id);
    this.currentNickName.next(myNickname);
    this.router.navigate([`stop-game/${id}`]);
  }

  public loadGame(gameId: string): Observable<IStopGame> {
    const url = `${this.baseURL}/${gameId}`;
    return this.http.get<IStopGame>(url);
  }

  public findPlayer(gameId: string, nickname: string): Observable<IPlayer> {
    const url = `${this.baseURL}/${gameId}/player/${nickname}`;
    return this.http.get<IPlayer>(url);
  }
}

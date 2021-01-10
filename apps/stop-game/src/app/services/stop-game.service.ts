import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { INewStopGame, IPlayer, IStopGame } from '@stop-game/data';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StopGameService {
  baseURL = 'api/stop-game';

  constructor(private http: HttpClient) {}

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
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { INewStopGame, IStopGame } from '@stop-game/data';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class StopGameService {

  constructor(private http: HttpClient) { }

  public createNewGame(newGame: INewStopGame): Observable<IStopGame> {
    const url = `api/game`;
    return this.http.post<IStopGame>(url, newGame);
  }
}

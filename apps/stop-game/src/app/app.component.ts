import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@stop-game/api-interfaces';
import { UiThemeService } from '@stop-game/fe/services/ui-theme.service';
import { IUIColor } from '@stop-game/fe/models/ui.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'stop-game-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  hello$ = this.http.get<Message>('/api/hello');
  theme: BehaviorSubject<IUIColor>;
  constructor(
    private http: HttpClient,
    private uITheme: UiThemeService, 
    ) {
      this.theme = uITheme.currentTheme;
    }
}

import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UiThemeService } from '@stop-game/fe/services/ui-theme.service';
import { IUIColor } from '@stop-game/fe/models/ui.model';

@Component({
  selector: 'stop-game-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {

  theme: BehaviorSubject<IUIColor>;

  constructor(private uITheme: UiThemeService) {
    this.theme = uITheme.currentTheme;
  }

  ngOnInit(): void {
  }

}

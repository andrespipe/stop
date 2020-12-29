import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUIColor, UIThemeColor, UiThemeService } from '../../services/ui-theme.service';

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

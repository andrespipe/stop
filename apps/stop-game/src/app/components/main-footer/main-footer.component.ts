import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUIColor, UiThemeService } from '../../services/ui-theme.service';

@Component({
  selector: 'stop-game-main-footer',
  templateUrl: './main-footer.component.html',
  styleUrls: ['./main-footer.component.scss']
})
export class MainFooterComponent implements OnInit {

  theme: BehaviorSubject<IUIColor>;

  constructor(private uITheme: UiThemeService) {
    this.theme = uITheme.currentTheme;
  }
  ngOnInit(): void {
  }

}

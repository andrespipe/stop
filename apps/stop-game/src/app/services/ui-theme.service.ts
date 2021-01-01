import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UIThemeColor, IUIColor } from '@stop-game/fe/models/ui.model';
import { uIColors } from '@stop-game/fe/models/ui.constants';
@Injectable({
  providedIn: 'root'
})
export class UiThemeService {

  currentThemeName= new BehaviorSubject<UIThemeColor>(UIThemeColor.ORANGE);
  currentTheme = new BehaviorSubject<IUIColor>(uIColors.get(this.currentThemeName.value));

  set theme(value: UIThemeColor){
    this.currentThemeName.next(value);
  }

  constructor() {
    this.currentThemeName.subscribe(value => this.handleNextThemeName(value));
  }

  private handleNextThemeName(uiThemeColor: UIThemeColor) {
    const colorTheme = uIColors.get(uiThemeColor);
    this.currentTheme.next(colorTheme);
  }
}





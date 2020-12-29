import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface IUIColor{
  bg: string;
  fg: string;
  variant: string;
}

export enum UIThemeColor {
  GREEN = 'GREEN',
  LIME ='LIME',
  ORANGE = 'ORANGE',
}

const colors = new Map<string, IUIColor>();
colors.set(UIThemeColor.GREEN, { bg: 'black', fg: 'light-green', variant: 'lighten-'});
colors.set(UIThemeColor.LIME, { bg: 'black', fg: 'lime', variant: 'accent-'});
colors.set(UIThemeColor.ORANGE, { bg: 'white', fg: 'deep-orange', variant: 'accent-'});

@Injectable({
  providedIn: 'root'
})
export class UiThemeService {

  currentThemeName= new BehaviorSubject<UIThemeColor>(UIThemeColor.ORANGE);
  currentTheme = new BehaviorSubject<IUIColor>(colors.get(this.currentThemeName.value));

  set theme(value: UIThemeColor){
    this.currentThemeName.next(value);
  }

  constructor() {
    this.currentThemeName.subscribe(value => this.handleNextThemeName(value));
  }

  private handleNextThemeName(uiThemeColor: UIThemeColor) {
    const colorTheme = colors.get(uiThemeColor);
    this.currentTheme.next(colorTheme);
  }
}





import { IUIColor, UIThemeColor } from '@stop-game/fe/models/ui.model';

export const uIColors = new Map<string, IUIColor>();

uIColors.set(UIThemeColor.GREEN, { bg: 'black', fg: 'light-green', variant: 'lighten-'});
uIColors.set(UIThemeColor.LIME, { bg: 'black', fg: 'lime', variant: 'accent-'});
uIColors.set(UIThemeColor.ORANGE, { bg: 'white', fg: 'deep-orange', variant: 'accent-'});
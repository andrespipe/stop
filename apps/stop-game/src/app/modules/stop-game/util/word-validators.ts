import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { IStopGame } from '@stop-game/data';
import { BehaviorSubject } from 'rxjs';

export const startByValidator = (startString: string): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (`${value}`.toUpperCase().indexOf(startString.toUpperCase()) === 0) {
      return null;
    }
    return { noStartBy: true };
  };
};

export const isNotWordInGame = (
  game: BehaviorSubject<IStopGame>,
  value: string,
  element: string,
  round: string,
): boolean => {
  const _game = game.value;
  const { players } = _game;
  const values = players.reduce((pre, cur) => {
    const moves = cur.moves;
    if (moves) {
      const roundMove = moves.get(round)[element];
      if (roundMove) {
        return [...pre, ...roundMove.map((w) => w.word)];
      }
    }
    return pre;
  }, []);
  console.log(_game);
  console.log(values);
  const founded = values.find(
    (v) => `${v}`.toUpperCase() === `${value}`.toUpperCase(),
  );
  return !founded;
};

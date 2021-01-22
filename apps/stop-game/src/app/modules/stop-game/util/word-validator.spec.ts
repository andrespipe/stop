import { isNotWordInGame, startByValidator } from './word-validators';

describe('WordValidator', () => {
  it('should create an instance', () => {
    expect(isNotWordInGame).toBeTruthy();
  });
});

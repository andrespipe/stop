import { mongoUUID, mongoUUIDFnDef } from './mongo';

describe('mongo', () => {
  it('should get mongoUUID function definition', () => {
    expect(JSON.stringify(mongoUUID())).toEqual(JSON.stringify(mongoUUID));
  });
});
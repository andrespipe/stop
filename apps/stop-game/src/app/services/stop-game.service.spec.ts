import { TestBed } from '@angular/core/testing';

import { StopGameService } from './stop-game.service';

describe('StopGameService', () => {
  let service: StopGameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StopGameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

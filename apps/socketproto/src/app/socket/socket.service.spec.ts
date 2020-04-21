import { TestBed } from '@angular/core/testing';

import { CustomsocketService } from './socket.service';

describe('CustomsocketService', () => {
  let service: CustomsocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomsocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

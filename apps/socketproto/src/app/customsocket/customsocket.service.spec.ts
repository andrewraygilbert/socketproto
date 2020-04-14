import { TestBed } from '@angular/core/testing';

import { CustomsocketService } from './customsocket.service';

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

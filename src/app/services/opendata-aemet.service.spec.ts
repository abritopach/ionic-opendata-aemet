import { TestBed } from '@angular/core/testing';

import { OpendataAemetService } from './opendata-aemet.service';

describe('OpendataAemetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OpendataAemetService = TestBed.get(OpendataAemetService);
    expect(service).toBeTruthy();
  });
});

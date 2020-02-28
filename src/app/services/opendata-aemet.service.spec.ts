import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';

import { OpendataAemetService } from './opendata-aemet.service';

describe('OpendataAemetService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
  }));

  it('should be created', () => {
    const service: OpendataAemetService = TestBed.get(OpendataAemetService);
    expect(service).toBeTruthy();
  });
});

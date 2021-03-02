import { TestBed } from '@angular/core/testing';

import { ModeloWebcamService } from './modelo-webcam.service';

describe('ModeloWebcamService', () => {
  let service: ModeloWebcamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModeloWebcamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

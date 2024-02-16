import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { StoriesService } from './stories.service';

describe('StoriesService', () => {
  let service: StoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    });
    service = TestBed.inject(StoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

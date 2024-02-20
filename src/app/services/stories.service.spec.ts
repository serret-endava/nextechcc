import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Story } from '../models/story';

import { StoriesService } from './stories.service';

describe('StoriesService', () => {
  let storiesService: StoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    });
    storiesService = TestBed.inject(StoriesService);
  });

  it('should be created', () => {
    expect(storiesService).toBeTruthy();
  });

  it('should return expected stories', (done: DoneFn) => {
    const expectedStories: Story[] = [
      { id: 777, title: 'First title', url: 'testurl.com' },
      { id: 888, title: 'Second title', url: 'testingAngular.com' },
      { id: 999, title: 'Third title', url: 'notyourcommontests.com' }
    ]

    spyOn(storiesService, 'getNewestStories').and.returnValue(of(expectedStories));

    storiesService.getNewestStories().subscribe({
      next: (stories) => {
        expect(stories).toEqual(expectedStories);
        done();
      }, error: done.fail
    });
    expect(storiesService.getNewestStories).toHaveBeenCalledOnceWith();
  })
});

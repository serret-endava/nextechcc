import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { Story } from '../models/story';
import { StoriesService } from '../services/stories.service';

import { StoriesComponent } from './stories.component';

describe('StoriesComponent', () => {
  let component: StoriesComponent;
  let fixture: ComponentFixture<StoriesComponent>;
  let storiesService: StoriesService;
  let storiesMock: Story[] = [
    { id: 777, title: 'First title', url: 'testurl.com' },
    { id: 888, title: 'Second title', url: 'testingAngular.com' },
    { id: 999, title: 'Third title', url: 'notyourcommontests.com' }
  ]

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StoriesComponent],
      imports: [
        HttpClientModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatToolbarModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatPaginatorModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule
      ]
    });
    storiesService = TestBed.inject(StoriesService);
    fixture = TestBed.createComponent(StoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should have <h1> with "Hacker News" and subtitle', () => {
    const headerElement: HTMLElement = fixture.nativeElement;
    const h1 = headerElement.querySelector('h1')!;
    const h4 = headerElement.querySelector('h4')!;
    expect(h1.textContent).toEqual('Hacker News');
    expect(h4.textContent).toEqual('Newest stories');
  })

  it('should render search input', () => {
    const searchElement: HTMLElement = fixture.nativeElement;
    const searchInput = searchElement.querySelector('input')!;
    
    expect(searchInput.placeholder).toEqual('Eg. Customer emails leaked');
  })

  it('should render headers and stories in a table', () => {
    spyOn(storiesService, 'getNewestStories').and.returnValue(of(storiesMock));
    component.ngOnInit()
    fixture.detectChanges();
    expect(component.stories).toEqual(storiesMock);

    let tableRows = fixture.nativeElement.querySelectorAll('tr');
    expect(tableRows.length).toBe(4);

    let headerRow = tableRows[0];
    expect(headerRow.cells[0].innerHTML).toBe('Title');

    let firstRow = tableRows[1];
    expect(firstRow.cells[0].innerHTML).toBe('First title');
    expect(firstRow.cells[1].querySelector('a').getAttribute('href')).toBe('testurl.com');

    let secondRow = tableRows[2];
    expect(secondRow.cells[0].innerHTML).toBe('Second title');
    expect(secondRow.cells[1].querySelector('a').getAttribute('href')).toBe('testingAngular.com');

    let thirdRow = tableRows[3];
    expect(thirdRow.cells[0].innerHTML).toBe('Third title');
    expect(thirdRow.cells[1].querySelector('a').getAttribute('href')).toBe('notyourcommontests.com');
  })
});

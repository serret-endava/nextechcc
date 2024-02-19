import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { StoriesService } from '../services/stories.service';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss']
})
export class StoriesComponent {
  private readonly apiUrl = `https://hacker-news.firebaseio.com/v0`;
  displayedColumns: string[] = ['title', 'details'];
  dataSource!: MatTableDataSource<number>;
  currentStories: any[] = [];
  stories: any[] = [];
  totalItems: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(public storiesService: StoriesService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.storiesService.getNewestStories().subscribe(async data => {
      this.totalItems = data.length;
      this.stories = data;
      this.dataSource = new MatTableDataSource(this.stories);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  openDialog(data: any) {
    this.dialog.open(DialogComponent, { data });
  }
}
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
      const promises = data.slice(0, 5)
        .map(x => fetch(`${this.apiUrl}/item/${x}.json`)
          .then(res => res.json()));
      this.currentStories = await Promise.all(promises);
      this.dataSource = new MatTableDataSource(this.currentStories);
      //this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  async getCurrentStories(event: any) {
    const skip = this.paginator.pageSize * this.paginator.pageIndex;

    const paged = this.stories.filter((u, i) => i >= skip)
      .filter((u, i) => i < this.paginator.pageSize);

    const promises = paged
      .map(x => fetch(`${this.apiUrl}/item/${x}.json`)
        .then(res => res.json()));

    this.currentStories = await Promise.all(promises);
    this.dataSource = new MatTableDataSource(this.currentStories);
  }

  openDialog(data: any) {
    this.dialog.open(DialogComponent, { data });
  }
}
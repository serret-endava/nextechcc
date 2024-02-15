import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoriesService {
  private readonly apiUrl = `https://hacker-news.firebaseio.com/v0`;

  constructor(private httpClient: HttpClient) { }

  getNewestStories(): Observable<number[]> {
    return this.httpClient.get<number[]>(`${this.apiUrl}/newstories.json`);
  }
}

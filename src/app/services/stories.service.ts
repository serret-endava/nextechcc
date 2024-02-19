import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Story } from '../models/story';

@Injectable({
  providedIn: 'root'
})
export class StoriesService {
  private readonly apiUrl = `https://api-nextech.azurewebsites.net/api`;

  constructor(private httpClient: HttpClient) { }

  getNewestStories(): Observable<Story[]> {
    return this.httpClient.get<Story[]>(`${this.apiUrl}/Stories`);
  }
}

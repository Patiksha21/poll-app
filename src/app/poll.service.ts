import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Poll } from './poll.models'; // make sure your Poll interface is correct

@Injectable({
  providedIn: 'root',
})
export class PollService {
  private baseUrl = 'http://localhost:8080/api/polls'; // backend base URL

  constructor(private http: HttpClient) {}

  // 1️⃣ Get all polls
  getPolls(): Observable<Poll[]> {
    return this.http.get<Poll[]>(this.baseUrl);
  }

  // 2️⃣ Vote on a poll option
  vote(pollId: number, optionIndex: number): Observable<any> {
    // Adjust the endpoint according to your backend
    return this.http.post(`${this.baseUrl}/vote`, {
      pollId: pollId,
      optionIndex: optionIndex
    });
  }

  // 3️⃣ Create a new poll
  createPoll(question: string, options: string[]): Observable<Poll> {
    // Transform options into array of objects if your backend expects {option: string}
    const payload = {
      question,
      options: options.map(opt => ({ option: opt }))
    };
    return this.http.post<Poll>(this.baseUrl, payload);
  }
}
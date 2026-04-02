import { Component, signal } from '@angular/core';
import { Poll } from './poll/poll';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Poll],   // ✅ correct
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('poll-app');
}
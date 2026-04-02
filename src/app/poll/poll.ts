import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PollService } from '../poll.service';
import { Poll as PollModel } from '../poll.models';

@Component({
  selector: 'app-poll',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './poll.html',
  styleUrls: ['./poll.css']
})
export class Poll implements OnInit {

  polls: PollModel[] = [];

  // Form fields for creating a poll
  newQuestion: string = '';
  newOptions: string = ''; // comma-separated options

  constructor(private pollService: PollService) {}

  ngOnInit(): void {
    this.loadPolls();
  }

  // Fetch polls from backend
  loadPolls(): void {
    this.pollService.getPolls().subscribe({
      next: (data) => this.polls = data,
      error: (err) => console.error('Error fetching polls:', err)
    });
  }

  // Vote for a poll option
  vote(pollId: number, optionIndex: number): void {
    this.pollService.vote(pollId, optionIndex).subscribe({
      next: () => this.loadPolls(), // refresh after voting
      error: (err) => console.error('Error voting:', err)
    });
  }

  // Create a new poll
  addPoll(): void {
    if (!this.newQuestion || !this.newOptions) {
      alert('Please enter question and options!');
      return;
    }

    const optionsArray = this.newOptions.split(',').map(opt => opt.trim());

    this.pollService.createPoll(this.newQuestion, optionsArray).subscribe({
      next: () => {
        alert('Poll created successfully!');
        this.newQuestion = '';
        this.newOptions = '';
        this.loadPolls();
      },
      error: (err) => console.error('Error creating poll:', err)
    });
  }
}
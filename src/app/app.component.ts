import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html'
})
export class AppComponent {
  points: number;
  target: number;
  tasks: number;
  master: string;
  eliteKourend: boolean;
  eliteWesternProvinces: boolean;
  tasksNeeded: number;
  masterUsed: string;

  // Store amount of points per master
  masters: { [key: string]: number[] } = {
    'Turael/Spria': [0, 0, 0, 0, 0, 0],
    'Mazchna': [2, 5, 15, 50, 70, 100],
    'Vannaka': [4, 20, 60, 100, 140, 200],
    'Chaeldar': [10, 50, 150, 250, 350, 500],
    'Nieve/Steve': [12, 60, 180, 300, 420, 600],
    'Duradel': [15, 75, 225, 375, 525, 750],
    'Konar quo Maten': [18, 90, 270, 450, 630, 900],
    'Krystilia': [25, 125, 375, 625, 875, 1250]
  };

  constructor() {
    this.points = 0;
    this.target = 0;
    this.tasks = 0;
    this.master = '';
    this.eliteKourend = false;
    this.eliteWesternProvinces = false;
    this.tasksNeeded = -2;
    this.masterUsed = '';
  }

  // Calculate remaining tasks to reach slayer point target
  calculate() {
    if (this.master !== 'Turael/Spria') {
      let points = this.points;
      let tasks = this.tasks;

      while (points < this.target) {
        points += this.getPoints(++tasks);
      }

      this.tasksNeeded = tasks - this.tasks;
    } else {
      this.tasksNeeded = -1;
    }

    this.masterUsed = this.master;
  }

  // Get points rewarded for a given task streak
  getPoints(tasks: number): number {
    let points;
    if (this.eliteKourend && this.master === 'Konar quo Maten') {
      if (tasks % 1000 === 0)
        points = 1000;
      else if (tasks % 250 === 0)
        points = 700;
      else if (tasks % 100 === 0)
        points = 500;
      else if (tasks % 50 === 0)
        points = 300;
      else if (tasks % 10 === 0)
        points = 100;
      else
        points = 20;
    } else if (this.eliteWesternProvinces && this.master === 'Nieve/Steve') {
      if (tasks % 1000 === 0)
        points = 750;
      else if (tasks % 250 === 0)
        points = 525;
      else if (tasks % 100 === 0)
        points = 375;
      else if (tasks % 50 === 0)
        points = 225;
      else if (tasks % 10 === 0)
        points = 75;
      else
        points = 15;
    } else {
      if (tasks % 1000 === 0)
        points = this.masters[this.master][5];
      else if (tasks % 250 === 0)
        points = this.masters[this.master][4];
      else if (tasks % 100 === 0)
        points = this.masters[this.master][3];
      else if (tasks % 50 === 0)
        points = this.masters[this.master][2];
      else if (tasks % 10 === 0)
        points = this.masters[this.master][1];
      else
        points = this.masters[this.master][0];
    }
    return points;
  }
}

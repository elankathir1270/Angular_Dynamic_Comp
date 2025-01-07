import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../Services/dashboard.service';

@Component({
  selector: 'app-sse',
  standalone: false,

  templateUrl: './sse.component.html',
  styleUrl: './sse.component.css',
})
export class SseComponent implements OnInit {
  boats: any[] = [];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getServerSentEvents().subscribe({
      next: (data) => this.updateTable(data),
      complete: () => console.log('All mock data received.'),
      error: (err) => console.error('Error receiving mock data:', err),
    });
  }

  updateTable(newData: any): void {
    const index = this.boats.findIndex((boat) => boat.id === newData.id);
    if (index !== -1) {
      // Update existing row
      this.boats[index] = newData;
    } else {
      // Add new row
      this.boats.push(newData);
    }
  }
}

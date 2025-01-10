import { Component, OnInit } from '@angular/core';
import { SseService } from '../Services/sse.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-sse',
  standalone: false,

  templateUrl: './sse.component.html',
  styleUrl: './sse.component.css',
})
export class SseComponent implements OnInit {
  DataStream: any;

  constructor(private sseService: SseService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.sseService.getServerSentEvents().subscribe({
      next: (data) => this.updateTable(data),
      complete: () => console.log('All mock data received.'),
      error: (err) => console.error('Error receiving mock data:', err),
    });
  }

  mapToTableData(newData: any): any {
    return {
      id: newData.id,
      title: newData.title,
      type: newData.type,
      user: newData.user,
      server_name: newData.server_name,
    };
  }

  updateTable(newData: any): void {
    console.log('Received data:', newData);

    const formattedData = this.mapToTableData(newData);
    console.log('Format data:', formattedData);

    const index = this.DataStream.findIndex(
      (data) => data?.id === formattedData?.id
    );
    if (index !== -1 && this.DataStream[index]) {
      // Update existing row
      this.DataStream[index] = formattedData;
    } else {
      // Add new row
      this.DataStream.push(formattedData);
    }

    this.DataStream = [...this.DataStream];
  }
}

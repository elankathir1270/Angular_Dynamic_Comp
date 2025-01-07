import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  mockData: any[] = [
    {
      id: '123',
      boatName: 'Sea Voyager',
      status: 'loaded',
      date: '2025-01-07T10:30:00Z',
      boardingOfficer: 'John Doe',
      startingPoint: 'Port A',
      destination: 'Port B',
    },
    {
      id: '124',
      boatName: 'Ocean Explorer',
      status: 'pending',
      date: '2025-01-07T11:00:00Z',
      boardingOfficer: 'Jane Smith',
      startingPoint: 'Port C',
      destination: 'Port D',
    },
    {
      id: '125',
      boatName: 'Harbor King',
      status: 'hold',
      date: '2025-01-07T11:30:00Z',
      boardingOfficer: 'Michael Brown',
      startingPoint: 'Port E',
      destination: 'Port F',
    },
    {
      id: '126',
      boatName: 'Wave Rider',
      status: 'loaded',
      date: '2025-01-07T12:00:00Z',
      boardingOfficer: 'Emily Davis',
      startingPoint: 'Port G',
      destination: 'Port H',
    },
    {
      id: '127',
      boatName: 'Marine Spirit',
      status: 'pending',
      date: '2025-01-07T12:30:00Z',
      boardingOfficer: 'William Johnson',
      startingPoint: 'Port I',
      destination: 'Port J',
    },
  ];
  constructor() {}
  // getServerSentEvents(): Observable<any> {
  //   return new Observable((observer) => {
  //     let index = 0;

  //     // Simulate SSE by emitting one item every 2 seconds
  //     const intervalId = setInterval(() => {
  //       if (index < this.mockData.length) {
  //         observer.next(this.mockData[index]);
  //         index++;
  //       } else {
  //         // Complete the stream after sending all mock data
  //         observer.complete();
  //         clearInterval(intervalId);
  //       }
  //     }, 2000);

  //     // Cleanup function
  //     return () => clearInterval(intervalId);
  //   });
  // }

  private statuses = ['loaded', 'pending', 'hold']; // Possible status updates

  getServerSentEvents(): Observable<any> {
    return new Observable((observer) => {
      // Emit initial data for the table
      this.mockData.forEach((data) => observer.next(data));

      // Simulate updates every 2 seconds
      const intervalId = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * this.mockData.length); // Pick a random record
        const randomStatus =
          this.statuses[Math.floor(Math.random() * this.statuses.length)]; // Pick a random status

        // Update the selected record with a new status and current timestamp
        const updatedData = {
          ...this.mockData[randomIndex],
          status: randomStatus,
          date: new Date().toISOString(), // Update the date to the current time
        };

        // Update the mock data array
        this.mockData[randomIndex] = updatedData;

        // Emit the updated data
        observer.next(updatedData);
      }, 1000);

      // Cleanup function
      return () => clearInterval(intervalId);
    });
  }
}

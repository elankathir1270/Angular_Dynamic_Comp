import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SseService {
  constructor() {}

  private sseUrl = 'https://stream.wikimedia.org/v2/stream/recentchange';

  getServerSentEvents(): Observable<any> {
    return new Observable((observer) => {
      const eventSource = new EventSource(this.sseUrl);

      eventSource.onmessage = (event) => {
        observer.next(JSON.parse(event.data));
      };

      eventSource.onerror = (error) => {
        console.error('SSE Error:', error);
        observer.error(error);
        eventSource.close();
      };

      return () => {
        eventSource.close();
      };
    });
  }
}

import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { CimsService } from './cims.service';

describe('CimsService', () => {
  it('should normalize keyed trend payloads and snake_case values', (done) => {
    TestBed.configureTestingModule({
      providers: [CimsService]
    });

    const http = jasmine.createSpyObj<HttpClient>('HttpClient', ['get']);
    const service = new CimsService(http);

    http.get.and.returnValue(of({
      '2025-10-01': { created_at: 3, closed_at: 1 },
      '2025-10-02': { created: 2, closed: 0 }
    }));

    service.getTicketsTrend(30).subscribe((points) => {
      expect(points).toEqual([
        { date: '2025-10-01', created: 3, closed: 1 },
        { date: '2025-10-02', created: 2, closed: 0 }
      ]);
      done();
    });
  });

  it('should normalize nested data wrappers and direct objects', (done) => {
    TestBed.configureTestingModule({
      providers: [CimsService]
    });

    const http = jasmine.createSpyObj<HttpClient>('HttpClient', ['get']);
    const service = new CimsService(http);

    http.get.and.returnValue(of({
      data: {
        '2025-10-03': { created: 4, closed: 2 },
        '2025-10-04': { created: 1, closed: 1 }
      }
    }));

    service.getTicketsTrend(30).subscribe((points) => {
      expect(points).toEqual([
        { date: '2025-10-03', created: 4, closed: 2 },
        { date: '2025-10-04', created: 1, closed: 1 }
      ]);
      done();
    });
  });

  it('should read count variants with normalized keys', (done) => {
    TestBed.configureTestingModule({
      providers: [CimsService]
    });

    const http = jasmine.createSpyObj<HttpClient>('HttpClient', ['get']);
    const service = new CimsService(http);

    http.get.and.returnValue(of([
      { date: '2025-10-05', created_count: 7, closed_count: 3 },
      { date: '2025-10-06', total_created: 2, total_closed: 1 }
    ]));

    service.getTicketsTrend(30).subscribe((points) => {
      expect(points).toEqual([
        { date: '2025-10-05', created: 7, closed: 3 },
        { date: '2025-10-06', created: 2, closed: 1 }
      ]);
      done();
    });
  });
});

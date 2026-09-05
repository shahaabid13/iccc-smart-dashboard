import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import {
  Channel,
  ChannelFilterRequest,
  ChannelResponse,
  ApiResponse
} from '../models/traffic-dashboard.dtos';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {
  private readonly apiUrl = `${environment.apiBaseUrl}/api/channels`;
  private channelsSubject = new BehaviorSubject<Channel[]>([]);
  public channels$ = this.channelsSubject.asObservable();

  constructor(private http: HttpClient) {}

  /**
   * Fetch all channels or filtered channels
   * GET /api/channels?serverId=&type=&location=
   */
 getChannels(filters?: ChannelFilterRequest): Observable<Channel[]> {
  let params = new HttpParams();
  if (filters) {
    if (filters.serverId) params = params.set('serverId', filters.serverId);
    if (filters.type) params = params.set('type', filters.type);
    if (filters.location) params = params.set('location', filters.location);
    if (filters.status) params = params.set('status', filters.status);
  }
  return this.http.get<Channel[]>(this.apiUrl, { params }).pipe(
    tap((channels) => this.channelsSubject.next(channels ?? []))
  );
}

getChannelsByServer(serverId: string): Observable<Channel[]> {
  return this.getChannels({ serverId });
}


  /**
   * Get all channels cached in subject
   */
  getChannelsFromCache(): Channel[] {
    return this.channelsSubject.value;
  }

  /**
   * Filter channels by type (ANPR, Evidence, GENERAL)
   */
  filterChannelsByType(type: string): Channel[] {
    return this.channelsSubject.value.filter((ch) => ch.type === type);
  }

  /**
   * Search channels by location/name
   */
  searchChannels(searchTerm: string): Channel[] {
    const term = searchTerm.toLowerCase();
    return this.channelsSubject.value.filter(
      (ch) =>
        ch.name.toLowerCase().includes(term) ||
        ch.location.toLowerCase().includes(term)
    );
  }
}
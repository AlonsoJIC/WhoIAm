import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TrackingRecord {
  link_id: string;
  ip: string | null;
  user_agent: string | null;
  browser: string | null;
  os: string | null;
  device: string | null;
  referer: string | null;
  country: string | null;
  city: string | null;
  region: string | null;
  timestamp: string;
  destination_url: string;
  isp: string | null;
  org: string | null;
  asn: string | null;
}

@Injectable({ providedIn: 'root' })
export class TrackingService {
  private supabaseUrl = 'https://wlcsvktjddxaiomzwocj.supabase.co/rest/v1/link_tracking';
  private supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndsY3N2a3RqZGR4YWlvbXp3b2NqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcxMjM1MzAsImV4cCI6MjA4MjY5OTUzMH0.JJfAj7q3O547_vOPaIvZfQ-ZUKd1x6Nx915gr6FmhlU';

  constructor(private http: HttpClient) { }

  getTrackingRecords(): Observable<TrackingRecord[]> {
    const headers = new HttpHeaders({
      'apikey': this.supabaseKey,
      'Authorization': `Bearer ${this.supabaseKey}`
    });
    return this.http.get<TrackingRecord[]>(this.supabaseUrl, { headers });
  }
}

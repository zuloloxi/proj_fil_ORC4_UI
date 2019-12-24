import { Inject, Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { RegleDTO } from '../shared-data/regle-dto';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegleService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient,
              @Inject('BACKEND_URL') private baseUrl: string) { }

  getAllRegles(): Observable<RegleDTO[]> {

    return this.http.get<RegleDTO[]>(`${this.baseUrl}/regle/`)
      .pipe(
        map((regleArray: any[]) => regleArray.map(regle => new RegleDTO(regle)))
      );
  }
}

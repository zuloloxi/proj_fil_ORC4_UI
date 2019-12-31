import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CompetenceDTO } from '../shared-data/competence-dto';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompetenceService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient,
              @Inject('BACKEND_URL') private baseUrl: string) { }

  getAllCompetences(): Observable<CompetenceDTO[]> {

    return this.http.get<CompetenceDTO[]>(`${this.baseUrl}/competences/`)
      .pipe(
        map((competenceArray: any[]) => competenceArray.map(competence => new CompetenceDTO(competence)))
      );

  }
}

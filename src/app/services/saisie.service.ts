import { Injectable, Inject } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { SaisieDTO } from '../shared-data/saisie-dto';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SaisieService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient,
              @Inject('BACKEND_URL') private baseUrl: string) { }

  getAllSaisies(): Observable<SaisieDTO[]> {

    return this.http.get<SaisieDTO[]>(`${this.baseUrl}/saisies/`)
      .pipe(
        map((competenceArray: any[]) => competenceArray.map(competence => new SaisieDTO(competence)))
      );

  }

  deleteSaisie(id: number): Observable<SaisieDTO> {
    return this.http.delete<SaisieDTO>(`${this.baseUrl}/saisies/${id}`);
  }

  saveSaisie(competence: SaisieDTO): Observable<SaisieDTO> {
    return this.http.post<SaisieDTO>(`${this.baseUrl}/saisies`, competence);
  }

  modifySaisie(id: number, competence: SaisieDTO): Observable<SaisieDTO> {
    return this.http.put<SaisieDTO>(`${this.baseUrl}/saisies/${id}`, competence);
  }
}

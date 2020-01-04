import { Inject, Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { RegleDTO } from '../shared-data/regle-dto';
import { Observable, Subject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegleService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  refreshRegles = new Subject<string>();

  constructor(private http: HttpClient,
              @Inject('BACKEND_URL') private baseUrl: string) { }

  getAllRegles(): Observable<RegleDTO[]> {

    return this.http.get<RegleDTO[]>(`${this.baseUrl}/regles/`)
      .pipe(
        map((regleArray: any[]) => regleArray.map(regle => new RegleDTO(regle)))
      );
  }

  getRegle(id: number): Observable<RegleDTO> {

    return this.http.get<RegleDTO>(`${this.baseUrl}/regles/` + id)

    .pipe(

      map(regle => new RegleDTO(regle))

    );

 }

 saveRegle(regle: RegleDTO): any  {

  const url = `${this.baseUrl}/regles` + (regle.id !== 0 ? `/${regle.id}` : '');

  const method = regle.id === 0 ? 'post' : 'put';


  return this.http.request(method, url, {body: regle}).subscribe(
    () => {
      this.refreshRegles.next('refresh');
    },
    (error) => {
      console.log('Erreur ! : ' + error);
    }
  );
}

  deleteRegle(id: number): Observable<RegleDTO> {
    return this.http.delete<RegleDTO>(`${this.baseUrl}/regles/${id}`);
  }
}

import { Inject, Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { RegleDTO, RegleViewList } from '../shared-data/regle-dto';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegleService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor(private http: HttpClient,
              @Inject('BACKEND_URL') private baseUrl: string) { }

  getAllRegles(): Observable<RegleViewList[]> {

    return this.http.get<RegleDTO[]>(`${this.baseUrl}/regles/`)
      .pipe(
        map((regleArray: any[]) => regleArray.map(regle => {
          const regex = /,/gi;
          const competencesLibelle: string[] = [] ;
          regle.competences.forEach(competence => competencesLibelle.push(competence.competence + '\n'));
          return new RegleViewList(regle.id, regle.deploiement, regle.metier, regle.posteType, regle.domaine, regle.stratesEquipes,
            regle.profil, regle.equipesSupervisees, regle.descriptifEquipesSupervisses, regle.competences,
            competencesLibelle.toString().replace(regex, '') )}
      )));
  }

  getReglesByCompetenceId(competenceId: number): Observable<RegleViewList[]> {

    return this.http.get<RegleDTO[]>(`${this.baseUrl}/regles/competenceId/` + competenceId)
      .pipe(
        map((regleArray: any[]) => regleArray.map(regle => {
          const regex = /,/gi;
          const competencesLibelle: string[] = [] ;
          regle.competences.forEach(competence => competencesLibelle.push(competence.competence + '\n'));
          return new RegleViewList(regle.id, regle.deploiement, regle.metier, regle.posteType, regle.domaine, regle.stratesEquipes,
            regle.profil, regle.equipesSupervisees, regle.descriptifEquipesSupervisses, regle.competences,
            competencesLibelle.toString().replace(regex, '') )}
      )));
  }


  getRegle(id: number): Observable<RegleDTO> {

    return this.http.get<RegleDTO>(`${this.baseUrl}/regles/` + id)

    .pipe(

      map(regle => new RegleDTO(regle))

    );

 }

 saveRegle(regle: RegleDTO): any {

  const url = `${this.baseUrl}/regles` + (regle.id !== 0 ? `/${regle.id}` : '');

  const method = regle.id === 0 ? 'post' : 'put';

  return this.http.request(method, url, {body: regle});
}

  deleteRegle(id: number): Observable<RegleDTO> {
    return this.http.delete<RegleDTO>(`${this.baseUrl}/regles/${id}`);
  }
}

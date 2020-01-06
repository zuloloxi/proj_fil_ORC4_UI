import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { CollaborateurDTO } from '../shared-data/collaborateur-dto';
import { map} from 'rxjs/operators';
import { OutputDto } from '../shared-data/output-dto';

@Injectable({
  providedIn: 'root'
})
export class CollaborateurService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  search = new Subject<any>();

  constructor(private http: HttpClient,
              @Inject('BACKEND_URL') private baseUrl: string) { }

  // observable
  getAllCollaborateurs(): Observable<CollaborateurDTO[]> {

    return this.http.get<CollaborateurDTO[]>(`${this.baseUrl}/inputs/`)
      .pipe(
        map((collaborateurArray: any[]) => collaborateurArray.map(collaborateur => new CollaborateurDTO(collaborateur)))
      );

  }

  getOneCollaborateur(collaborateurUid: string): Observable<CollaborateurDTO> {
    return this.http.get(`${this.baseUrl}/inputs/uid/${collaborateurUid}`) .pipe(
      map((collaborateurInfos: any) => new CollaborateurDTO(collaborateurInfos))
      );
  }

  deleteCollaborateutUid(collaborateurUid: string): Observable<CollaborateurDTO> {
    return this.http.delete<CollaborateurDTO>(`${this.baseUrl}/inputs/deleteuid/${collaborateurUid}`);
  }

  updateCollaborateurUid(collaborateurUid: string, collaborateurDTO: CollaborateurDTO) : Observable<void>{
    return this.http.put<void>(`${this.baseUrl}/inputs/updateuid/${collaborateurUid}`, collaborateurDTO);
  }

  getOnetransformInput(collaborateurUid: string): Observable<OutputDto> {
    return this.http.get<OutputDto>(`${this.baseUrl}/inputs/transform/uid/${collaborateurUid}`);
  }

}

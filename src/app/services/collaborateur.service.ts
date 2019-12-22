import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { CollaborateurDTO } from '../shared-data/collaborateur-dto';

@Injectable({
  providedIn: 'root'
})
export class CollaborateurService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  search = new Subject<any>();

  constructor(private http: HttpClient) { }

  // observable
  getAllCollaborateurs(): Observable<CollaborateurDTO[]> {

    return this.http.get<CollaborateurDTO[]>('http://localhost:8080/collaborateurs');

  }

}

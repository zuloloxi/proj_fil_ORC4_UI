import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { OutputDto } from '../shared-data/output-dto';
import { Output } from '../shared-data/output';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OutputService {

  httpOptions = {
      headers: new HttpHeaders({'content-type': 'application/json', 'Access-Control-Allow-Origin' : 'allowedOrigin'})
    };

    searchValue: Subject<string> = new Subject<string>();
    constructor(private http: HttpClient) { }

   // observable
      getAlltransformInputs(): Observable<OutputDto[]> {
      return this.http.get<OutputDto[]>('http://localhost:8080/inputs/transform');
    }

    // observable
      getAllOutputs(): Observable<Output[]> {
      return this.http.get<Output[]>('http://localhost:8080/outputs');
    }

    // observable
      publishResults(results : OutputDto[]): Observable<void> {
      return this.http.post<void>('http://localhost:8080/outputs/publishResults', results, this.httpOptions);
    }

    // observable
      deleteOutputs(): Observable<void> {
      return this.http.delete<void>('http://localhost:8080/outputs');
    }

}

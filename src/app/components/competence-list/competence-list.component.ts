import { Component, OnInit } from '@angular/core';
import { CompetenceDTO } from 'src/app/shared-data/competence-dto';
import { CompetenceService } from 'src/app/services/competence.service';
import { Message } from 'primeng/api/primeng-api';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-competence-list',
  templateUrl: './competence-list.component.html',
  styleUrls: ['./competence-list.component.scss', '../../app.component.scss']
})
export class CompetenceListComponent implements OnInit {

  competences: CompetenceDTO[] = [];
  display: boolean;
  competenceDetail: CompetenceDTO;
  httpMessage: string;
  msgs: Message[] = [];


  constructor(private competenceService: CompetenceService,
              private errorService: ErrorService) { }

  ngOnInit() {
    this.competenceService.getAllCompetences().subscribe(
      competenceList => {
          console.log(competenceList);
          return this.competences = competenceList;
        },
      error => console.log(error)
    );
  }

  deleteCompetence(id: number) {
    return this.competenceService.deleteCompetence(id).subscribe(
      () => {this.competences.splice(this.competences.findIndex(regle => regle.id === id), 1);
             },
      error =>  {const messageFonctionnel = this.errorService.getMessage(error.error[0]);
                 if (messageFonctionnel.length > 0){
                   this.httpMessage = error.error[0] + ' : ' + messageFonctionnel;
                 }else{
                   this.httpMessage = 'Erreur ' + error.status + ' : ' + error.error.message;
                 }
                 this.msgs.push({severity: 'error', summary: '', detail: this.httpMessage});
                }
    );
  }
}

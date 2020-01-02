import { Component, OnInit } from '@angular/core';
import { CompetenceDTO } from 'src/app/shared-data/competence-dto';
import { CompetenceService } from 'src/app/services/competence.service';
import { Message } from 'primeng/api/primeng-api';
import { ErrorService } from 'src/app/services/error.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-competence-list',
  templateUrl: './competence-list.component.html',
  styleUrls: ['./competence-list.component.scss', '../../app.component.scss']
})
export class CompetenceListComponent implements OnInit {

  competenceForm = new FormGroup({
    competence: new FormControl('', [Validators.required, Validators.minLength(1)]),
    descriptif: new FormControl('', [Validators.required, Validators.minLength(1)])
  });
  addCompetence = false;
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
      error =>  this.msgs.push({severity: 'error', summary: '', detail: this.errorService.getMessage(error)})
    );
  }

  saveCompetence() {
    if (this.competenceForm.get('competence').valid && this.competenceForm.get('descriptif').valid) {
      const newCompetence = new CompetenceDTO({
        competence: this.competenceForm.get('competence').value,
        descriptif: this.competenceForm.get('descriptif').value})
      return this.competenceService.saveCompetence(newCompetence).subscribe(
        competenceDTO => this.showCompetenceInBeginningOfList(competenceDTO),
        error => this.msgs.push({severity: 'error', summary: '', detail: this.errorService.getMessage(error)})
      );

    }
  }

  showCompetenceInBeginningOfList(competenceDTO){
    this.competences.unshift(competenceDTO);
  }

}

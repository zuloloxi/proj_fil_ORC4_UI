import { Component, OnInit } from '@angular/core';
import { CompetenceDTO } from 'src/app/shared-data/competence-dto';
import { CompetenceService } from 'src/app/services/competence.service';
import { Message } from 'primeng/api/primeng-api';
import { ErrorService } from 'src/app/services/error.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {ConfirmationService} from 'primeng/api';


@Component({
  selector: 'app-competence-list',
  templateUrl: './competence-list.component.html',
  styleUrls: ['./competence-list.component.scss', '../../app.component.scss'],
  providers: [ConfirmationService]
})
export class CompetenceListComponent implements OnInit {

  competencePostForm = new FormGroup({
    competence: new FormControl('', [Validators.required, Validators.minLength(1)]),
    descriptif: new FormControl('', [Validators.required, Validators.minLength(1)])
  });
  descriptifPutForm = new FormGroup({
    descriptif: new FormControl('', [Validators.required, Validators.minLength(1)])
  });
  addCompetence = false;
  competences: CompetenceDTO[] = [];
  competenceDetail: CompetenceDTO;
  httpMessage: string;
  msgs: Message[] = [];
  // display: boolean;
  competenceSort: boolean;
  descriptifSort: boolean;
  competenceToModify: CompetenceDTO;


  constructor(private confirmationService: ConfirmationService,
              private competenceService: CompetenceService,
              private errorService: ErrorService) { }

  ngOnInit() {
    this.competenceService.getAllCompetences().subscribe(
      competenceList => {
          // console.log(competenceList);
          return this.competences = competenceList;
        },
      error => console.log(error)
    );
  }

  deleteCompetence(id: number) {
    this.confirmationService.confirm({
      message: 'Voulez-vous supprimer cette compétence ?',
      accept: () => {
                      return this.competenceService.deleteCompetence(id).subscribe(
                      () => {this.competences.splice(this.competences.findIndex(competence => competence.id === id), 1);
                            },
                      error =>  this.msgs.push({severity: 'error', summary: '', detail: this.errorService.getMessage(error)})
                      );
                    }
      });
  }

  saveCompetence() {
    if (this.competencePostForm.get('competence').valid && this.competencePostForm.get('descriptif').valid) {
      const newCompetence = new CompetenceDTO({
        competence: this.competencePostForm.get('competence').value,
        descriptif: this.competencePostForm.get('descriptif').value});
      return this.competenceService.saveCompetence(newCompetence).subscribe(
        competenceDTO => {
          this.showCompetenceInBeginningOfList(competenceDTO);
          this.addCompetence = false;
        },
        error => this.msgs.push({severity: 'error', summary: '', detail: this.errorService.getMessage(error)})
      );
    }
  }

  showCompetenceInBeginningOfList(competenceDTO) {
    this.competences.unshift(competenceDTO);
  }

  modifyCompetence() {
    if (this.descriptifPutForm.get('descriptif').valid) {
      const modifiedCompetence = new CompetenceDTO({
        competence: this.competenceToModify.competence,
        descriptif: this.descriptifPutForm.get('descriptif').value});
      return this.competenceService.modifyCompetence(this.competenceToModify.id, modifiedCompetence).subscribe(
        competenceDTO => {
          const index = this.competences.findIndex(competence => competence.id === this.competenceToModify.id);
          this.competences[index].descriptif = competenceDTO.descriptif;
          this.competenceToModify = null;
        },
        error => this.msgs.push({severity: 'error', summary: '', detail: this.errorService.getMessage(error)})
      );
    } else {
      this.msgs.push({severity: 'warn', summary: '', detail: 'descriptif non renseigné'});
    }
  }

  sortBy(field: string) {
    switch (field) {

      case 'COMPETENCE' : {
        const coef = this.competenceSort ? 1 : -1;
        this.competences = this.competences.sort((a, b) => (a.competence.toUpperCase() >= b.competence.toUpperCase()) ? coef : -coef);
        this.competenceSort = !this.competenceSort;
        break;
      }
      case 'DESCRIPTIF' : {
        const coef = this.descriptifSort ? 1 : -1;
        this.competences = this.competences.sort((a, b) => (a.descriptif.toUpperCase() >= b.descriptif.toUpperCase()) ? coef : -coef);
        this.descriptifSort = !this.descriptifSort;
        break;
      }
    }

  }
}

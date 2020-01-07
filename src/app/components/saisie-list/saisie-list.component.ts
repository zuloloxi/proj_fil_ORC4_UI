import { Component, OnInit } from '@angular/core';
import { SaisieService } from 'src/app/services/saisie.service';
import { SaisieDTO } from 'src/app/shared-data/saisie-dto';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Message } from 'primeng/api/primeng-api';
import {ConfirmationService} from 'primeng/api';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-saisie-list',
  templateUrl: './saisie-list.component.html',
  styleUrls: ['./saisie-list.component.scss'],
  providers: [ConfirmationService]
})
export class SaisieListComponent implements OnInit {

  saisies: SaisieDTO[] = [];
  saisieForm = new FormGroup({
    collaborateurUid: new FormControl('', [Validators.required, Validators.minLength(1)]),
    domaine: new FormControl('', [Validators.minLength(1)]),
    equipe: new FormControl('', [Validators.minLength(1)]),
    profil: new FormControl('', [Validators.minLength(1)]),
    competences: new FormControl('', [Validators.minLength(1)])
  });
  addCompetence = false;
  saisieDetail: SaisieDTO;
  httpMessage: string;
  msgs: Message[] = [];
  // display: boolean;
  saisieToModify: SaisieDTO;
  constructor(private saisieService: SaisieService,
              private errorService: ErrorService,
              private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.saisieService.getAllSaisies().subscribe(
      saisieList => {
          return this.saisies = saisieList;
        },
      error => console.log(error)
    );
  }

  deleteSaisie(id: number) {
    this.confirmationService.confirm({
      message: 'Voulez-vous supprimer cette saisie ?',
      accept: () => {
                      return this.saisieService.deleteSaisie(id).subscribe(
                      () => {this.saisies.splice(this.saisies.findIndex(saisie => saisie.id === id), 1);
                            },
                      error =>  this.msgs.push({severity: 'error', summary: '', detail: this.errorService.getMessage(error)})
                      );
                    }
      });
  }

  modifySaisie() {
    if (this.isSaisieFormValid()) {
      const modifiedCompetence = new SaisieDTO({
        collaborateurUid: this.saisieToModify.collaborateurUid,
        domaine: this.saisieForm.get('domaine').value,
        equipe: this.saisieForm.get('equipe').value,
        profil: this.saisieForm.get('profil').value,
        competences: this.saisieForm.get('competences').value
      });
      return this.saisieService.modifySaisie(this.saisieToModify.id, modifiedCompetence).subscribe(
        competenceDTO => {
          const index = this.saisies.findIndex(competence => competence.id === this.saisieToModify.id);
          this.saisies[index].domaine = competenceDTO.domaine;
          this.saisies[index].equipe = competenceDTO.equipe;
          this.saisies[index].profil = competenceDTO.profil;
          this.saisies[index].competences = competenceDTO.competences;
          this.saisieToModify = null;
        },
        error => this.msgs.push({severity: 'error', summary: '', detail: this.errorService.getMessage(error)})
      );
    } else {
      if (!this.saisieForm.get('domaine').valid) { this.msgs.push({severity: 'warn', summary: '', detail: 'domaine non renseigné'}); }
      if (!this.saisieForm.get('equipe').valid) { this.msgs.push({severity: 'warn', summary: '', detail: 'equipe non renseignée'}); }
      if (!this.saisieForm.get('profil').valid) { this.msgs.push({severity: 'warn', summary: '', detail: 'profil non renseigné'}); }
      if (!this.saisieForm.get('competences').valid) {
                                                  this.msgs.push({severity: 'warn', summary: '', detail: 'competences non renseignées'}); }
    }
  }

  private isSaisieFormValid(): boolean {
    return this.saisieForm.get('domaine').valid
        && this.saisieForm.get('equipe').valid
        && this.saisieForm.get('profil').valid
        && this.saisieForm.get('competences').valid;
  }
}

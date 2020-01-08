import { Component, OnInit } from '@angular/core';
import { SaisieService } from 'src/app/services/saisie.service';
import { SaisieDTO } from 'src/app/shared-data/saisie-dto';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Message } from 'primeng/api/primeng-api';
import {ConfirmationService} from 'primeng/api';
import { ErrorService } from 'src/app/services/error.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-saisie-list',
  templateUrl: './saisie-list.component.html',
  styleUrls: ['./saisie-list.component.scss', '../../app.component.scss'],
  providers: [ConfirmationService]
})
export class SaisieListComponent implements OnInit {

  saisies: SaisieDTO[] = [];
  saisiePutForm = new FormGroup({
    domaine: new FormControl('', [Validators.required, Validators.minLength(1)]),
    equipe: new FormControl('', [Validators.required, Validators.minLength(1)]),
    profil: new FormControl('', [Validators.required, Validators.minLength(1)]),
    competences: new FormControl('', [Validators.required, Validators.minLength(1)])
  });
  saisiePostForm = new FormGroup({
    collaborateurUid: new FormControl('', [Validators.required, Validators.minLength(1)]),
    domaine: new FormControl('', [Validators.required, Validators.minLength(1)]),
    equipe: new FormControl('', [Validators.required, Validators.minLength(1)]),
    profil: new FormControl('', [Validators.required, Validators.minLength(1)]),
    competences: new FormControl('', [Validators.required, Validators.minLength(1)])
  });
  addSaisie = false;
  saisieDetail: SaisieDTO;
  httpMessage: string;
  msgs: Message[] = [];
  saisieToModify: SaisieDTO;
  cols = [
    { field: 'collaborateurUid', header: 'Uid' , colspan: '1'},
    { field: 'domaine', header: 'Domaine' , colspan: '3'},
    { field: 'equipe', header: 'equipe' , colspan: '3'},
    { field: 'profil', header: 'profil' , colspan: '3'},
    { field: 'competences', header: 'competences' , colspan: '5'}
  ];

  constructor(private route: ActivatedRoute,
              private saisieService: SaisieService,
              private errorService: ErrorService,
              private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.saisieService.getAllSaisies().subscribe(
      saisieList => {
          this.saisies = saisieList;
          this.activateFormWhenParams();
        },
      error => console.log(error)
    );

  }

  private activateFormWhenParams() {
    const saisieToAdd = this.getUrlParams();
    if (saisieToAdd.collaborateurUid) {
      const saisieIndex = this.getIndexIfCollaborateurAlreadyHasSaisie(saisieToAdd.collaborateurUid);
      if (saisieIndex > -1) {
        saisieToAdd.id = this.saisies[saisieIndex].id;
        this.saisies.splice(saisieIndex, 1);
        this.activatePut(saisieToAdd);
      } else {
        this.activatePost(saisieToAdd);
      }
    }
  }

  // exemple :  http://localhost:4200/saisie/output?identifiant=d84512&domaine=Domaine&equipe=Equipe&profil=Profil&competences=Competences
  private getUrlParams(): SaisieDTO {
    return new SaisieDTO({
      collaborateurUid: this.route.snapshot.queryParams.identifiant,
      domaine: this.route.snapshot.queryParams.domaine,
      equipe: this.route.snapshot.queryParams.equipe,
      profil: this.route.snapshot.queryParams.profil,
      competences: this.route.snapshot.queryParams.competences
    });
  }

  private getIndexIfCollaborateurAlreadyHasSaisie(uid: string): number {
    return this.saisies.findIndex(saisie => saisie.collaborateurUid === uid);
  }

  private activatePut(saisieToModify: SaisieDTO) {
    this.saisies.splice(0, 0, saisieToModify);
    this.showModifyForm(saisieToModify);
  }

  private activatePost(saisieToModify: SaisieDTO) {
    this.showPostForm(saisieToModify);
  }

  showModifyForm(saisie: SaisieDTO) {
    this.saisieToModify = saisie;
    this.saisiePutForm.setValue({
      domaine: saisie.domaine,
      equipe: saisie.equipe,
      profil: saisie.profil,
      competences: saisie.competences
    });
  }

  showPostForm(saisie: SaisieDTO) {
    this.addSaisie = true;
    this.saisiePostForm.setValue({
      collaborateurUid: saisie.collaborateurUid,
      domaine: saisie.domaine,
      equipe: saisie.equipe,
      profil: saisie.profil,
      competences: saisie.competences
    });
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
    if (this.isSaisiePutFormValid()) {
      const modifiedCompetence = new SaisieDTO({
        collaborateurUid: this.saisieToModify.collaborateurUid,
        domaine: this.saisiePutForm.get('domaine').value,
        equipe: this.saisiePutForm.get('equipe').value,
        profil: this.saisiePutForm.get('profil').value,
        competences: this.saisiePutForm.get('competences').value
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
      if (!this.saisiePutForm.get('domaine').valid) { this.msgs.push({severity: 'warn', summary: '', detail: 'domaine non renseigné'}); }
      if (!this.saisiePutForm.get('equipe').valid) { this.msgs.push({severity: 'warn', summary: '', detail: 'equipe non renseignée'}); }
      if (!this.saisiePutForm.get('profil').valid) { this.msgs.push({severity: 'warn', summary: '', detail: 'profil non renseigné'}); }
      if (!this.saisiePutForm.get('competences').valid) {
                                                  this.msgs.push({severity: 'warn', summary: '', detail: 'competences non renseignées'}); }
    }
  }

  private isSaisiePutFormValid(): boolean {
    return this.saisiePutForm.get('domaine').valid
        && this.saisiePutForm.get('equipe').valid
        && this.saisiePutForm.get('profil').valid
        && this.saisiePutForm.get('competences').valid;
  }

  saveSaisie() {
    if (this.isSaisiePostFormValid()) {
      const newSaisie = new SaisieDTO({
        collaborateurUid: this.saisiePostForm.get('collaborateurUid').value,
        domaine: this.saisiePostForm.get('domaine').value,
        equipe: this.saisiePostForm.get('equipe').value,
        profil: this.saisiePostForm.get('profil').value,
        competences: this.saisiePostForm.get('competences').value.replace(' ', '')});
      return this.saisieService.saveSaisie(newSaisie).subscribe(
        saisieDTO => {
          this.showNewSaisieInBeginningOfList(saisieDTO);
          this.saisiePostForm.setValue({collaborateurUid: '', domaine: '', equipe: '', profil: '', competences: '', });
          this.addSaisie = false;
        },
        error => this.msgs.push({severity: 'error', summary: '', detail: this.errorService.getMessage(error)})
      );
    }
  }

  private isSaisiePostFormValid(): boolean {
    return this.saisiePostForm.get('collaborateurUid').valid
        && this.saisiePostForm.get('domaine').valid
        && this.saisiePostForm.get('equipe').valid
        && this.saisiePostForm.get('profil').valid
        && this.saisiePostForm.get('competences').valid;
  }

  private showNewSaisieInBeginningOfList(saisieDTO) {
    this.saisies.unshift(saisieDTO);
  }
}

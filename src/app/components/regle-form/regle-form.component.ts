import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CompetenceDTO } from 'src/app/shared-data/competence-dto';
import { RegleDTO } from 'src/app/shared-data/regle-dto';
import { Router, ActivatedRoute } from '@angular/router';
import { RegleService } from 'src/app/services/regle.service';
import { ConfirmationService, Message } from 'primeng/api';
import { CompetenceService } from 'src/app/services/competence.service';
import { ErrorService } from 'src/app/services/error.service';
import { RegleAction } from 'src/app/enums/regle-action.enum';


@Component({
  selector: 'app-regle-form',
  templateUrl: './regle-form.component.html',
  styleUrls: ['./regle-form.component.scss'],
  providers: [ConfirmationService]
})
export class RegleFormComponent implements OnInit {

  regleForm: FormGroup;
  competencesList: CompetenceDTO[] = [];
  regleToCreate: RegleDTO;
  idUpdate: number;
  regleAction: RegleAction;
  msgs: Message[] = [];


  constructor(private fb: FormBuilder, private regleService: RegleService,
              private competenceService: CompetenceService,
              private confirmationService: ConfirmationService,
              private errorService: ErrorService,
              private router: Router, private route: ActivatedRoute ) { }

    ngOnInit() {
      this.idUpdate = +this.route.snapshot.paramMap.get('id');
      if (this.router.url.startsWith("/regleupdate")) {this.regleAction = RegleAction.Update; }
      if (this.router.url.startsWith("/reglecreate")) {this.regleAction = RegleAction.Create; }
      if (this.router.url.startsWith("/regledelete")) {this.regleAction = RegleAction.Delete; }

      this.competenceService.getAllCompetences().subscribe(
        competencesList => {
          this.competencesList = competencesList;
        },
        error => console.log('erreur')
      );
      this.regleForm = this.fb.group ({
        deploiement: [],
        metier: [],
        posteType: [[], [Validators.required, Validators.minLength(1)]],
        domaine: [[], [Validators.required, Validators.minLength(1)]],
        stratesEquipes: [],
        profil: [],
        equipesSupervisees: [],
        descriptifEquipesSupervisses: [],
        competences: [],
      });

      if (this.idUpdate) {
        this.regleService.getRegle(this.idUpdate).subscribe (
          regle => this.regleForm = this.fb.group ({
            deploiement: [regle.deploiement],
            metier: [regle.metier],
            posteType: [regle.posteType, [Validators.required, Validators.minLength(1)]],
            domaine: [regle.domaine, [Validators.required, Validators.minLength(1)]],
            stratesEquipes: [regle.stratesEquipes],
            profil: [regle.profil],
            equipesSupervisees: [regle.equipesSupervisees],
            descriptifEquipesSupervisses: [regle.descriptifEquipesSupervisses],
            competences: [regle.competences],
          })
        );
      }

    }
    saveRegle() {

      if (this.regleForm.get('posteType').valid && this.regleForm.get('domaine').valid ) {
         this.regleToCreate = new RegleDTO(
        {
        id: this.idUpdate ? this.idUpdate : 0,
        deploiement: this.regleForm.get('deploiement').value,
        metier: this.regleForm.get('metier').value,
        posteType: this.regleForm.get('posteType').value,
        domaine: this.regleForm.get('domaine').value,
        stratesEquipes: this.regleForm.get('stratesEquipes').value,
        profil: this.regleForm.get('profil').value,
        equipesSupervisees: this.regleForm.get('equipesSupervisees').value,
        descriptifEquipesSupervisses: this.regleForm.get('descriptifEquipesSupervisses').value,
        competences: this.regleForm.get('competences').value}
      );
         if (this.regleToCreate.competences == null) {this.regleToCreate.competences = [] }  ;
         this.regleService.saveRegle(this.regleToCreate);
         this.regleService.refreshRegles.subscribe(
           refresh => this.router.navigate(['/regles']) );
         }

      }

      deleteRegle(){
        this.confirmationService.confirm({
      message: 'Êtes vous sur de vouloir supprimer la règle ?',
      accept: () => {
      return this.regleService.deleteRegle(this.idUpdate).subscribe(
         () => {this.router.navigate(['/regles'])
               },
               error =>  this.msgs.push({severity: 'error', summary: '', detail: this.errorService.getMessage(error)})
         );
       }
      });
      }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CompetenceDTO } from 'src/app/shared-data/competence-dto';
import { RegleDTO } from 'src/app/shared-data/regle-dto';
import { Router, ActivatedRoute } from '@angular/router';
import { RegleService } from 'src/app/services/regle.service';
import { CompetenceService } from 'src/app/services/competence.service';

@Component({
  selector: 'app-regle-form',
  templateUrl: './regle-form.component.html',
  styleUrls: ['./regle-form.component.scss']
})
export class RegleFormComponent implements OnInit {

  regleForm: FormGroup;
  competencesList: CompetenceDTO[] = [];
  regleToCreate: RegleDTO;
  idUpdate: number;

  constructor(private fb: FormBuilder, private regleService: RegleService,
              private competenceService: CompetenceService,
              private router: Router, private route: ActivatedRoute ) { }

    ngOnInit() {
      this.idUpdate = +this.route.snapshot.paramMap.get('id');
      console.log(this.idUpdate);
      this.competenceService.getAllCompetences().subscribe(
        competencesList => {
          this.competencesList = competencesList;
        },
        error => console.log('erreur')
      );
      this.regleForm = this.fb.group ({
        deploiement: [],
        metier: [],
        posteType: [],
        domaine: [],
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
            posteType: [regle.posteType],
            domaine: [regle.domaine],
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
    //  console.log(this.regleForm.get('metier').value);
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

      if (this.regleToCreate.competences == null) {alert('liste de compétence obligatoire'); } else {
        console.log(this.regleToCreate);
        this.regleService.saveRegle(this.regleToCreate);
        this.regleService.refreshRegles.subscribe(
        refresh => this.router.navigate(['/regles'])
      );
     }
    }

}

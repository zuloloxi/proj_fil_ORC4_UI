import { Component, OnInit } from '@angular/core';
import { RegleService } from 'src/app/services/regle.service';
import { RegleDTO } from 'src/app/shared-data/regle-dto';
import { Router } from '@angular/router';
import { Message } from 'primeng/api/message';
import { CompetenceDTO } from 'src/app/shared-data/competence-dto';
import { CompetenceService } from 'src/app/services/competence.service';

@Component({
  selector: 'app-regles-list',
  templateUrl: './regles-list.component.html',
  styleUrls: ['./regles-list.component.scss', '../../app.component.scss']
})
export class ReglesListComponent implements OnInit {

  regles: RegleDTO[] = [];
  display: boolean;
  regleDetail: RegleDTO;
  httpMessage: string;
  msgs: Message[] = [];
  cols: any[];


  constructor(private router: Router,
              private regleService: RegleService,
              private competenceService: CompetenceService) { }

  ngOnInit() {
    this.regleService.getAllRegles().subscribe(
      regleList => this.regles = regleList,
      error => console.log(error)
    );

    this.cols = [
      { field: 'metier', header: 'Métier' },
      { field: 'posteType', header: 'Poste Type' },
      { field: 'domaine', header: 'Domaine' },
      { field: 'stratesEquipes', header: 'Strates Équipes' },
      { field: 'profil', header: 'Profil' },
      { field: 'equipesSupervisees', header: 'Équipes Supervisées' },
      { field: 'descriptifEquipesSupervisses', header: 'Descriptif' },
      { field: 'competences', header: 'Compétences' },
      { field: 'actions', header: 'Actions'}
  ];

  }

  viewDetail(regle: RegleDTO) {
    this.regleDetail = regle;
    this.display = !this.display;
  }

  deleteRegle(id: number) {
    // return this.regleService.deleteRegle(id).subscribe(
     return this.regleService.deleteRegle(id).subscribe(
      () => {this.regles.splice(this.regles.findIndex(regle => regle.id === id), 1);
             },
      error =>  {this.httpMessage = 'Erreur ' + error.status + ' : ' + error.error.message;
                 this.msgs.push({severity: 'error', summary: '', detail: this.httpMessage});
                }
    );
  }

  reformatMetier(metier: string) {
    const truncPosition = metier.indexOf('(');
    return (truncPosition > 0) ? metier.substring(0, truncPosition) : '';
  }

  sortBy(field: string, order: string = 'ASC') {
    const coef = (order === 'ASC') ? 1 : -1;
    switch (field) {
      case 'METIER' : this.regles = this.regles.sort((a, b) => (a.metier >= b.metier) ? coef : -coef); break;
      case 'POSTE' : this.regles = this.regles.sort((a, b) => (a.posteType >= b.posteType) ? coef : -coef); break;
      case 'STRATE' : this.regles = this.regles.sort((a, b) => (a.stratesEquipes >= b.stratesEquipes) ? coef : -coef); break;
      case 'COMPETENCE' : this.regles = this.regles.sort((a, b) =>
                                        (a.competences[0].competence >= b.competences[0].competence) ? coef : -coef);
    }

  }

  goUpdate(regle: RegleDTO) {
    this.router.navigate(['/regleupdate', regle.id]);
  }

  goCreate() {
    this.router.navigate(['/reglecreate']);
}

}

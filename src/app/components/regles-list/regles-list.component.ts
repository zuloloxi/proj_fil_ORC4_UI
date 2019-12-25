import { Component, OnInit } from '@angular/core';
import { RegleService } from 'src/app/services/regle.service';
import { RegleDTO } from 'src/app/shared-data/regle-dto';

@Component({
  selector: 'app-regles-list',
  templateUrl: './regles-list.component.html',
  styleUrls: ['./regles-list.component.scss', '../../app.component.scss']
})
export class ReglesListComponent implements OnInit {

  regles: RegleDTO[] = [];
  display: boolean;
  regleDetail: RegleDTO;

  constructor(private regleService: RegleService) { }

  ngOnInit() {
    this.regleService.getAllRegles().subscribe(
      regleList => this.regles = regleList,
      error => console.log('erreur')
    );
  }

  viewDetail(regle: RegleDTO) {
    this.regleDetail = regle;
    this.display = !this.display;
  }

  reformatMetier(metier: string) {
    const truncPosition = metier.indexOf('\n');
    return (truncPosition > 0) ? metier.substring(0, truncPosition) : '';
  }

  sortBy(field: string, order: string = 'ASC'){
    const coef = (order === 'ASC') ? 1 : -1;
    switch (field) {
      case 'METIER' : this.regles = this.regles.sort((a, b) => (a.metier >= b.metier) ? coef : -coef); break;
      case 'POSTE' : this.regles = this.regles.sort((a, b) => (a.posteType >= b.posteType) ? coef : -coef); break;
      case 'STRATE' : this.regles = this.regles.sort((a, b) => (a.stratesEquipes >= b.stratesEquipes) ? coef : -coef); break;
      case 'COMPETENCE' : this.regles = this.regles.sort((a,b) => (a.competences[0].competence >= b.competences[0].competence) ? coef : -coef); break;
    }

  }

}

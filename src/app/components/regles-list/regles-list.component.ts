import { Component, OnInit } from '@angular/core';
import { RegleService } from 'src/app/services/regle.service';
import { RegleDTO } from 'src/app/shared-data/regle-dto';
import { Router } from '@angular/router';
import { Message } from 'primeng/api/message';

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

  constructor(private router: Router,
              private regleService: RegleService) { }

  ngOnInit() {
    this.regleService.getAllRegles().subscribe(
      regleList => this.regles = regleList,
      error => console.log(error)
    );
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
    const truncPosition = metier.indexOf('\n');
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

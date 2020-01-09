import { Component, OnInit } from '@angular/core';
import { RegleService } from 'src/app/services/regle.service';
import { RegleDTO, RegleViewList } from 'src/app/shared-data/regle-dto';
import { Router, ActivatedRoute } from '@angular/router';
import { Message } from 'primeng/api/message';
import { ConfirmationService } from 'primeng/api';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-regles-list',
  templateUrl: './regles-list.component.html',
  styleUrls: ['./regles-list.component.scss', '../../app.component.scss'],
  providers: [ConfirmationService]
})
export class ReglesListComponent implements OnInit {

  regles: RegleViewList[] = [];
  display: boolean;
  regleDetail: RegleViewList;
  httpMessage: string;
  msgs: Message[] = [];
  comptetenceID: number;
  cols: any[];

  constructor(private router: Router,
              private regleService: RegleService,
              private errorService: ErrorService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.comptetenceID = +this.route.snapshot.paramMap.get('competenceId');
    if (this.comptetenceID) {
      this.regleService.getReglesByCompetenceId(this.comptetenceID).subscribe(
        regleList => this.regles = regleList,
        error => console.log(error)
      );
    } else {
    this.regleService.getAllRegles().subscribe(
      regleList => this.regles = regleList,
      error => console.log(error)
    );
   }

    this.cols = [
      { field: 'metier', header: 'Métier' },
      { field: 'posteType', header: 'Poste Type' },
      { field: 'domaine', header: 'Domaine' },
      { field: 'stratesEquipes', header: 'Strates Équipes' },
      { field: 'profil', header: 'Profil' },
      { field: 'equipesSupervisees', header: 'Équipes Supervisées' },
      { field: 'descriptifEquipesSupervisses', header: 'Descriptif' },
      { field: 'competencesForSearch', header: 'Compétences' },
      { field: 'actions', header: 'Actions'}
  ];

  }

  deleteRegle(id: number) {

    this.regleService.getRegle(id).subscribe (
      regleAPI => this.router.navigate(['/regledelete', regleAPI.id]),
      error => {this.msgs.push({severity: 'error', summary: '', detail: this.errorService.getMessage(error)}); }
    );
  }

  reformatMetier(metier: string) {
    const truncPosition = metier.indexOf('(');
    return (truncPosition > 0) ? metier.substring(0, truncPosition) : '';
  }

  goUpdate(regle: RegleDTO) {
    this.regleService.getRegle(regle.id).subscribe (
      regleAPI => this.router.navigate(['/regleupdate', regleAPI.id]),
      error => {this.msgs.push({severity: 'error', summary: '', detail: this.errorService.getMessage(error)}); }
    );
  }
  7
  goCreate() {
    this.router.navigate(['/reglecreate']);
}

goView(id: number) {
  this.regleService.getRegle(id).subscribe (
    regleAPI => this.router.navigate(['/regleview', regleAPI.id]),
    error => {this.msgs.push({severity: 'error', summary: '', detail: this.errorService.getMessage(error)}); }
  );
}
}

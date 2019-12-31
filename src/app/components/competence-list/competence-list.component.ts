import { Component, OnInit } from '@angular/core';
import { CompetenceDTO } from 'src/app/shared-data/competence-dto';
import { CompetenceService } from 'src/app/services/competence.service';

@Component({
  selector: 'app-competence-list',
  templateUrl: './competence-list.component.html',
  styleUrls: ['./competence-list.component.scss', '../../app.component.scss']
})
export class CompetenceListComponent implements OnInit {

  competences: CompetenceDTO[] = [];
  display: boolean;
  competenceDetail: CompetenceDTO;

  constructor(private competenceService: CompetenceService) { }

  ngOnInit() {
    this.competenceService.getAllCompetences().subscribe(
      competenceList => {
          console.log(competenceList);
          return this.competences = competenceList;
        },
      error => console.log(error)
    );
  }
}

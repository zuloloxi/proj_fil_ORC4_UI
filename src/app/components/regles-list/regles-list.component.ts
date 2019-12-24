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

  constructor(private regleService: RegleService) { }

  ngOnInit() {
    this.regleService.getAllRegles().subscribe(
      regleList => this.regles = regleList,
      error => console.log("erreur")
    )
}
}

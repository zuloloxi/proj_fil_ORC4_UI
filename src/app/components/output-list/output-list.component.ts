import { Component, OnInit } from '@angular/core';
import { OutputDto } from 'src/app/shared-data/output-dto';
import { OutputService } from 'src/app/services/output.service';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-output-list',
  templateUrl: './output-list.component.html',
  styleUrls: ['./output-list.component.scss']
})
export class OutputListComponent implements OnInit {
  outputs: OutputDto[] = [];
  rejets: OutputDto[] = [];
  cols: any[];
  domaines: SelectItem[];
  valids: OutputDto[] = [];
  total: OutputDto[][];

  constructor(private outputService: OutputService) { }

  ngOnInit() {

      this.domaines = [
                    { label: 'Tous les domaines', value: null },
                    { label: 'ResBPFCBP', value: 'ResBPFCBP' },
                    { label: 'ResRetail', value: 'ResRetail' },
                    { label: 'ResCorpo', value: 'ResCorpo' }
                ];

      this.cols = [
                  { field: 'identifiant', header: 'identifiant' },
                  { field: 'nom', header: 'nom' },
                  { field: 'prenom', header: 'prenom' },
                  { field: 'email', header: 'email' },
                  { field: 'domaine', header: 'domaine' },
                  { field: 'equipe', header: 'equipe' },
                  { field: 'competences', header: 'competences' },
                  { field: 'profil', header: 'profil' }
              ];

    this.outputService.getAlltransformInputs().subscribe((outputs) => {
      this.outputs = outputs;
      this.valids = this.outputs.filter(outputs => outputs.profil.substr(0,6) !== 'ERREUR' &&
                                               outputs.domaine.substr(0,6) !== 'ERREUR' &&
                                               outputs.equipe.substr(0,6) !== 'ERREUR' &&
                                               outputs.competences.substr(0,6) !== 'ERREUR');
      this.rejets = this.outputs.filter(outputs => outputs.profil.substr(0,6) === 'ERREUR' ||
                                                     outputs.domaine.substr(0,6) === 'ERREUR' ||
                                                     outputs.equipe.substr(0,6) === 'ERREUR' ||
                                                     outputs.competences.substr(0,6) === 'ERREUR');
      return this.total = [this.rejets, this.valids];
    });


  }

}

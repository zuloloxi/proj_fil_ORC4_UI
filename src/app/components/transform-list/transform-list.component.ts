import { Component, OnInit } from '@angular/core';
import { OutputDto } from 'src/app/shared-data/output-dto';
import { Output } from 'src/app/shared-data/output';
import { OutputService } from 'src/app/services/output.service';
import { SelectItem } from 'primeng/api';
import { ToggleButtonModule } from 'primeng/togglebutton';
// import { FormsModule }   from '@angular/forms';

@Component({
  selector: 'app-transform-list',
  templateUrl: './transform-list.component.html',
  styleUrls: ['./transform-list.component.scss']
})
export class TransformListComponent implements OnInit {
  outputs: OutputDto[] = [];
  outputList: Output[] = [];
  rejets: OutputDto[] = [];
  cols: any[];
  domaines: SelectItem[];
  valids: OutputDto[] = [];
  total: OutputDto[][];
  selectedOutputs: Output[];
  checked1: boolean= true;
  isChecked: boolean = true;

  constructor(private outputService: OutputService) { }

  ngOnInit() {
    this.transform();
  }

  transform(){
    this.domaines = [
            { label: 'Tous les domaines', value: 'ResBPFCBP'&&'ResRetail'&&'ResCorpo' },
            { label: 'ResBPFCBP', value: 'ResBPFCBP' },
            { label: 'ResRetail', value: 'ResRetail' },
            { label: 'ResCorpo', value: 'ResCorpo' }
           ];

          this.updateCols();

          this.outputService.getAlltransformInputs().subscribe((outputs) =>
             { this.outputs = outputs;
               this.outputService.deleteOutputs().subscribe();
               this.outputService.publishResults(outputs).subscribe();
               this.outputService.getAllOutputs().subscribe((outputList) => {
                      this.outputList = outputList;
                      this.valids = this.outputList.filter(outputs => outputs.profil.substr(0,6) !== 'ERREUR' &&
                                                                   outputs.domaine.substr(0,6) !== 'ERREUR' &&
                                                                   outputs.equipe.substr(0,6) !== 'ERREUR' &&
                                                                   outputs.competences.substr(0,6) !== 'ERREUR');
                      this.rejets = this.outputList.filter(outputs => outputs.profil.substr(0,6) === 'ERREUR' ||
                                                                   outputs.domaine.substr(0,6) === 'ERREUR' ||
                                                                   outputs.equipe.substr(0,6) === 'ERREUR' ||
                                                                   outputs.competences.substr(0,6) === 'ERREUR');
                      return this.total = [this.valids, this.rejets];
               });
              }
          );
  }

  handleChange(e) {
          console.log(this.isChecked);
          this.isChecked = e.checked;
          console.log(this.isChecked);
          this.updateCols();
  }

  updateCols(){
  this.cols = [
                { field: 'action', header: 'action', hidden:this.checked1 },
                { field: 'identifiant', header: 'identifiant', hidden:false },
                { field: 'nom', header: 'nom', hidden:false },
                { field: 'prenom', header: 'prenom', hidden:false },
                { field: 'email', header: 'email', hidden:false },
                { field: 'emailCommerciale', header: 'emailCommerciale', hidden:this.checked1 },
                { field: 'langue', header: 'langue', hidden:this.checked1 },
                { field: 'domaine', header: 'domaine', hidden:false },
                { field: 'equipe', header: 'equipe', hidden:false },
                { field: 'groupeCompetence', header: 'groupeCompetence', hidden:this.checked1 },
                { field: 'groupesReporting', header: 'groupesReporting', hidden:this.checked1 },
                { field: 'profil', header: 'profil', hidden:false },
                { field: 'administration', header: 'administration', hidden:this.checked1 },
                { field: 'supervision', header: 'supervision', hidden:this.checked1 },
                { field: 'agent', header: 'agent', hidden:this.checked1 },
                { field: 'statistiques', header: 'statistiques', hidden:this.checked1 },
                { field: 'enregistrement', header: 'enregistrement', hidden:this.checked1 },
                { field: 'campagnes', header: 'campagnes', hidden:this.checked1 },
                { field: 'scripting', header: 'scripting', hidden:this.checked1 },
                { field: 'historique', header: 'historique', hidden:this.checked1 },
                { field: 'suiviActions', header: 'suiviActions', hidden:this.checked1 },
                { field: 'suiviAppels', header: 'suiviAppels', hidden:this.checked1 },
                { field: 'configurationAfficheursMuraux', header: 'configurationAfficheursMuraux', hidden:this.checked1 },
                { field: 'hypervision', header: 'hypervision', hidden:this.checked1 },
                { field: 'competences', header: 'competences', hidden:false },
                { field: 'site', header: 'site', hidden:this.checked1 },
                { field: 'positionPrivee', header: 'positionPrivee', hidden:this.checked1 },
                { field: 'positionCommerciale', header: 'positionCommerciale', hidden:this.checked1 },
                { field: 'mobile', header: 'mobile', hidden:this.checked1 },
                { field: 'domainesSupervises', header: 'domainesSupervises', hidden:this.checked1 },
                { field: 'equipesSupervisees', header: 'equipesSupervisees', hidden:this.checked1 },
                { field: 'fluxSupervises', header: 'fluxSupervises', hidden:this.checked1 },
                { field: 'competencesSupervisees', header: 'competencesSupervisees', hidden:this.checked1 },
                { field: 'groupesSupervises', header: 'groupesSupervises', hidden:this.checked1 },
                { field: 'sitesSupervises', header: 'sitesSupervises', hidden:this.checked1 },
                { field: 'canauxExternes', header: 'canauxExternes', hidden:this.checked1 },
                { field: 'pausesSupervisees', header: 'pausesSupervisees', hidden:this.checked1 },
                { field: 'tachesSupervisees', header: 'tachesSupervisees', hidden:this.checked1 },
                { field: 'compteursSupervises', header: 'compteursSupervises', hidden:this.checked1 },
                { field: 'servicesSupervises', header: 'servicesSupervises', hidden:this.checked1 },
                { field: 'alertesSeuilSupervisees', header: 'alertesSeuilSupervisees', hidden:this.checked1 },
                { field: 'categoriesAlertes', header: 'categoriesAlertes', hidden:this.checked1 },
                { field: 'modelesAlertes', header: 'modelesAlertes', hidden:this.checked1 },
                { field: 'panneauxSupervises', header: 'panneauxSupervises', hidden:this.checked1 },
                { field: 'missionsSupervisees', header: 'missionsSupervisees', hidden:this.checked1 },
                { field: 'annuairesSupervises', header: 'annuairesSupervises', hidden:this.checked1 },
                { field: 'strategiesRoutageSupervisees', header: 'strategiesRoutageSupervisees', hidden:this.checked1 },
                { field: 'profilsSupervises', header: 'profilsSupervises', hidden:this.checked1 },
                { field: 'planningsSupervises', header: 'planningsSupervises', hidden:this.checked1 },
                { field: 'commentaires', header: 'commentaires', hidden:this.checked1 }
              ];
  }
}

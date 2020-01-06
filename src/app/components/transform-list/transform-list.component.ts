import { Component, OnInit } from '@angular/core';
import { OutputDto } from 'src/app/shared-data/output-dto';
import { Output } from 'src/app/shared-data/output';
import { OutputService } from 'src/app/services/output.service';
import { SelectItem } from 'primeng/api';

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

  constructor(private outputService: OutputService) { }

  ngOnInit() {

      this.domaines = [
        { label: 'Tous les domaines', value: null },
        { label: 'ResBPFCBP', value: 'ResBPFCBP' },
        { label: 'ResRetail', value: 'ResRetail' },
        { label: 'ResCorpo', value: 'ResCorpo' }
       ];

//       this.cols = [
//         { field: 'identifiant', header: 'identifiant' },
//         { field: 'nom', header: 'nom' },
//         { field: 'prenom', header: 'prenom' },
//         { field: 'email', header: 'email' },
//         { field: 'domaine', header: 'domaine' },
//         { field: 'equipe', header: 'equipe' },
//         { field: 'competences', header: 'competences' },
//         { field: 'profil', header: 'profil' }
//       ];

      this.cols = [
              { field: 'action', header: 'action', hidden:true },
              { field: 'identifiant', header: 'identifiant', hidden:false },
              { field: 'nom', header: 'nom', hidden:false },
              { field: 'prenom', header: 'prenom', hidden:false },
              { field: 'email', header: 'email', hidden:false },
              { field: 'emailCommerciale', header: 'emailCommerciale', hidden:true },
              { field: 'langue', header: 'langue', hidden:true },
              { field: 'domaine', header: 'domaine', hidden:false },
              { field: 'equipe', header: 'equipe', hidden:false },
              { field: 'groupeCompetence', header: 'groupeCompetence', hidden:true },
              { field: 'groupesReporting', header: 'groupesReporting', hidden:true },
              { field: 'profil', header: 'profil', hidden:false },
              { field: 'administration', header: 'administration', hidden:true },
              { field: 'supervision', header: 'supervision', hidden:true },
              { field: 'agent', header: 'agent', hidden:true },
              { field: 'statistiques', header: 'statistiques', hidden:true },
              { field: 'enregistrement', header: 'enregistrement', hidden:true },
              { field: 'campagnes', header: 'campagnes', hidden:true },
              { field: 'scripting', header: 'scripting', hidden:true },
              { field: 'historique', header: 'historique', hidden:true },
              { field: 'suiviActions', header: 'suiviActions', hidden:true },
              { field: 'suiviAppels', header: 'suiviAppels', hidden:true },
              { field: 'configurationAfficheursMuraux', header: 'configurationAfficheursMuraux', hidden:true },
              { field: 'hypervision', header: 'hypervision', hidden:true },
              { field: 'competences', header: 'competences', hidden:false },
              { field: 'site', header: 'site', hidden:true },
              { field: 'positionPrivee', header: 'positionPrivee', hidden:true },
              { field: 'positionCommerciale', header: 'positionCommerciale', hidden:true },
              { field: 'mobile', header: 'mobile', hidden:true },
              { field: 'domainesSupervises', header: 'domainesSupervises', hidden:true },
              { field: 'equipesSupervisees', header: 'equipesSupervisees', hidden:true },
              { field: 'fluxSupervises', header: 'fluxSupervises', hidden:true },
              { field: 'competencesSupervisees', header: 'competencesSupervisees', hidden:true },
              { field: 'groupesSupervises', header: 'groupesSupervises', hidden:true },
              { field: 'sitesSupervises', header: 'sitesSupervises', hidden:true },
              { field: 'canauxExternes', header: 'canauxExternes', hidden:true },
              { field: 'pausesSupervisees', header: 'pausesSupervisees', hidden:true },
              { field: 'tachesSupervisees', header: 'tachesSupervisees', hidden:true },
              { field: 'compteursSupervises', header: 'compteursSupervises', hidden:true },
              { field: 'servicesSupervises', header: 'servicesSupervises', hidden:true },
              { field: 'alertesSeuilSupervisees', header: 'alertesSeuilSupervisees', hidden:true },
              { field: 'categoriesAlertes', header: 'categoriesAlertes', hidden:true },
              { field: 'modelesAlertes', header: 'modelesAlertes', hidden:true },
              { field: 'panneauxSupervises', header: 'panneauxSupervises', hidden:true },
              { field: 'missionsSupervisees', header: 'missionsSupervisees', hidden:true },
              { field: 'annuairesSupervises', header: 'annuairesSupervises', hidden:true },
              { field: 'strategiesRoutageSupervisees', header: 'strategiesRoutageSupervisees', hidden:true },
              { field: 'profilsSupervises', header: 'profilsSupervises', hidden:true },
              { field: 'planningsSupervises', header: 'planningsSupervises', hidden:true },
              { field: 'commentaires', header: 'commentaires', hidden:true }
            ];

      this.outputService.getAlltransformInputs().subscribe((outputs) =>
         { this.outputs = outputs;
           this.outputService.publishResults(outputs).subscribe();
           this.outputService.deleteOutputs().subscribe();
           this.outputService.getAllOutputs().subscribe((outputList) => {
                  this.outputList = outputList;
                  this.valids = this.outputs.filter(outputs => outputs.profil.substr(0,6) !== 'ERREUR' &&
                                                               outputs.domaine.substr(0,6) !== 'ERREUR' &&
                                                               outputs.equipe.substr(0,6) !== 'ERREUR' &&
                                                               outputs.competences.substr(0,6) !== 'ERREUR');
                  this.rejets = this.outputs.filter(outputs => outputs.profil.substr(0,6) === 'ERREUR' ||
                                                               outputs.domaine.substr(0,6) === 'ERREUR' ||
                                                               outputs.equipe.substr(0,6) === 'ERREUR' ||
                                                               outputs.competences.substr(0,6) === 'ERREUR');
                  return this.total = [this.valids, this.rejets];
           });
          }
      );
  }

}

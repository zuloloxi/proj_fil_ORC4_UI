import { Component, OnInit } from '@angular/core';
import { Output } from 'src/app/shared-data/output';
import { OutputService } from 'src/app/services/output.service';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-output-list',
  templateUrl: './output-list.component.html',
  styleUrls: ['./output-list.component.scss']
})
export class OutputListComponent implements OnInit {
  outputs: Output[] = [];
  rejets: Output[] = [];
  cols: any[];
  scrollableCols: any[];
  frozenCols: any[];
  domaines: SelectItem[];
  valids: Output[] = [];
  total: Output[][];

  constructor(private outputService: OutputService) { }

  ngOnInit() {

      this.domaines = [
        { label: 'Tous les domaines', value: null },
        { label: 'ResBPFCBP', value: 'ResBPFCBP' },
        { label: 'ResRetail', value: 'ResRetail' },
        { label: 'ResCorpo', value: 'ResCorpo' }
      ];

      this.cols = [
        { field: 'action', header: 'action' },
        { field: 'identifiant', header: 'identifiant' },
        { field: 'nom', header: 'nom' },
        { field: 'prenom', header: 'prenom' },
        { field: 'email', header: 'email' },
        { field: 'emailCommerciale', header: 'emailCommerciale' },
        { field: 'langue', header: 'langue' },
        { field: 'domaine', header: 'domaine' },
        { field: 'equipe', header: 'equipe' },
        { field: 'groupeCompetence', header: 'groupeCompetence' },
        { field: 'groupesReporting', header: 'groupesReporting' },
        { field: 'profil', header: 'profil' },
        { field: 'administration', header: 'administration' },
        { field: 'supervision', header: 'supervision' },
        { field: 'agent', header: 'agent' },
        { field: 'statistiques', header: 'statistiques' },
        { field: 'enregistrement', header: 'enregistrement' },
        { field: 'campagnes', header: 'campagnes' },
        { field: 'scripting', header: 'scripting' },
        { field: 'historique', header: 'historique' },
        { field: 'suiviActions', header: 'suiviActions' },
        { field: 'suiviAppels', header: 'suiviAppels' },
        { field: 'configurationAfficheursMuraux', header: 'configurationAfficheursMuraux' },
        { field: 'hypervision', header: 'hypervision' },
        { field: 'competences', header: 'competences' },
        { field: 'site', header: 'site' },
        { field: 'positionPrivee', header: 'positionPrivee' },
        { field: 'positionCommerciale', header: 'positionCommerciale' },
        { field: 'mobile', header: 'mobile' },
        { field: 'domainesSupervises', header: 'domainesSupervises' },
        { field: 'equipesSupervisees', header: 'equipesSupervisees' },
        { field: 'fluxSupervises', header: 'fluxSupervises' },
        { field: 'competencesSupervisees', header: 'competencesSupervisees' },
        { field: 'groupesSupervises', header: 'groupesSupervises' },
        { field: 'sitesSupervises', header: 'sitesSupervises' },
        { field: 'canauxExternes', header: 'canauxExternes' },
        { field: 'pausesSupervisees', header: 'pausesSupervisees' },
        { field: 'tachesSupervisees', header: 'tachesSupervisees' },
        { field: 'compteursSupervises', header: 'compteursSupervises' },
        { field: 'servicesSupervises', header: 'servicesSupervises' },
        { field: 'alertesSeuilSupervisees', header: 'alertesSeuilSupervisees' },
        { field: 'categoriesAlertes', header: 'categoriesAlertes' },
        { field: 'modelesAlertes', header: 'modelesAlertes' },
        { field: 'panneauxSupervises', header: 'panneauxSupervises' },
        { field: 'missionsSupervisees', header: 'missionsSupervisees' },
        { field: 'annuairesSupervises', header: 'annuairesSupervises' },
        { field: 'strategiesRoutageSupervisees', header: 'strategiesRoutageSupervisees' },
        { field: 'profilsSupervises', header: 'profilsSupervises' },
        { field: 'planningsSupervises', header: 'planningsSupervises' },
        { field: 'commentaires', header: 'commentaires' }
      ];

      this.scrollableCols = [
        { field: 'identifiant', header: 'identifiant' },
        { field: 'action', header: 'action' },
        { field: 'nom', header: 'nom' },
        { field: 'prenom', header: 'prenom' },
        { field: 'email', header: 'email' },
        { field: 'emailCommerciale', header: 'emailCommerciale' },
        { field: 'langue', header: 'langue' },
        { field: 'domaine', header: 'domaine' },
        { field: 'equipe', header: 'equipe' },
        { field: 'groupeCompetence', header: 'groupeCompetence' },
        { field: 'groupesReporting', header: 'groupesReporting' },
        { field: 'profil', header: 'profil' },
        { field: 'administration', header: 'administration' },
        { field: 'supervision', header: 'supervision' },
        { field: 'agent', header: 'agent' },
        { field: 'statistiques', header: 'statistiques' },
        { field: 'enregistrement', header: 'enregistrement' },
        { field: 'campagnes', header: 'campagnes' },
        { field: 'scripting', header: 'scripting' },
        { field: 'historique', header: 'historique' },
        { field: 'suiviActions', header: 'suiviActions' },
        { field: 'suiviAppels', header: 'suiviAppels' },
        { field: 'configurationAfficheursMuraux', header: 'configurationAfficheursMuraux' },
        { field: 'hypervision', header: 'hypervision' },
        { field: 'competences', header: 'competences' },
        { field: 'site', header: 'site' },
        { field: 'positionPrivee', header: 'positionPrivee' },
        { field: 'positionCommerciale', header: 'positionCommerciale' },
        { field: 'mobile', header: 'mobile' },
        { field: 'domainesSupervises', header: 'domainesSupervises' },
        { field: 'equipesSupervisees', header: 'equipesSupervisees' },
        { field: 'fluxSupervises', header: 'fluxSupervises' },
        { field: 'competencesSupervisees', header: 'competencesSupervisees' },
        { field: 'groupesSupervises', header: 'groupesSupervises' },
        { field: 'sitesSupervises', header: 'sitesSupervises' },
        { field: 'canauxExternes', header: 'canauxExternes' },
        { field: 'pausesSupervisees', header: 'pausesSupervisees' },
        { field: 'tachesSupervisees', header: 'tachesSupervisees' },
        { field: 'compteursSupervises', header: 'compteursSupervises' },
        { field: 'servicesSupervises', header: 'servicesSupervises' },
        { field: 'alertesSeuilSupervisees', header: 'alertesSeuilSupervisees' },
        { field: 'categoriesAlertes', header: 'categoriesAlertes' },
        { field: 'modelesAlertes', header: 'modelesAlertes' },
        { field: 'panneauxSupervises', header: 'panneauxSupervises' },
        { field: 'missionsSupervisees', header: 'missionsSupervisees' },
        { field: 'annuairesSupervises', header: 'annuairesSupervises' },
        { field: 'strategiesRoutageSupervisees', header: 'strategiesRoutageSupervisees' },
        { field: 'profilsSupervises', header: 'profilsSupervises' },
        { field: 'planningsSupervises', header: 'planningsSupervises' },
        { field: 'commentaires', header: 'commentaires' }
      ];



    this.outputService.getAllOutputs().subscribe((outputs) => {
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

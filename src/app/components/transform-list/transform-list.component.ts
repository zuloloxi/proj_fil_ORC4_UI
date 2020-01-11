import { Component, OnInit } from '@angular/core';
import { OutputDto } from 'src/app/shared-data/output-dto';
import { Output } from 'src/app/shared-data/output';
import { OutputService } from 'src/app/services/output.service';
import { SelectItem } from 'primeng/api';
import { Router } from '@angular/router';
import { UrlSerializer,UrlTree } from '@angular/router';
import { HttpClient,HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-transform-list',
  templateUrl: './transform-list.component.html',
  styleUrls: ['./transform-list.component.scss']
})
export class TransformListComponent implements OnInit {
  draggedOutputDTO: OutputDto = null;
  urlParam: OutputDto = null;
  outputs: OutputDto[] = [];
  outputList: Output[] = [];
  rejets: Output[] = [];
  cols1: any[];
  cols2: any[];
  domaines: SelectItem[];
  valids: Output[] = [];
  total: Output[][];
  selectedOutputs: Output[];
  checked1: boolean = true;
  isChecked: boolean = true;
  spinner: boolean = true;
  showIcons = false;
  constructor(private router: Router,
              private httpClient:HttpClient,
              private serializer: UrlSerializer,
              private outputService: OutputService) {}

  ngOnInit() {
    this.getOutputs();
    this.domaines = [
      { label: 'Tous les domaines', value: 'ResBPFCBP'&&'ResRetail'&&'ResCorpo' },
      { label: 'ResBPFCBP', value: 'ResBPFCBP' },
      { label: 'ResRetail', value: 'ResRetail' },
      { label: 'ResCorpo', value: 'ResCorpo' }
    ];
    this.cols1 = [
      { field: 'identifiant', header: 'identifiant'},
      { field: 'nom', header: 'nom'},
      { field: 'prenom', header: 'prenom'},
      { field: 'email', header: 'email'},
      { field: 'domaine', header: 'domaine' },
      { field: 'equipe', header: 'equipe'},
      { field: 'profil', header: 'profil'},
      { field: 'competences', header: 'competences'}
    ];

    this.cols2 = [
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
  }

  dragStart(event, urlParam) {
    this.urlParam = urlParam;
    this.showIcons = true;
  }

  dragEnd(event) {
    this.urlParam = null;
    this.showIcons = false;
  }

  dropEdit(event){
    const params = new HttpParams()
    this.router.navigate(['saisie/output'],
       { queryParams:
         { identifiant: this.urlParam.identifiant,
           domaine: this.urlParam.domaine,
           equipe: this.urlParam.equipe,
           profil: this.urlParam.profil,
           competences: this.urlParam.competences
         }
       }
    );
  }

//   transform(){
//     this.started = !this.started;
//
//     this.updateCols();
//     this.outputService.getAlltransformInputs().subscribe((outputList) => {
//       this.outputList = outputList;
//       this.valids = this.outputList.filter(outputs => outputs.profil.substr(0,6) !== 'ERREUR' &&
//                                                       outputs.domaine.substr(0,6) !== 'ERREUR' &&
//                                                       outputs.equipe.substr(0,6) !== 'ERREUR' &&
//                                                       outputs.competences.substr(0,6) !== 'ERREUR');
//       this.rejets = this.outputList.filter(outputs => outputs.profil.substr(0,6) === 'ERREUR' ||
//                                                       outputs.domaine.substr(0,6) === 'ERREUR' ||
//                                                       outputs.equipe.substr(0,6) === 'ERREUR' ||
//                                                       outputs.competences.substr(0,6) === 'ERREUR');
//       return this.total = [this.valids, this.rejets];
//     });
//   }

  transform(){
    this.spinner= true;

    this.outputService.getAlltransformInputs().subscribe((outputs) =>
       { this.outputs = outputs;
         this.outputService.deleteOutputs().subscribe(
           ()=> {
            this.outputService.publishResults(outputs).subscribe(
              ()=> {
                this.getOutputs();
              });
         });
       }
    );
  }

  getOutputs(){
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
                        this.spinner= false;
                        return this.total = [this.valids, this.rejets];
                    });

  }

  handleChange(e) {
    this.isChecked = e.checked;
  }

}

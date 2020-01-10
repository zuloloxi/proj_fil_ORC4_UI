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
  cols: any[];
  domaines: SelectItem[];
  valids: Output[] = [];
  total: Output[][];
  selectedOutputs: Output[];
  checked1: boolean = true;
  isChecked: boolean = true;
//   started: boolean = true;
  showIcons = false;

  constructor(private router: Router,
              private httpClient:HttpClient,
              private serializer: UrlSerializer,
              private outputService: OutputService) {}

  ngOnInit() {
//     this.started = true;
    this.domaines = [
            { label: 'Tous les domaines', value: 'ResBPFCBP'&&'ResRetail'&&'ResCorpo' },
            { label: 'ResBPFCBP', value: 'ResBPFCBP' },
            { label: 'ResRetail', value: 'ResRetail' },
            { label: 'ResCorpo', value: 'ResCorpo' }
           ];
  }

  dragStart(event, urlParam) {
    console.log('urlParamStart', urlParam)
    this.urlParam = urlParam;
    this.showIcons = true;
    console.log('start');
  }

  dragEnd(event) {
    this.urlParam = null;
    this.showIcons = false;
    console.log('end');
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
//     this.domaines =
//       [
//         { label: 'Tous les domaines', value: 'ResBPFCBP'&&'ResRetail'&&'ResCorpo' },
//         { label: 'ResBPFCBP', value: 'ResBPFCBP' },
//         { label: 'ResRetail', value: 'ResRetail' },
//         { label: 'ResCorpo', value: 'ResCorpo' }
//       ];
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
//     this.started = true;
    this.domaines = [
            { label: 'Tous les domaines', value: 'ResBPFCBP'&&'ResRetail'&&'ResCorpo' },
            { label: 'ResBPFCBP', value: 'ResBPFCBP' },
            { label: 'ResRetail', value: 'ResRetail' },
            { label: 'ResCorpo', value: 'ResCorpo' }
           ];

    this.updateCols();

    this.outputService.getAlltransformInputs().subscribe((outputs) =>
       { this.outputs = outputs;
         this.outputService.deleteOutputs().subscribe(
           ()=> {
            this.outputService.publishResults(outputs).subscribe(
              ()=> {
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
              });
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

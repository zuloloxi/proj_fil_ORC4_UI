import { Component, OnInit } from '@angular/core';
import { CollaborateurService } from 'src/app/services/collaborateur.service';
import { Router } from '@angular/router';
import { CollaborateurDTO } from 'src/app/shared-data/collaborateur-dto';

@Component({
  selector: 'app-collaborator-list',
  templateUrl: './collaborator-list.component.html',
  styleUrls: ['./collaborator-list.component.scss']
})
export class CollaboratorListComponent implements OnInit {

  collaborateurBouchon: CollaborateurDTO[] = [
    {
      id: 1,
      uid: '316557',
      civilite: 'Mr',
      nom: 'van Pradelles',
      prenom: 'olivier',
      fonction: 'CONSEIL EN BANQUE PRIVEE ENTREPRENEUR',
      telephone: '04 68 90 36 63',
      mail: 'nom_009.Prenom_009@bnpparibas.com'      ,
      etage: '0',
      uoAffectation: '13240989',
      codeImmeubleEmplacementCollaborateur: '100952',
      region: 'REGION OCCITANIE',
      codeRegion: '8058000',
      niveauTerritoire: 'CENTRE BANQUE PRIVEE MONTPELLIER ROUSSILLON',
      codeTerritoire: '8674000',
      niveauEntite: 'CBP EQUIPE MONTPELLIER ROUSSILLON 3',
      codeEntite: '08674T30',
      niveauAgence: 'ACTION COMMERCIALE CBP EQUIPE MONTPELLIER ROUSSILLON 3',
      codeAgence: '08674Z39',
      localisationCollaborateur: '50 RUE JEAN JAURES 11101 NARBONNE CEDEX',
      pj: 'cs',
      aMigrer: 'OUI'
    },
    {
      id: 2,
      uid: '251436',
      civilite: 'Mr',
      nom: 'Bouchez',
      prenom: 'Regis',
      fonction: 'ASSISTANT CLIENT BANQUE PRIVEE',
      telephone: '04 68 90 36 63',
      mail: 'nom_009.Prenom_009@bnpparibas.com'      ,
      etage: '0',
      uoAffectation: '13240989',
      codeImmeubleEmplacementCollaborateur: '100952',
      region: 'REGION OCCITANIE',
      codeRegion: '8058000',
      niveauTerritoire: 'CENTRE BANQUE PRIVEE MONTPELLIER ROUSSILLON',
      codeTerritoire: '8674000',
      niveauEntite: 'CBP EQUIPE MONTPELLIER ROUSSILLON 3',
      codeEntite: '08674T30',
      niveauAgence: 'ACTION COMMERCIALE CBP EQUIPE MONTPELLIER ROUSSILLON 3',
      codeAgence: '08674Z39',
      localisationCollaborateur: '50 RUE JEAN JAURES 11101 NARBONNE CEDEX',
      pj: 'cs',
      aMigrer: 'OUI'
    }
  ] ;
  collaborateur: CollaborateurDTO[] = [];

  constructor(private collaborateurService: CollaborateurService, private router: Router) { }

  ngOnInit() {
    this.collaborateur = this.collaborateurBouchon;
    // this.collaborateurService.getAllCollaborateurs().subscribe((collaborateur) => {
    //   this.collaborateur = collaborateur;
    // });

  }
}

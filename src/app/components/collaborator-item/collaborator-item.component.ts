import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CollaborateurService } from 'src/app/services/collaborateur.service';
import { CollaborateurDTO } from 'src/app/shared-data/collaborateur-dto';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-collaborator-item',
  templateUrl: './collaborator-item.component.html',
  styleUrls: ['./collaborator-item.component.scss']
})
export class CollaboratorItemComponent implements OnInit {

  collaborateur: CollaborateurDTO;
  updateCollaborateur: CollaborateurDTO;
  collaborateurForm: FormGroup;
  collaborateurUid: string;
  saveOK = false;



  constructor(private router: Router,
              private fb: FormBuilder,
              private activateRoute: ActivatedRoute,
              private collaborateurService: CollaborateurService) { }

  ngOnInit() {
    this.collaborateurUid = this.activateRoute.snapshot.paramMap.get('collaborateurUid');
    this.collaborateurService.getOneCollaborateur(this.collaborateurUid).subscribe(collaborateur => this.collaborateur = collaborateur);
    console.log(this.collaborateur);

    this.collaborateurForm = this.fb.group ({
      civilite: [],
      nom: [],
      prenom: [],
      fonction: [],
      telephone: [],
      mail: [],
      etage: [],
      uoAffectation: [],
      codeImmeubleEmplacementCollaborateur: [],
      region: [],
      codeRegion: [],
      niveauTerritoire: [],
      codeTerritoire: [],
      niveauEntite: [],
      codeEntite: [],
      niveauAgence: [],
      codeAgence: [],
      localisationCollaborateur: [],
      pj: [],
      aMigrer: [],
    });


    if (this.collaborateurUid) {
      this.collaborateurService.getOneCollaborateur(this.collaborateurUid).subscribe (
        collab => this.collaborateurForm = this.fb.group ({
          civilite: [collab.civilite],
          nom: [collab.nom],
          prenom: [collab.prenom],
          fonction: [collab.fonction],
          telephone: [collab.telephone],
          mail: [collab.mail],
          etage: [collab.etage],
          uoAffectation : [collab.uoAffectation],
          codeImmeubleEmplacementCollaborateur: [collab.codeImmeubleEmplacementCollaborateur],
          region: [collab.region],
          codeRegion: [collab.codeRegion],
          niveauTerritoire: [collab.niveauTerritoire],
          codeTerritoire: [collab.codeTerritoire],
          niveauEntite: [collab.niveauEntite],
          codeEntite: [collab.codeEntite],
          niveauAgence: [collab.niveauAgence],
          codeAgence: [collab.codeAgence],
          localisationCollaborateur: [collab.localisationCollaborateur],
          pj: [collab.pj],
          aMigrer: [collab.aMigrer],
        })
      );
    }
  }

  saveCollaborator() {
     this.updateCollaborateur = new CollaborateurDTO (
       {
        id: 0,
        uid: this.collaborateurUid,
        civilite: this.collaborateurForm.get('civilite').value,
        nom: this.collaborateurForm.get('nom').value,
        prenom: this.collaborateurForm.get('prenom').value,
        fonction: this.collaborateurForm.get('fonction').value,
        telephone: this.collaborateurForm.get('telephone').value,
         mail: this.collaborateurForm.get('mail').value,
         etage: this.collaborateurForm.get('etage').value,
         uoAffectation: this.collaborateurForm.get('uoAffectation').value,
         codeImmeubleEmplacementCollaborateur: this.collaborateurForm.get('codeImmeubleEmplacementCollaborateur').value,
         region: this.collaborateurForm.get('region').value,
         codeRegion: this.collaborateurForm.get('codeRegion').value,
         niveauTerritoire: this.collaborateurForm.get('niveauTerritoire').value,
         codeTerritoire: this.collaborateurForm.get('codeTerritoire').value,
         niveauEntite: this.collaborateurForm.get('niveauEntite').value,
         codeEntite: this.collaborateurForm.get('codeEntite').value,
         niveauAgence: this.collaborateurForm.get('niveauAgence').value,
         codeAgence: this.collaborateurForm.get('codeAgence').value,
         localisationCollaborateur: this.collaborateurForm.get('localisationCollaborateur').value,
         pj: this.collaborateurForm.get('pj').value,
         aMigrer: this.collaborateurForm.get('aMigrer').value
      });
     this.collaborateurService.updateCollaborateurUid(this.collaborateurUid, this.updateCollaborateur).subscribe();
     this.saveOK = true;
   }

   onOK() {
    this.router.navigate(['/collaborateurs/']);
   }

}

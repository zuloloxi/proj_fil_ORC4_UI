import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  collaborateurForm: FormGroup;
  collaborateurUid: number;


  constructor(private fb: FormBuilder, private activateRoute: ActivatedRoute, private collaborateurService: CollaborateurService) { }

  ngOnInit() {
    this.collaborateurUid = +this.activateRoute.snapshot.paramMap.get('collaborateurUid');
    this.collaborateurService.getOneCollaborateur(this.collaborateurUid).subscribe(collaborateur => this.collaborateur = collaborateur);
    console.log(this.collaborateur);

    this.collaborateurForm = this.fb.group ({
      civilite: [],
      nom: [],
      prenom: [],
    });
  }

  saveCollaborator() {
     console.log("save");
   }

}

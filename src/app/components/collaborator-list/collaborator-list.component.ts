import { Component, OnInit } from '@angular/core';
import { CollaborateurService } from 'src/app/services/collaborateur.service';
import { Router } from '@angular/router';
import { CollaborateurDTO } from 'src/app/shared-data/collaborateur-dto';


@Component({
  selector: 'app-collaborator-list',
  templateUrl: './collaborator-list.component.html',
  styleUrls: ['./collaborator-list.component.scss', '../../app.component.scss']
})
export class CollaboratorListComponent implements OnInit {

  collaborateurs: CollaborateurDTO[] = [];

  collaborateur: CollaborateurDTO;
  display = false;

  trash = false;
  draggedCollaborateurDTO: null;
  droped = [];

  constructor(private collaborateurService: CollaborateurService) { }

  ngOnInit() {
    // this.collaborateurs = this.collaborateurBouchon;
    // console.log(this.collaborateurs.toString)
    this.collaborateurService.getAllCollaborateurs().subscribe((collab) => {
      this.collaborateurs = collab;
      // console.log(this.collaborateurs);
      // console.log(typeof this.collaborateurs);
    });

  }

  viewDetailCollaborator(collaborateur: CollaborateurDTO){
    this.collaborateur = collaborateur;
    this.display = true;
  }

  viewDetailCollaboratorClose() {
    this.display = false;
  }

  dragStart(event, collaborateur) {
    this.draggedCollaborateurDTO = collaborateur;
    console.log("start");
    console.log(this.draggedCollaborateurDTO);

  }

  dragEnd(event) {
    this.draggedCollaborateurDTO = null;
    console.log(this.draggedCollaborateurDTO);
    console.log("end");
  }

  dropView(event){
    if (this.draggedCollaborateurDTO) {
      this.collaborateur = this.draggedCollaborateurDTO;
      this.draggedCollaborateurDTO = null;
      this.display = true;
    }
  }

  dropTrash(event) {
    console.log(this.draggedCollaborateurDTO);
    console.log("ici");
    if (this.draggedCollaborateurDTO) {
     this.collaborateur = this.draggedCollaborateurDTO;
     this.droped.push("trash");
     this.draggedCollaborateurDTO = null;
     console.log(this.droped);
     this.trash = true;
    }
  }

  openTrash(collaborateur: CollaborateurDTO) {
    this.collaborateur = collaborateur;
    console.log(this.collaborateur);
    this.trash = true;
  }

  closeTrash() {
    this.trash = false;
  }

  onDelete(collaborateur: CollaborateurDTO) {
    this.collaborateur = collaborateur;
   // const collaborateurUid = +this.activateRoute.snapshot.paramMap.get('collaborateurUid');
    const collaborateurUid = +this.collaborateur.uid;
    this.collaborateurService.deleteCollaborateutUId(collaborateurUid).subscribe(item => this.collaborateur = item);

    console.log("delete" + collaborateurUid);
    console.log(this.collaborateur);
    console.log(this.draggedCollaborateurDTO);
    this.closeTrash();
  }

}
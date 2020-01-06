import { Component, OnInit } from '@angular/core';
import { CollaborateurService } from 'src/app/services/collaborateur.service';
import { Router} from '@angular/router';
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
  showIcons=false;
  draggedCollaborateurDTO: null;


  constructor( private router: Router,private collaborateurService: CollaborateurService) { }

  ngOnInit() {
    this.collaborateurService.getAllCollaborateurs().subscribe((collab) => {
      this.collaborateurs = collab;
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
    this.showIcons=true;
    console.log("start");
  }

  dragEnd(event) {
    this.draggedCollaborateurDTO = null;
    this.showIcons=false;
    console.log("end");
  }

  dropView(event){
    console.log("view");
    if (this.draggedCollaborateurDTO) {
      this.collaborateur = this.draggedCollaborateurDTO;
      this.draggedCollaborateurDTO = null;
      this.display = true;
    }
  }

  dropTrash(event) {
    console.log("trash");
    if (this.draggedCollaborateurDTO) {
     this.collaborateur = this.draggedCollaborateurDTO;
     this.draggedCollaborateurDTO = null;
     this.trash = true;
    }
  }


  dropEdit(event){
    console.log("edit");
    if (this.draggedCollaborateurDTO) {
      this.collaborateur = this.draggedCollaborateurDTO;
      this.draggedCollaborateurDTO = null;
      const collaborateurUid = this.collaborateur.uid;
      this.router.navigate(['/collaborateurs/'+collaborateurUid]);      
    }
  }

  openTrash(collaborateur: CollaborateurDTO) {
    this.collaborateur = collaborateur;
    this.trash = true;
  }

  closeTrash() {
    this.trash = false;
  }

  onDelete(collaborateur: CollaborateurDTO) {
    this.collaborateur = collaborateur;
    const collaborateurUid = this.collaborateur.uid;
    this.collaborateurService.deleteCollaborateutUid(collaborateurUid).subscribe(item => this.collaborateur = item);
    console.log("delete: " + collaborateurUid);
    this.closeTrash();
    location.reload(); 
  }

}
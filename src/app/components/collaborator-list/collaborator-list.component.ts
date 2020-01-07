import { Component, OnInit} from '@angular/core';
import { CollaborateurService } from 'src/app/services/collaborateur.service';
import { Router} from '@angular/router';
import { CollaborateurDTO } from 'src/app/shared-data/collaborateur-dto';
import { OutputDto } from 'src/app/shared-data/output-dto';
import { Message } from 'primeng/api/message';
import { ErrorService } from 'src/app/services/error.service';


@Component({
  selector: 'app-collaborator-list',
  templateUrl: './collaborator-list.component.html',
  styleUrls: ['./collaborator-list.component.scss', '../../app.component.scss']
})
export class CollaboratorListComponent implements OnInit {

  collaborateurs: CollaborateurDTO[] = [];
  collaborateur: CollaborateurDTO;
  displayDetail = false;
  trash = false;
  showIcons = false;
  draggedCollaborateurDTO: null;
  output: OutputDto;
  displayTransform = false;
  displayTransformError = false;
  msgs: Message[] = [];
  error: string;

  constructor( private router: Router,
               private errorService: ErrorService,
               private collaborateurService: CollaborateurService) { }

  ngOnInit() {
    this.collaborateurService.getAllCollaborateurs().subscribe((collab) => {
      this.collaborateurs = collab;
    });
  }

  dragStart(event, collaborateur) {
    this.draggedCollaborateurDTO = collaborateur;
    this.showIcons = true;
    console.log('start');
  }

  dragEnd(event) {
    this.draggedCollaborateurDTO = null;
    this.showIcons = false;
    console.log('end');
  }

  dropView(event){
    console.log('view');
    if (this.draggedCollaborateurDTO) {
      this.collaborateur = this.draggedCollaborateurDTO;
      this.draggedCollaborateurDTO = null;
      this.displayDetail = true;
    }
  }

  dropTransform(event){
    console.log('transform');
    if (this.draggedCollaborateurDTO) {
      this.collaborateur = this.draggedCollaborateurDTO;
      this.draggedCollaborateurDTO = null;
      this.getTransformByUid(this.collaborateur);
    }
  }

  dropTrash(event) {
    console.log('trash');
    if (this.draggedCollaborateurDTO) {
     this.collaborateur = this.draggedCollaborateurDTO;
     this.draggedCollaborateurDTO = null;
     this.trash = true;
    }
  }


  dropEdit(event){
    console.log('edit');
    if (this.draggedCollaborateurDTO) {
      this.collaborateur = this.draggedCollaborateurDTO;
      this.draggedCollaborateurDTO = null;
      const collaborateurUid = this.collaborateur.uid;
      this.router.navigate(['/collaborateurs/' + collaborateurUid]);
    }
  }

  viewDetailCollaborator(collaborateur: CollaborateurDTO){
    this.collaborateur = collaborateur;
    this.displayDetail = true;
  }

  viewDetailCollaboratorClose() {
    this.displayDetail = false;
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
    console.log('delete: ' + collaborateurUid);
    this.closeTrash();
    location.reload();
  }

  getTransformByUid(collaborateur: CollaborateurDTO) {
    this.collaborateur = collaborateur;
    const collaborateurUid = this.collaborateur.uid;

    this.collaborateurService.getOnetransformInput(collaborateurUid).subscribe((output) =>
    { this.output = output;
      this.displayTransform = true;
      console.log('transform : ' + collaborateurUid + ':');
      console.log(this.output);
    },
    error => {this.viewTransformError(this.errorService.getMessage(error));
    });
   }

  viewTransformClose() {
    this.displayTransform = false;
  }

  viewTransformError(error: string) {
    console.log(error);
    this.displayTransformError = true;
    this.error = error;
  }

  viewTransformErrorClose() {
    this.displayTransformError = false;
  }


}

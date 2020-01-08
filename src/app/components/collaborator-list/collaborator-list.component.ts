import { Component, OnInit} from '@angular/core';
import { CollaborateurService } from 'src/app/services/collaborateur.service';
import { Router} from '@angular/router';
import { CollaborateurDTO } from 'src/app/shared-data/collaborateur-dto';
import { OutputDto } from 'src/app/shared-data/output-dto';
import { ErrorService } from 'src/app/services/error.service';


@Component({
  selector: 'app-collaborator-list',
  templateUrl: './collaborator-list.component.html',
  styleUrls: ['./collaborator-list.component.scss', '../../app.component.scss']
})
export class CollaboratorListComponent implements OnInit {

  collaborateurs: CollaborateurDTO[] = [];
  collaborateur: CollaborateurDTO;
  draggedCollaborateurDTO: null;
  output: OutputDto;

  displayTransform = false;
  displayTransformError = false;
  displayDetail = false;
  trash = false;
  showIcons = false;

  msgs: string;
  error: string;

  errorProfil = false;
  errorDomain = false;
  errorEquipe = false;
  errorCompetences = false;

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
  }

  dragEnd(event) {
    this.draggedCollaborateurDTO = null;
    this.showIcons = false;
  }

  dropView(event) {
    if (this.draggedCollaborateurDTO) {
      this.collaborateur = this.draggedCollaborateurDTO;
      this.draggedCollaborateurDTO = null;
      this.displayDetail = true;
    }
  }

  dropTransform(event) {
    if (this.draggedCollaborateurDTO) {
      this.collaborateur = this.draggedCollaborateurDTO;
      this.draggedCollaborateurDTO = null;
      this.getTransformByUid(this.collaborateur);
    }
  }

  dropTrash(event) {
    if (this.draggedCollaborateurDTO) {
     this.collaborateur = this.draggedCollaborateurDTO;
     this.draggedCollaborateurDTO = null;
     this.trash = true;
    }
  }


  dropEdit(event) {
    if (this.draggedCollaborateurDTO) {
      this.collaborateur = this.draggedCollaborateurDTO;
      this.draggedCollaborateurDTO = null;
      const collaborateurUid = this.collaborateur.uid;
      this.router.navigate(['/collaborateurs/' + collaborateurUid]);
    }
  }

  viewDetailCollaborator(collaborateur: CollaborateurDTO) {
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
    this.closeTrash();
    location.reload();
  }

  getTransformByUid(collaborateur: CollaborateurDTO) {
    this.collaborateur = collaborateur;
    const collaborateurUid = this.collaborateur.uid;

    this.collaborateurService.getOnetransformInput(collaborateurUid).subscribe((output) =>
    { this.output = output;

      (this.output.profil.substr(0, 6) === 'ERREUR') ? this.errorProfil = true : this.errorEquipe = false;
      (this.output.domaine.substr(0, 6) === 'ERREUR') ? this.errorDomain = true : this.errorDomain = false;
      (this.output.equipe.substr(0, 6) === 'ERREUR') ? this.errorEquipe = true : this.errorEquipe = false;
      (this.output.competences.substr(0, 6) === 'ERREUR') ? this.errorCompetences = true : this.errorCompetences = false;

      this.displayTransform = true;

    },
    error => {
      this.msgs = this.errorService.getMessage(error).split(':')[1];
      this.viewTransformError(this.msgs);
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

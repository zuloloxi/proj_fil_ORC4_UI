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
}
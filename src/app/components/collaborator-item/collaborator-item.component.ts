import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CollaborateurService } from 'src/app/services/collaborateur.service';
import { CollaborateurDTO } from 'src/app/shared-data/collaborateur-dto';

@Component({
  selector: 'app-collaborator-item',
  templateUrl: './collaborator-item.component.html',
  styleUrls: ['./collaborator-item.component.scss']
})
export class CollaboratorItemComponent implements OnInit {

  collaborateur : CollaborateurDTO;
  display=true;

  constructor(private activateRoute: ActivatedRoute, private collaborateurService: CollaborateurService) { }

  ngOnInit() {
    const collaborateurUid = +this.activateRoute.snapshot.paramMap.get('collaborateurUid');
    this.collaborateurService.getOneCollaborateur(collaborateurUid).subscribe(collaborateur => this.collaborateur = collaborateur);
    console.log(this.collaborateur);
  }

  showDialog() {
    this.display = true;
}

}

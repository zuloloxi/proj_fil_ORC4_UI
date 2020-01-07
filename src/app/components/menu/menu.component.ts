import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  items: MenuItem[];

  constructor(private router: Router) { }

    ngOnInit() {
        this.items = [
            {label: 'Collaborateurs', icon: 'fa fa-fw fas fa-users', routerLink: 'collaborateurs'},
            {label: 'Règles', icon: 'fa fa-fw fa-exchange-alt', routerLink: 'regles'},
            {label: 'Compétences', icon: 'fa fa-fw fa-book', routerLink: 'competences'},
            {label: 'Transformation', icon: 'fa fa-fw  fa-cogs', routerLink: 'allTransformed'},
//             {label: 'Résultat', icon: 'fa fa-fw  fa-file-csv', routerLink: 'resultat'}
            {label: 'Saisie Manuelle', icon: 'fas  fa-user-edit', routerLink: 'saisie'},

        ];
    }

}

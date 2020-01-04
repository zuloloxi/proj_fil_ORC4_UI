import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CollaboratorListComponent } from './components/collaborator-list/collaborator-list.component';
import { ReglesListComponent } from './components/regles-list/regles-list.component';
import { CollaboratorItemComponent } from './components/collaborator-item/collaborator-item.component';
import { CompetenceListComponent } from './components/competence-list/competence-list.component';
import { RegleFormComponent } from './components/regle-form/regle-form.component';
import { OutputListComponent } from './components/output-list/output-list.component';


const routes: Routes = [
  { path: 'collaborateurs', component: CollaboratorListComponent },
  { path: 'collaborateurs/:collaborateurUid', component: CollaboratorItemComponent },
  { path: 'regles', component: ReglesListComponent },
  { path: 'competences', component: CompetenceListComponent },
  { path: 'fichier', component: ReglesListComponent },
  { path: 'reglecreate', component: RegleFormComponent },
  { path: 'regleupdate/:id', component: RegleFormComponent },
  { path: 'regledelete/:id', component: RegleFormComponent },
  { path: 'allTransformed', component: OutputListComponent },
  { path: '', redirectTo: '/regles', pathMatch: 'full' }   // page par défaut
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CollaboratorListComponent } from './components/collaborator-list/collaborator-list.component';
import { ReglesListComponent } from './components/regles-list/regles-list.component';


const routes: Routes = [
  { path: 'collaborateurs', component: CollaboratorListComponent },
  { path: 'regles', component: ReglesListComponent },
  { path: 'competences', component: ReglesListComponent },
  { path: 'fichier', component: ReglesListComponent },
  { path: '', redirectTo: '/regles', pathMatch: 'full' }   // page par défaut
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

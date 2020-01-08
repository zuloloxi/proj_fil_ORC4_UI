import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  errors = {
    'ERR_0001' : 'non trouvé',
    'ERR_0001.1' : 'Résultat de la transformation non trouvée',
    'ERR_0001.2' : 'Règle non trouvée',
    'ERR_0001.3' : 'Compétence non trouvée',
    'ERR_0002' : 'Changement depuis la demande de mise à jour',
    'ERR_0002.1' : 'La compétence sélectionnée a changé',
    'ERR_0002.2' : 'La compétence à supprimer est encore utilisée par une règle',
    'ERR_0002.3' : 'La compétence à créer existe déjà',
    'ERR_0003.3' : 'Régle non supprimable',

  };

  constructor() { }

  getMessage(error: any): string {
    const messageFonctionnel = this.errors[error.error[0]];
    if (messageFonctionnel.length > 0){
      return error.error[0] + ' : ' + messageFonctionnel;
    } else {
      return 'Erreur ' + error.status + ' : ' + error.error.message;
    }
  }
}

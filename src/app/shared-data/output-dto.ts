export class OutputDto {
  constructor (
          public identifiant: string,
          public nom: string,
          public prenom: string,
          public email: string,
          public domaine: string,
          public equipe: string,
          public profil: string,
          public competences: string) {}
}

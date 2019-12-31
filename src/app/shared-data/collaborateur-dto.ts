export interface CollaborateurOption {
    id?: number;
    uid: string;
    civilite: string;
    nom: string;
    prenom: string;
    fonction: string;
    telephone: string;
    mail: string;
    etage: string;
    uoAffectation: string;
    codeImmeubleEmplacementCollaborateur: string;
    region: string;
    codeRegion: string;
    niveauTerritoire: string;
    codeTerritoire: string;
    niveauEntite: string;
    codeEntite: string;
    niveauAgence: string;
    codeAgence: string;
    localisationCollaborateur: string;
    pj: string;
    aMigrer: string;
}

export class CollaborateurDTO {

    id: number;
    uid: string;
    civilite: string;
    nom: string;
    prenom: string;
    fonction: string;
    telephone: string;
    mail: string;
    etage: string;
    uoAffectation: string;
    codeImmeubleEmplacementCollaborateur: string;
    region: string;
    codeRegion: string;
    niveauTerritoire: string;
    codeTerritoire: string;
    niveauEntite: string;
    codeEntite: string;
    niveauAgence: string;
    codeAgence: string;
    localisationCollaborateur: string;
    pj: string;
    aMigrer: string;

    constructor(options: CollaborateurOption) {
        this.id  = options.id  || 0;
        this.uid = options.uid;
        this.civilite = options.civilite;
        this.nom = options.nom ;
        this.prenom = options.prenom ;
        this.fonction = options.fonction ;
        this.telephone = options.telephone ;
        this.mail = options.mail ;
        this.etage = options.etage ;
        this.uoAffectation = options.uoAffectation ;
        this.codeImmeubleEmplacementCollaborateur = options.codeImmeubleEmplacementCollaborateur ;
        this.region = options.region ;
        this.codeRegion = options.codeRegion ;
        this.niveauTerritoire = options.niveauTerritoire ;
        this.codeTerritoire = options.codeTerritoire ;
        this.niveauEntite = options.niveauEntite ;
        this.codeEntite = options.codeEntite ;
        this.niveauAgence = options.niveauAgence ;
        this.codeAgence = options.codeAgence ;
        this.localisationCollaborateur = options.localisationCollaborateur ;
        this.pj = options.pj ;
        this.aMigrer = options.aMigrer ;
    }
}

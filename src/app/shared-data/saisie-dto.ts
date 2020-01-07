export interface SaisieOption {
    id?: number;
    collaborateurUid: string;
    domaine: string;
    equipe: string;
    profil: string;
    competences: string;
}

export class SaisieDTO {
    id: number;
    collaborateurUid: string;
    domaine: string;
    equipe: string;
    profil: string;
    competences: string;

    constructor(options: SaisieOption) {
        this.id = options.id || 0;
        this.collaborateurUid = options.collaborateurUid;
        this.domaine = options.domaine;
        this.equipe = options.equipe;
        this.profil = options.profil;
        this.competences = options.competences;
    }
}

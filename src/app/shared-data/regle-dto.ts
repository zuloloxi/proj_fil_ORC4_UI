
export interface RegleOption {
    id?: string;
    deploiement: string;
    metier: string;
    posteType: string;
    domaine: string;
    stratesEquipes: string;
    profil: string;
    equipesSupervisees: string;
    descriptifEquipesSupervisses: string;
    competences: string;
}

export class RegleDTO {
    id: string;
    deploiement: string;
    metier: string;
    posteType: string;
    domaine: string;
    stratesEquipes: string;
    profil: string;
    equipesSupervisees: string;
    descriptifEquipesSupervisses: string;
    competences: string;

    constructor(options: RegleOption) {
        this.id = options.id;
        this.deploiement = options.deploiement;
        this.metier = options.metier;
        this.posteType = options.posteType;
        this.domaine = options.domaine;
        this.stratesEquipes = options.stratesEquipes;
        this.profil = options.profil;
        this.equipesSupervisees = options.equipesSupervisees;
        this.descriptifEquipesSupervisses = options.descriptifEquipesSupervisses;
        this.competences = options.competences;
    }
}

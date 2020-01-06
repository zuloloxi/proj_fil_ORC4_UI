import { CompetenceDTO } from './competence-dto';

export interface RegleOption {
    id?: number;
    deploiement: string;
    metier?: string;
    posteType: string;
    domaine: string;
    stratesEquipes: string;
    profil: string;
    equipesSupervisees: string;
    descriptifEquipesSupervisses: string;
    competences: CompetenceDTO[];
}

export class RegleDTO {
    id: number;
    deploiement: string;
    metier: string;
    posteType: string;
    domaine: string;
    stratesEquipes: string;
    profil: string;
    equipesSupervisees: string;
    descriptifEquipesSupervisses: string;
    competences: CompetenceDTO[];

    constructor(options: RegleOption) {
        this.id = options.id;
        this.deploiement = options.deploiement;
        this.metier = options.metier || '';
        this.posteType = options.posteType;
        this.domaine = options.domaine;
        this.stratesEquipes = options.stratesEquipes;
        this.profil = options.profil;
        this.equipesSupervisees = options.equipesSupervisees;
        this.descriptifEquipesSupervisses = options.descriptifEquipesSupervisses;
        this.competences = options.competences;
    }
}

export class RegleViewList {
    id: number;
    deploiement: string;
    metier: string;
    posteType: string;
    domaine: string;
    stratesEquipes: string;
    profil: string;
    equipesSupervisees: string;
    descriptifEquipesSupervisses: string;
    competences: CompetenceDTO[];
    competencesForSearch: string;

    constructor(id: number, deploiement: string, metier: string, posteType: string, domaine: string, stratesEquipes: string,
                profil: string, equipesSupervisees: string, descriptifEquipesSupervisses: string, competences: CompetenceDTO[],
                competencesForSearch: string) {
        this.id = id;
        this.deploiement = deploiement;
        this.metier = metier || '';
        this.posteType = posteType;
        this.domaine = domaine;
        this.stratesEquipes = stratesEquipes;
        this.profil = profil;
        this.equipesSupervisees = equipesSupervisees;
        this.descriptifEquipesSupervisses = descriptifEquipesSupervisses;
        this.competences = competences;
        this.competencesForSearch = competencesForSearch;
    }
}
export interface CompetenceOption {
    id?: number;
    competence: string;
    descriptif: string;
}

export class CompetenceDTO {
    id: number;
    competence: string;
    descriptif: string;

    constructor(options: CompetenceOption) {
        this.id = options.id || 0;
        this.competence = options.competence;
        this.descriptif = options.descriptif;
    }
}

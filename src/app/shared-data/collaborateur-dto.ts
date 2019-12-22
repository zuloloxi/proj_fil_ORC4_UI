export class CollaborateurDTO {
    constructor(
        public id: number,
        public uid: string,
        public civilite: string,
        public nom: string,
        public prenom: string,
        public fonction: string,
        public telephone: string,
        public mail: string,
        public etage: string,
        public uoAffectation: string,
        public codeImmeubleEmplacementCollaborateur: string,
        public region: string,
        public codeRegion: string,
        public niveauTerritoire: string,
        public codeTerritoire: string,
        public niveauEntite: string,
        public codeEntite: string,
        public niveauAgence: string,
        public codeAgence: string,
        public localisationCollaborateur: string,
        public pj: string,
        public aMigrer: string
    ) { }
}

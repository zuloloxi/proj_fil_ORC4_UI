import { Pipe, PipeTransform } from '@angular/core';
import { CompetenceDTO } from '../shared-data/competence-dto';

@Pipe({
  name: 'competence'
})
export class CompetencePipe implements PipeTransform {

  transform(competences: CompetenceDTO[]): string {
    const competenceLibelle: string[] = [];
    competences.forEach(competence => competenceLibelle.push(competence.competence));
    return competenceLibelle.toString();
  }
}

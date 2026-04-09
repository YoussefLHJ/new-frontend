import {BatimentCriteria} from './BatimentCriteria.model';

import {BaseCriteria} from 'src/app/zynerator/criteria/BaseCriteria.model';

export class AppareilCriteria extends BaseCriteria {

    public id: number;
    public numero: string;
    public numeroLike: string;
     public dernierePeriodeIndex: number;
     public dernierePeriodeIndexMin: number;
     public dernierePeriodeIndexMax: number;
     public derniereAnneeIndex: number;
     public derniereAnneeIndexMin: number;
     public derniereAnneeIndexMax: number;

}

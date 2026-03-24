import {ZoneAgenceReleveCriteria} from './ZoneAgenceReleveCriteria.model';
import {LotReleveCriteria} from './LotReleveCriteria.model';

import {BaseCriteria} from 'src/app/zynerator/criteria/BaseCriteria.model';

export class UniteReleveCriteria extends BaseCriteria {

    public id: number;
    public numero: string;
    public numeroLike: string;
    public libelle: string;
    public libelleLike: string;
    public description: string;
    public descriptionLike: string;
    public actif: null | boolean;
      public lotReleves: Array<LotReleveCriteria>;

}

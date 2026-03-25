import {BatimentCriteria} from './BatimentCriteria.model';

import {BaseCriteria} from 'src/app/zynerator/criteria/BaseCriteria.model';

export class AppareilCriteria extends BaseCriteria {

    public id: number;
    public numeroAppareil: string;
    public numeroAppareilLike: string;
  public batiment: BatimentCriteria ;
  public batiments: Array<BatimentCriteria> ;

}

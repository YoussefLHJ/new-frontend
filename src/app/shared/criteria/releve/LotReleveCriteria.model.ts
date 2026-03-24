import {UniteReleveCriteria} from './UniteReleveCriteria.model';
import {BatimentCriteria} from '../config/BatimentCriteria.model';

import {BaseCriteria} from 'src/app/zynerator/criteria/BaseCriteria.model';

export class LotReleveCriteria extends BaseCriteria {

    public id: number;
    public numero: string;
    public numeroLike: string;
    public code: string;
    public codeLike: string;
     public nbBatiments: number;
     public nbBatimentsMin: number;
     public nbBatimentsMax: number;
     public nbCompteursALire: number;
     public nbCompteursALireMin: number;
     public nbCompteursALireMax: number;
     public nbCompteursCharges: number;
     public nbCompteursChargesMin: number;
     public nbCompteursChargesMax: number;
    public dateCreation: Date;
    public dateCreationFrom: Date;
    public dateCreationTo: Date;
    public dateMiseAJour: Date;
    public dateMiseAJourFrom: Date;
    public dateMiseAJourTo: Date;
    public actif: null | boolean;
      public batiments: Array<BatimentCriteria>;

}

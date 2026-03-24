import {AppareilCriteria} from '../config/AppareilCriteria.model';
import {TourneeReleveDetailCriteria} from './TourneeReleveDetailCriteria.model';

import {BaseCriteria} from 'src/app/zynerator/criteria/BaseCriteria.model';

export class TourneeReleveCompteurCriteria extends BaseCriteria {

    public id: number;
     public indice: number;
     public indiceMin: number;
     public indiceMax: number;
     public indicePrecedent: number;
     public indicePrecedentMin: number;
     public indicePrecedentMax: number;
     public consommation: number;
     public consommationMin: number;
     public consommationMax: number;
     public seuilComsommation: number;
     public seuilComsommationMin: number;
     public seuilComsommationMax: number;
    public commentaire: string;
    public commentaireLike: string;
    public photo: string;
    public photoLike: string;
  public appareil: AppareilCriteria ;
  public appareils: Array<AppareilCriteria> ;

}

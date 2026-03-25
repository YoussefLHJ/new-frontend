import {CommuneCriteria} from './CommuneCriteria.model';
import {AppareilCriteria} from './AppareilCriteria.model';
import {LotReleveCriteria} from '../releve/LotReleveCriteria.model';

import {BaseCriteria} from 'src/app/zynerator/criteria/BaseCriteria.model';

export class BatimentCriteria extends BaseCriteria {

    public id: number;
    public codeBatiment: string;
    public codeBatimentLike: string;
    public complementAdresse: string;
    public complementAdresseLike: string;
    public libelle: string;
    public libelleLike: string;
     public nombreEtages: number;
     public nombreEtagesMin: number;
     public nombreEtagesMax: number;
     public nombrePointsLivraison: number;
     public nombrePointsLivraisonMin: number;
     public nombrePointsLivraisonMax: number;
     public nombreLieuxReleve: number;
     public nombreLieuxReleveMin: number;
     public nombreLieuxReleveMax: number;
     public nombreLieuxConsommation: number;
     public nombreLieuxConsommationMin: number;
     public nombreLieuxConsommationMax: number;
    public dateCreation: Date;
    public dateCreationFrom: Date;
    public dateCreationTo: Date;
    public actif: null | boolean;
  public commune: CommuneCriteria ;
  public communes: Array<CommuneCriteria> ;
  public lotReleve: LotReleveCriteria ;
  public lotReleves: Array<LotReleveCriteria> ;
      public appareil: Array<AppareilCriteria>;

}

import {CommuneCriteria} from '../config/CommuneCriteria.model';
import {AppareilCriteria} from './AppareilCriteria.model';

import {BaseCriteria} from 'src/app/zynerator/criteria/BaseCriteria.model';

export class BatimentCriteria extends BaseCriteria {

    public id: number;
    public code: string;
    public codeLike: string;
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
    public actif: null | boolean;
      public appareils: Array<AppareilCriteria>;

}

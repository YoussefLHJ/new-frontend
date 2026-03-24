import {TourneeLotReleveCriteria} from './TourneeLotReleveCriteria.model';
import {LotReleveCriteria} from './LotReleveCriteria.model';
import {TourneeReleveCompteurCriteria} from './TourneeReleveCompteurCriteria.model';

import {BaseCriteria} from 'src/app/zynerator/criteria/BaseCriteria.model';

export class TourneeReleveDetailCriteria extends BaseCriteria {

    public id: number;
     public nbBatiments: number;
     public nbBatimentsMin: number;
     public nbBatimentsMax: number;
     public nbCompteurs: number;
     public nbCompteursMin: number;
     public nbCompteursMax: number;
     public nbCompteursBatiment: number;
     public nbCompteursBatimentMin: number;
     public nbCompteursBatimentMax: number;
  public tourneeLotReleve: TourneeLotReleveCriteria ;
  public tourneeLotReleves: Array<TourneeLotReleveCriteria> ;
  public lotReleve: LotReleveCriteria ;
  public lotReleves: Array<LotReleveCriteria> ;
      public tourneeReleveCompteurs: Array<TourneeReleveCompteurCriteria>;

}

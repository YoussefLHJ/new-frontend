import {TourneeReleveDetailCriteria} from './TourneeReleveDetailCriteria.model';
import {LotReleveCriteria} from './LotReleveCriteria.model';

import {BaseCriteria} from 'src/app/zynerator/criteria/BaseCriteria.model';

export class TourneeLotReleveCriteria extends BaseCriteria {

    public id: number;
    public numero: string;
    public numeroLike: string;
    public libelle: string;
    public libelleLike: string;
     public annee: number;
     public anneeMin: number;
     public anneeMax: number;
     public period: number;
     public periodMin: number;
     public periodMax: number;
     public jourDebutReleve: number;
     public jourDebutReleveMin: number;
     public jourDebutReleveMax: number;
     public moisDebutReleve: number;
     public moisDebutReleveMin: number;
     public moisDebutReleveMax: number;
     public nbLots: number;
     public nbLotsMin: number;
     public nbLotsMax: number;
     public nbBatiments: number;
     public nbBatimentsMin: number;
     public nbBatimentsMax: number;
     public nbCompteurs: number;
     public nbCompteursMin: number;
     public nbCompteursMax: number;
     public nbCompteursBatiment: number;
     public nbCompteursBatimentMin: number;
     public nbCompteursBatimentMax: number;
    public actif: null | boolean;
    public dateCreation: Date;
    public dateCreationFrom: Date;
    public dateCreationTo: Date;
    public dateMiseAJour: Date;
    public dateMiseAJourFrom: Date;
    public dateMiseAJourTo: Date;
  public lotReleve: LotReleveCriteria ;
  public lotReleves: Array<LotReleveCriteria> ;
      public tourneeReleveDetails: Array<TourneeReleveDetailCriteria>;

}

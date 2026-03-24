import {ZoneAgenceReleveCriteria} from './ZoneAgenceReleveCriteria.model';
import {ZoneVilleReleveCriteria} from './ZoneVilleReleveCriteria.model';

import {BaseCriteria} from 'src/app/zynerator/criteria/BaseCriteria.model';

export class ZoneVilleRegionReleveCriteria extends BaseCriteria {

    public id: number;
    public numero: string;
    public numeroLike: string;
    public libelle: string;
    public libelleLike: string;
    public description: string;
    public descriptionLike: string;
    public actif: null | boolean;
  public zoneVilleReleve: ZoneVilleReleveCriteria ;
  public zoneVilleReleves: Array<ZoneVilleReleveCriteria> ;
      public zoneAgenceReleves: Array<ZoneAgenceReleveCriteria>;

}

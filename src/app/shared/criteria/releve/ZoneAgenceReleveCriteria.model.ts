import {UniteReleveCriteria} from './UniteReleveCriteria.model';
import {ZoneVilleRegionReleveCriteria} from './ZoneVilleRegionReleveCriteria.model';

import {BaseCriteria} from 'src/app/zynerator/criteria/BaseCriteria.model';

export class ZoneAgenceReleveCriteria extends BaseCriteria {

    public id: number;
    public numero: string;
    public numeroLike: string;
    public libelle: string;
    public libelleLike: string;
    public description: string;
    public descriptionLike: string;
    public actif: null | boolean;
  public zoneVilleRegionReleve: ZoneVilleRegionReleveCriteria ;
  public zoneVilleRegionReleves: Array<ZoneVilleRegionReleveCriteria> ;
      public uniteReleves: Array<UniteReleveCriteria>;

}

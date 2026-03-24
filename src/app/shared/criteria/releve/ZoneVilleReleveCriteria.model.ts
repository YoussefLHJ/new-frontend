import {ZoneVilleRegionReleveCriteria} from './ZoneVilleRegionReleveCriteria.model';

import {BaseCriteria} from 'src/app/zynerator/criteria/BaseCriteria.model';

export class ZoneVilleReleveCriteria extends BaseCriteria {

    public id: number;
    public numero: string;
    public numeroLike: string;
    public libelle: string;
    public libelleLike: string;
    public description: string;
    public descriptionLike: string;
    public actif: null | boolean;
      public zoneVilleRegionReleves: Array<ZoneVilleRegionReleveCriteria>;

}

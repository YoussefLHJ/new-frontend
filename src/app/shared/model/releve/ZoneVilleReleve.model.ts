import {ZoneVilleRegionReleveDto} from './ZoneVilleRegionReleve.model';

import {BaseDto} from 'src/app/zynerator/dto/BaseDto.model';


export class ZoneVilleReleveDto extends BaseDto{

    public numero: string;

    public libelle: string;

    public description: string;

   public actif: null | boolean;

     public zoneVilleRegionReleves: Array<ZoneVilleRegionReleveDto>;


    constructor() {
        super();

        this.numero = '';
        this.libelle = '';
        this.description = '';
        this.actif = null;
        this.zoneVilleRegionReleves = new Array<ZoneVilleRegionReleveDto>();

        }

}

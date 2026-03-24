import {ZoneAgenceReleveDto} from './ZoneAgenceReleve.model';
import {ZoneVilleReleveDto} from './ZoneVilleReleve.model';

import {BaseDto} from 'src/app/zynerator/dto/BaseDto.model';


export class ZoneVilleRegionReleveDto extends BaseDto{

    public numero: string;

    public libelle: string;

    public description: string;

   public actif: null | boolean;

    public zoneVilleReleve: ZoneVilleReleveDto ;
     public zoneAgenceReleves: Array<ZoneAgenceReleveDto>;


    constructor() {
        super();

        this.numero = '';
        this.libelle = '';
        this.description = '';
        this.actif = null;
        this.zoneVilleReleve = new ZoneVilleReleveDto() ;
        this.zoneAgenceReleves = new Array<ZoneAgenceReleveDto>();

        }

}

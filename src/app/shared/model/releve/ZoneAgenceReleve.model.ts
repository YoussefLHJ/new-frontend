import {UniteReleveDto} from './UniteReleve.model';
import {ZoneVilleRegionReleveDto} from './ZoneVilleRegionReleve.model';

import {BaseDto} from 'src/app/zynerator/dto/BaseDto.model';


export class ZoneAgenceReleveDto extends BaseDto{

    public numero: string;

    public libelle: string;

    public description: string;

   public actif: null | boolean;

    public zoneVilleRegionReleve: ZoneVilleRegionReleveDto | null;
     public uniteReleves: Array<UniteReleveDto>;


    constructor() {
        super();

        this.numero = '';
        this.libelle = '';
        this.description = '';
        this.actif = null;
        this.zoneVilleRegionReleve = null;
        this.uniteReleves = new Array<UniteReleveDto>();

        }

}

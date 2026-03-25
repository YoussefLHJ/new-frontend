import {ZoneAgenceReleveDto} from './ZoneAgenceReleve.model';
import {LotReleveDto} from './LotReleve.model';

import {BaseDto} from 'src/app/zynerator/dto/BaseDto.model';


export class UniteReleveDto extends BaseDto{

    public numero: string;

    public libelle: string;

    public description: string;

   public actif: null | boolean;

    public zoneAgenceReleve: ZoneAgenceReleveDto | null;
     public lotReleves: Array<LotReleveDto>;


    constructor() {
        super();

        this.numero = '';
        this.libelle = '';
        this.description = '';
        this.actif = null;
        this.zoneAgenceReleve = null;
        this.lotReleves = new Array<LotReleveDto>();

        }

}

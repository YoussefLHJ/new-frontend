import {UniteReleveDto} from './UniteReleve.model';
import {BatimentDto} from '../config/Batiment.model';

import {BaseDto} from 'src/app/zynerator/dto/BaseDto.model';


export class LotReleveDto extends BaseDto{

    public numero: string;

    public code: string;

    public nbBatiments: null | number;

    public nbCompteursALire: null | number;

    public nbCompteursCharges: null | number;

   public dateCreation: Date;

   public dateMiseAJour: Date;

   public actif: null | boolean;

    public uniteReleve: UniteReleveDto ;
     public batiments: Array<BatimentDto>;


    constructor() {
        super();

        this.numero = '';
        this.code = '';
        this.nbBatiments = null;
        this.nbCompteursALire = null;
        this.nbCompteursCharges = null;
        this.dateCreation = null;
        this.dateMiseAJour = null;
        this.actif = null;
        this.batiments = new Array<BatimentDto>();

        }

}

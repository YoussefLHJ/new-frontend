import {CommuneDto} from '../config/Commune.model';
import {AppareilDto} from './Appareil.model';

import {BaseDto} from 'src/app/zynerator/dto/BaseDto.model';


export class BatimentDto extends BaseDto{

    public code: string;

    public complementAdresse: string;

    public libelle: string;

    public nombreEtages: null | number;

    public nombrePointsLivraison: null | number;

    public nombreLieuxReleve: null | number;

    public nombreLieuxConsommation: null | number;

   public actif: null | boolean;

    public commune: CommuneDto ;
     public appareils: Array<AppareilDto>;


    constructor() {
        super();

        this.code = '';
        this.complementAdresse = '';
        this.libelle = '';
        this.nombreEtages = null;
        this.nombrePointsLivraison = null;
        this.nombreLieuxReleve = null;
        this.nombreLieuxConsommation = null;
        this.actif = null;
        this.appareils = new Array<AppareilDto>();

        }

}

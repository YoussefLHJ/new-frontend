import {CommuneDto} from './Commune.model';
import {AppareilDto} from './Appareil.model';
import {LotReleveDto} from '../releve/LotReleve.model';

import {BaseDto} from 'src/app/zynerator/dto/BaseDto.model';


export class BatimentDto extends BaseDto{

    public codeBatiment: string;

    public complementAdresse: string;

    public libelle: string;

    public nombreEtages: null | number;

    public nombrePointsLivraison: null | number;

    public nombreLieuxReleve: null | number;

    public nombreLieuxConsommation: null | number;

   public dateCreation: Date | null;

   public actif: null | boolean;

    public commune: CommuneDto | null;
    public lotReleve: LotReleveDto | null;
     public appareil: Array<AppareilDto>;


    constructor() {
        super();

        this.codeBatiment = '';
        this.complementAdresse = '';
        this.libelle = '';
        this.nombreEtages = null;
        this.nombrePointsLivraison = null;
        this.nombreLieuxReleve = null;
        this.nombreLieuxConsommation = null;
        this.dateCreation = null;
        this.actif = null;
        this.commune = null;
        this.lotReleve = new LotReleveDto() ;
        this.appareil = new Array<AppareilDto>();

        }

}

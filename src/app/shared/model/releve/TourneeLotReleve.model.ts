import {TourneeReleveDetailDto} from './TourneeReleveDetail.model';
import {LotReleveDto} from './LotReleve.model';

import {BaseDto} from 'src/app/zynerator/dto/BaseDto.model';


export class TourneeLotReleveDto extends BaseDto{

    public numero: string;

    public libelle: string;

    public annee: null | number;

    public period: null | number;

    public jourDebutReleve: null | number;

    public moisDebutReleve: null | number;

    public nbLots: null | number;

    public nbBatiments: null | number;

    public nbCompteurs: null | number;

    public nbCompteursBatiment: null | number;

   public actif: null | boolean;

   public dateCreation: Date | null;

   public dateMiseAJour: Date | null;

    public lotReleve: LotReleveDto | null;
     public tourneeReleveDetails: Array<TourneeReleveDetailDto>;


    constructor() {
        super();

        this.numero = '';
        this.libelle = '';
        this.annee = null;
        this.period = null;
        this.jourDebutReleve = null;
        this.moisDebutReleve = null;
        this.nbLots = null;
        this.nbBatiments = null;
        this.nbCompteurs = null;
        this.nbCompteursBatiment = null;
        this.actif = null;
        this.dateCreation = null;
        this.dateMiseAJour = null;
        this.lotReleve = new LotReleveDto() ;
        this.tourneeReleveDetails = new Array<TourneeReleveDetailDto>();

        }

}

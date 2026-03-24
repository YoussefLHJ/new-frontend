import {TourneeLotReleveDto} from './TourneeLotReleve.model';
import {LotReleveDto} from './LotReleve.model';
import {TourneeReleveCompteurDto} from './TourneeReleveCompteur.model';

import {BaseDto} from 'src/app/zynerator/dto/BaseDto.model';


export class TourneeReleveDetailDto extends BaseDto{

    public nbBatiments: null | number;

    public nbCompteurs: null | number;

    public nbCompteursBatiment: null | number;

    public tourneeLotReleve: TourneeLotReleveDto ;
    public lotReleve: LotReleveDto ;
     public tourneeReleveCompteurs: Array<TourneeReleveCompteurDto>;


    constructor() {
        super();

        this.nbBatiments = null;
        this.nbCompteurs = null;
        this.nbCompteursBatiment = null;
        this.tourneeLotReleve = new TourneeLotReleveDto() ;
        this.lotReleve = new LotReleveDto() ;
        this.tourneeReleveCompteurs = new Array<TourneeReleveCompteurDto>();

        }

}

import {AppareilDto} from '../config/Appareil.model';
import {TourneeReleveDetailDto} from './TourneeReleveDetail.model';

import {BaseDto} from 'src/app/zynerator/dto/BaseDto.model';


export class TourneeReleveCompteurDto extends BaseDto{

    public indice: null | number;

    public indicePrecedent: null | number;

    public consommation: null | number;

    public seuilComsommation: null | number;

    public commentaire: string;

    public photo: string;

    public appareil: AppareilDto | null;
    public tourneeReleveDetail: TourneeReleveDetailDto | null;


    constructor() {
        super();

        this.indice = null;
        this.indicePrecedent = null;
        this.consommation = null;
        this.seuilComsommation = null;
        this.commentaire = '';
        this.photo = '';
        this.appareil = null;
        this.tourneeReleveDetail = null;

        }

}

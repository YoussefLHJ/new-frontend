import {BatimentDto} from './Batiment.model';

import {BaseDto} from 'src/app/zynerator/dto/BaseDto.model';


export class AppareilDto extends BaseDto{

    public numero: string;

    public dernierePeriodeIndex: null | number;

    public derniereAnneeIndex: null | number;

    public batiment: BatimentDto ;


    constructor() {
        super();

        this.numero = '';
        this.dernierePeriodeIndex = null;
        this.derniereAnneeIndex = null;

        }

}

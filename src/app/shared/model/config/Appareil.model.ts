import {BatimentDto} from './Batiment.model';

import {BaseDto} from 'src/app/zynerator/dto/BaseDto.model';


export class AppareilDto extends BaseDto{

    public numeroAppareil: string;

    public batiment: BatimentDto | null;


    constructor() {
        super();

        this.numeroAppareil = '';
        this.batiment = null;

        }

}

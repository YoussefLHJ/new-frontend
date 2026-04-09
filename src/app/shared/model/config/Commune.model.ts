
import {BaseDto} from 'src/app/zynerator/dto/BaseDto.model';


export class CommuneDto extends BaseDto{

    public code: string;

    public libelle: string;

    public description: string;

   public actif: null | boolean;



    constructor() {
        super();

        this.code = '';
        this.libelle = '';
        this.description = '';
        this.actif = null;

        }

}

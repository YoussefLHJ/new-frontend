
import {BaseDto} from 'src/app/zynerator/dto/BaseDto.model';


export class CommuneDto extends BaseDto{

    public code: string;

    public libelle: string;

    public description: string;

   public actif: null | boolean;

   public dateCreation: Date | null;

   public dateMiseAJour: Date | null;



    constructor() {
        super();

        this.code = '';
        this.libelle = '';
        this.description = '';
        this.actif = null;
        this.dateCreation = null;
        this.dateMiseAJour = null;

        }

}

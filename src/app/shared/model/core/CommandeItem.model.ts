import {CommandeDto} from './Commande.model';

import {BaseDto} from 'src/app/zynerator/dto/BaseDto.model';


export class CommandeItemDto extends BaseDto{

    public produit: string;

    public prix: null | number;

    public quantite: null | number;

    public description: string;

    public commentaireClient: string;

    public commentaireVendeur: string;

    public code: string;

    public commande: CommandeDto ;


    constructor() {
        super();

        this.produit = '';
        this.prix = null;
        this.quantite = null;
        this.description = '';
        this.commentaireClient = '';
        this.commentaireVendeur = '';
        this.code = '';

        }

}

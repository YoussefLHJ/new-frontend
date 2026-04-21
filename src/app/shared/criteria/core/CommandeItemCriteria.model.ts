import {CommandeCriteria} from './CommandeCriteria.model';

import {BaseCriteria} from 'src/app/zynerator/criteria/BaseCriteria.model';

export class CommandeItemCriteria extends BaseCriteria {

    public id: number;
    public produit: string;
    public produitLike: string;
     public prix: number;
     public prixMin: number;
     public prixMax: number;
     public quantite: number;
     public quantiteMin: number;
     public quantiteMax: number;
    public description: string;
    public descriptionLike: string;
    public commentaireClient: string;
    public commentaireClientLike: string;
    public commentaireVendeur: string;
    public commentaireVendeurLike: string;
    public code: string;
    public codeLike: string;

}

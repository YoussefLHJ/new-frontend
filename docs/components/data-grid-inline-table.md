# Nom du composant

`DataGridInlineTableComponent`

## Description simple

Ce composant gère une petite liste directement dans un formulaire.

Il peut fonctionner de deux façons :

- créer un nouvel élément dans un formulaire inline ;
- choisir un élément déjà existant dans une liste.

## Comment l’utiliser

```html
<app-data-grid-inline-table
  [(items)]="item.commandeItems"
  [columns]="commandeItemColumns"
  [itemFactory]="commandeItemFactory"
  [existingItems]="availableCommandeItems"
  existingItemLabelField="produit"
  existingItemSubLabelField="code">
  <ng-template #form let-el>
    <app-input [placeholder]="'commandeItem.produit'" [(ngModel)]="el.produit" />
  </ng-template>
</app-data-grid-inline-table>
```

## Inputs (Entrées)

- `items` : liste affichée et mise à jour par le composant.
- `columns` : colonnes visibles dans la table.
- `itemFactory` : fonction qui crée un nouvel objet vide.
- `existingItems` : liste d’éléments déjà disponibles pour le mode sélection.
- `existingItemLabelField` : champ principal affiché dans la liste de sélection.
- `existingItemSubLabelField` : champ secondaire affiché sous le libellé.

## Outputs (Sorties)

- Pas de sortie personnalisée.
- Les changements passent par `[(items)]`.

## Exemple réel

Dans `commande`, ce composant gère `item.commandeItems` dans les écrans de création et de modification.

Le module utilise maintenant aussi le mode sélection avec `produit` comme libellé principal et `code` comme sous-libellé.

## Notes

- Le sélecteur de mode n’apparaît que si `existingItems` contient des données.
- Le formulaire inline vient d’un template projeté nommé `#form`.
- En mode sélection, les éléments choisis sont ajoutés à la liste sans contrôle automatique des doublons.

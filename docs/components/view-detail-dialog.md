# Nom du composant

`ViewDetailDialogComponent`

## Description simple

Ce composant affiche les détails d’un élément dans une fenêtre.

Il montre les colonnes visibles avec un rendu simple selon le type de donnée.

## Comment l’utiliser

```html
<app-view-detail-dialog
  [(visible)]="viewDialogVisible"
  [item]="selectedItem"
  [columns]="columns"
  title="commande.header" />
```

## Inputs (Entrées)

- `item` : élément à afficher.
- `columns` : colonnes à montrer.
- `title` : titre de la fenêtre.
- `visible` : ouvre ou ferme la fenêtre.

## Outputs (Sorties)

- Pas de sortie personnalisée.

## Exemple réel

Dans `commande`, cette fenêtre sert à voir une commande sans modifier ses valeurs.

Elle est ouverte depuis les actions du tableau.

## Notes

- Les colonnes cachées ne sont pas affichées.
- Les booléens, dates et entités sont formatés automatiquement.

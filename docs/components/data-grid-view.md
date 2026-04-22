# Nom du composant

`DataGridViewComponent`

## Description simple

Ce composant affiche une fenêtre de lecture seule.

Il sert à voir les détails d’un élément sans le modifier.

## Comment l’utiliser

```html
<app-data-grid-view
  [(visible)]="viewDialogVisible"
  [item]="selectedItem"
  [columns]="columns"
  title="commande.header" />
```

## Inputs (Entrées)

- `visible` : ouvre ou ferme la fenêtre.
- `item` : élément à afficher.
- `columns` : colonnes à montrer.
- `title` : titre de la fenêtre.

## Outputs (Sorties)

- Pas de sortie personnalisée.

## Exemple réel

Ce composant n’est pas utilisé directement dans `commande`.

La page de lecture de `commande` utilise plutôt `app-dialog-form` avec un contenu personnalisé.

## Notes

- Seules les colonnes visibles sont affichées.
- Le composant est un simple conteneur autour de la fenêtre de détail.

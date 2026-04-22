# Nom du composant

`ColumnSelectorComponent`

## Description simple

Ce composant permet d’afficher ou de cacher les colonnes d’un tableau.

Il ouvre un petit panneau avec une case à cocher par colonne.

## Comment l’utiliser

```html
<app-column-selector
  [columns]="columns"
  storageKey="commande"
  (columnsChanged)="onColumnsChanged($event)" />
```

## Inputs (Entrées)

- `columns` : liste des colonnes du tableau.
- `storageKey` : clé utilisée pour garder le choix dans le navigateur.

## Outputs (Sorties)

- `columnsChanged` : envoyé quand la visibilité des colonnes change.

## Exemple réel

Dans `commande`, ce composant est utilisé à l’intérieur de `app-data-grid-toolbar`, lui-même utilisé par `app-data-grid-list`.

Il permet à l’utilisateur de garder ses colonnes visibles ou cachées entre deux visites.

## Notes

- Le composant enregistre la visibilité dans `localStorage`.
- La clé utilisée est `col-visibility-` + `storageKey`.
- Si `storageKey` est vide, rien n’est sauvegardé.

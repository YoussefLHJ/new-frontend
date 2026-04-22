# Nom du composant

`FilterDialogComponent`

## Description simple

Ce composant affiche une fenêtre de filtre avancé.

L’utilisateur peut ajouter plusieurs conditions.

Toutes les conditions sont combinées avec `ET`.

## Comment l’utiliser

```html
<app-filter-dialog
  [(visible)]="filterDialogVisible"
  [columns]="columns"
  [criteriaFactory]="criteriaFactory"
  (filtersApplied)="onFiltersApplied($event)"
  (filtersCleared)="onFiltersCleared()" />
```

## Inputs (Entrées)

- `columns` : colonnes disponibles pour le filtre.
- `visible` : ouvre ou ferme la fenêtre.
- `criteriaFactory` : crée un objet de critères backend si besoin.

## Outputs (Sorties)

- `filtersApplied` : envoyé avec la liste des conditions valides.
- `filtersCleared` : envoyé quand les filtres sont vidés.
- `backendCriteriaApplied` : envoyé avec un objet prêt pour le backend.

## Exemple réel

Dans `commande`, ce composant est utilisé via `app-data-grid-toolbar`.

Les filtres sur `code`, `total`, `totalPayer`, `dateCommande` et `etatComande` sont construits à partir des colonnes serveur.

## Notes

- Si l’utilisateur ferme la fenêtre sans valider, les lignes de filtre sont réinitialisées.
- Les colonnes `entity` sont traitées comme du texte dans les filtres.

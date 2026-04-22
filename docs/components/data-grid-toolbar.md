# Nom du composant

`DataGridToolbarComponent`

## Description simple

Ce composant affiche la barre d’outils du tableau.

Il regroupe plusieurs actions :

- filtres ;
- export ;
- choix des colonnes ;
- regroupement.

## Comment l’utiliser

```html
<app-data-grid-toolbar
  [columns]="columns"
  [groupingConfig]="groupingConfig"
  [storageKey]="storageKey"
  [criteriaFactory]="criteriaFactory"
  (groupChanged)="onGroupFieldsChange($event)"
  (filtersApplied)="onFiltersApplied($event)"
  (exportPdf)="exportToPdf()"
  (columnsChanged)="onColumnsChanged()" />
```

## Inputs (Entrées)

- `columns` : colonnes du tableau.
- `groupOptions` : options de regroupement déjà préparées.
- `groupingConfig` : active ou règle le regroupement.
- `storageKey` : clé pour la sauvegarde des colonnes.
- `criteriaFactory` : active le mode filtre backend si elle existe.

## Outputs (Sorties)

- `groupChanged` : envoyé avec les champs choisis pour le regroupement.
- `filtersApplied` : envoyé avec les filtres actifs.
- `filtersCleared` : envoyé quand les filtres sont vidés.
- `backendCriteriaApplied` : envoyé avec des critères backend.
- `exportExcel` : demande un export Excel.
- `exportCsv` : demande un export CSV.
- `exportPdf` : demande un export PDF.
- `columnsChanged` : envoyé quand la visibilité des colonnes change.

## Exemple réel

Dans `commande`, cette barre est utilisée à l’intérieur de `app-data-grid-list`.

Elle permet de regrouper la liste par `code`, `dateCommande` ou `etatComande`, selon les colonnes marquées `groupable`.

## Notes

- Le regroupement n’apparaît que s’il y a des colonnes groupables.
- `defaultGroupFields` dans `groupingConfig` est appliqué une seule fois au démarrage.

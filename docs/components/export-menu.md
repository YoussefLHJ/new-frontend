# Nom du composant

`ExportMenuComponent`

## Description simple

Ce composant affiche un petit menu pour exporter les données.

Il ne fait pas l’export lui-même. Il envoie seulement l’action demandée.

## Comment l’utiliser

```html
<app-export-menu
  (exportExcel)="exportToExcel()"
  (exportCsv)="exportToCsv()"
  (exportPdf)="exportToPdf()" />
```

## Inputs (Entrées)

- Pas d’entrée personnalisée.

## Outputs (Sorties)

- `exportExcel` : demande un export Excel.
- `exportCsv` : demande un export CSV.
- `exportPdf` : demande un export PDF.

## Exemple réel

Dans `commande`, ce composant est utilisé à l’intérieur de `app-data-grid-toolbar`.

Le tableau parent décide ensuite comment lancer l’export.

## Notes

- Le composant sert seulement d’interface.
- La vraie logique d’export reste dans le composant parent.

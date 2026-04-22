# Nom du composant

`ServerDataTableComponent`

## Description simple

Ce composant affiche un tableau alimenté par le backend.

Il recharge les données quand l’utilisateur change de page, applique un filtre ou modifie le regroupement.

Il gère aussi :

- la pagination ;
- la recherche ;
- les filtres ;
- le regroupement ;
- la sélection ;
- le chargement avec `skeleton`.

## Comment l’utiliser

```html
<app-server-data-table
  [columns]="columns"
  [dataLoader]="dataLoader"
  [criteriaFactory]="criteriaFactory"
  [exportDataLoader]="exportDataLoader"
  [groupingConfig]="groupingConfig"
  [service]="gridService"
  title="commande.header"
  storageKey="commande"
  (onCreate)="openCreate()"
  (onEdit)="openEdit($event)" />
```

## Inputs (Entrées)

- `columns` : colonnes du tableau.
- `title` : titre affiché.
- `storageKey` : clé pour la sauvegarde locale.
- `groupOptions` : options de regroupement.
- `groupingConfig` : configuration du regroupement.
- `globalFilterFields` : champs de recherche globale.
- `dataKey` : clé unique d’une ligne.
- `exportFileName` : nom du fichier exporté.
- `tableMinWidth` : largeur minimale du tableau.
- `emptyMessage` : message si la liste est vide.
- `customCellFields` : champs rendus avec un template personnalisé.
- `initialRows` : nombre de lignes au départ.
- `dataLoader` : fonction qui charge la page depuis le backend.
- `criteriaFactory` : fonction qui crée l’objet de critères.
- `exportDataLoader` : fonction qui charge les données pour les exports Excel et CSV.
- `service` : service utilisé pour la suppression et l’export PDF.

## Outputs (Sorties)

- `onCreate` : demandé pour créer un élément.
- `onEdit` : envoyé avec la ligne à modifier.
- `onDelete` : envoyé avec la ligne à supprimer si aucun service n’est fourni.
- `onDeleteSelected` : envoyé avec la sélection si aucun service n’est fourni.

## Exemple réel

Dans `commande`, ce composant est utilisé via `app-data-grid-list` en mode `server`.

Le module active le regroupement et passe `gridService`, ce qui permet aussi la suppression et l’export PDF côté backend.

## Notes

- Si `groupingConfig.backendGrouping` est actif, les champs de groupe sont envoyés au backend.
- Pendant le chargement, le tableau affiche des lignes `skeleton`.
- Pour l’export PDF, il faut fournir `service`.

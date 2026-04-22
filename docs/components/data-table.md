# Nom du composant

`DataTableComponent`

## Description simple

Ce composant affiche un tableau côté client.

Il travaille avec des données déjà présentes dans la page.

Il gère aussi :

- la recherche ;
- les filtres ;
- le regroupement ;
- la sélection ;
- l’export ;
- l’état de chargement avec `skeleton`.

## Comment l’utiliser

```html
<app-data-table
  [items]="items"
  [columns]="columns"
  title="commande.header"
  storageKey="commande"
  [groupingConfig]="groupingConfig"
  [loading]="loading"
  [service]="gridService"
  (onCreate)="openCreate()"
  (onEdit)="edit($event)"
  (onDelete)="delete($event)" />
```

## Inputs (Entrées)

- `items` : données à afficher.
- `columns` : colonnes du tableau.
- `title` : titre affiché.
- `storageKey` : clé pour la visibilité des colonnes.
- `groupOptions` : options de regroupement.
- `groupingConfig` : configuration du regroupement.
- `globalFilterFields` : champs utilisés pour la recherche globale.
- `dataKey` : clé unique de chaque ligne.
- `exportFileName` : nom du fichier exporté.
- `tableMinWidth` : largeur minimale du tableau.
- `loading` : affiche des lignes `skeleton` pendant le chargement.
- `emptyMessage` : message si la liste est vide.
- `customCellFields` : champs rendus avec un template personnalisé.
- `service` : service optionnel pour l’export PDF backend.

## Outputs (Sorties)

- `onCreate` : demandé pour créer un élément.
- `onEdit` : envoyé avec la ligne à modifier.
- `onDelete` : envoyé avec la ligne à supprimer.
- `onDeleteSelected` : envoyé avec les lignes sélectionnées.

## Exemple réel

Le module `commande` utilise surtout la version serveur via `app-data-grid-list`.

La logique de regroupement, de filtre et de barre d’outils reste la même ici que dans la version serveur.

## Notes

- Si `loading` est vrai, le tableau affiche des lignes de chargement au lieu des vraies données.
- Si `service` est fourni, l’export PDF passe par le backend.
- Le regroupement peut être ouvert et fermé groupe par groupe.

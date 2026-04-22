# Nom du composant

`DataGridListComponent`

## Description simple

Ce composant est l’entrée principale pour afficher une liste.

Il choisit automatiquement le bon tableau :

- `client` pour des données déjà chargées ;
- `server` pour des données chargées depuis le backend.

## Comment l’utiliser

```html
<app-data-grid-list
  mode="server"
  [columns]="columns"
  [dataLoader]="dataLoader"
  [criteriaFactory]="criteriaFactory"
  [exportDataLoader]="exportDataLoader"
  [groupingConfig]="groupingConfig"
  [service]="gridService"
  title="commande.header"
  storageKey="commande"
  [globalFilterFields]="filterColumns"
  (onCreate)="openCreate()"
  (onEdit)="openEdit($event)" />
```

## Inputs (Entrées)

- `mode` : `client` ou `server`.
- `columns` : colonnes du tableau.
- `title` : titre affiché.
- `storageKey` : clé pour sauvegarder les colonnes visibles.
- `groupOptions` : options de regroupement si vous voulez une liste personnalisée.
- `groupingConfig` : active et règle le regroupement.
- `globalFilterFields` : champs utilisés pour la recherche globale.
- `dataKey` : clé unique d’une ligne.
- `exportFileName` : nom du fichier d’export.
- `tableMinWidth` : largeur minimale du tableau.
- `emptyMessage` : message si la liste est vide.
- `customCellFields` : champs rendus avec un template personnalisé.
- `items` : données locales en mode `client`.
- `loading` : état de chargement en mode `client`.
- `dataLoader` : fonction de chargement en mode `server`.
- `criteriaFactory` : fonction qui crée les critères pour le backend.
- `exportDataLoader` : fonction de chargement pour les exports.
- `initialRows` : nombre de lignes par page au début.
- `service` : service utilisé pour certaines actions serveur.

## Outputs (Sorties)

- `onCreate` : demandé quand l’utilisateur clique sur nouveau.
- `onEdit` : envoyé avec la ligne à modifier.
- `onDelete` : envoyé avec la ligne à supprimer.
- `onDeleteSelected` : envoyé avec la sélection.

## Exemple réel

Dans `commande`, ce composant est utilisé en mode `server`.

Il reçoit `groupingConfig`, `gridService`, les colonnes serveur et les fonctions de chargement.

## Notes

- La méthode `refresh()` recharge les données en mode `server`.
- Le contenu d’une cellule peut être personnalisé avec un template `#customCell`.

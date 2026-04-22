# Nom du composant

`AppFileUploadComponent`

## Description simple

Ce composant permet de choisir un ou plusieurs fichiers.

Il garde la liste des fichiers et la transmet au parent.

## Comment l’utiliser

```html
<app-fileUpload
  [multiple]="true"
  [maxFileSize]="10000000"
  (selectFiles)="onFilesSelected($event)"
  [(ngModel)]="files" />
```

## Inputs (Entrées)

- `multiple` : autorise plusieurs fichiers.
- `maxFileSize` : taille maximale.
- `showUploadButton` : affiche le bouton upload de PrimeNG.
- `showCancelButton` : affiche le bouton annuler de PrimeNG.
- `isInvalid` : affiche un état invalide.
- `errorMessage` : message d’erreur.

## Outputs (Sorties)

- `selectFiles` : envoyé quand des fichiers sont sélectionnés.

## Exemple réel

Ce composant n’est pas utilisé directement dans `commande`.

## Notes

- Le composant implémente `ControlValueAccessor`.
- La valeur stockée est un tableau de `File`.

# Nom du composant

`DataGridCreateComponent`

## Description simple

Ce composant affiche une fenêtre de création.

Il réutilise `app-dialog-form` pour garder la même structure partout.

## Comment l’utiliser

```html
<app-data-grid-create
  [(visible)]="createDialog"
  title="commande.header"
  [saveDisabled]="false"
  (onSave)="save()">
  <ng-template #formContent>
    <!-- contenu du formulaire -->
  </ng-template>
</app-data-grid-create>
```

## Inputs (Entrées)

- `visible` : ouvre ou ferme la fenêtre.
- `title` : titre affiché en haut.
- `dialogWidth` : largeur de la fenêtre.
- `saveDisabled` : désactive le bouton d’action.

## Outputs (Sorties)

- `onSave` : envoyé quand l’utilisateur valide.
- `onCancel` : envoyé quand l’utilisateur ferme la fenêtre.

## Exemple réel

Dans `commande`, ce composant sert à ouvrir le formulaire de création d’une commande.

Le contenu réel du formulaire est projeté avec `#formContent`.

## Notes

- Le composant ne contient pas la logique métier.
- Il sert surtout de conteneur visuel pour un formulaire.

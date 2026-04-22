# Nom du composant

`DataGridEditComponent`

## Description simple

Ce composant affiche une fenêtre de modification.

Il reprend la même base que la création, mais pour mettre à jour un élément existant.

## Comment l’utiliser

```html
<app-data-grid-edit
  [(visible)]="editDialog"
  title="commande.header"
  [updateDisabled]="false"
  (onUpdate)="update()">
  <ng-template #formContent>
    <!-- contenu du formulaire -->
  </ng-template>
</app-data-grid-edit>
```

## Inputs (Entrées)

- `visible` : ouvre ou ferme la fenêtre.
- `title` : titre affiché dans la fenêtre.
- `dialogWidth` : largeur de la fenêtre.
- `updateDisabled` : désactive le bouton de mise à jour.

## Outputs (Sorties)

- `onUpdate` : envoyé quand l’utilisateur confirme.
- `onCancel` : envoyé quand la fenêtre est fermée.

## Exemple réel

Dans `commande`, ce composant ouvre le formulaire d’édition d’une commande déjà existante.

Le formulaire projeté contient aussi la table inline des `commandeItems`.

## Notes

- Le composant ne charge pas les données lui-même.
- Il attend qu’un parent lui donne l’élément à modifier.

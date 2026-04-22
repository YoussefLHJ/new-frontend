# Nom du composant

`AppDialogFormComponent`

## Description simple

Ce composant affiche une fenêtre de formulaire générique.

Il sert de base pour les fenêtres de création et de modification.

## Comment l’utiliser

```html
<app-dialog-form
  [(visible)]="visible"
  title="commande.header"
  [contentTpl]="formTpl"
  (onAction)="save()"
  (onCancel)="cancel()" />
```

## Inputs (Entrées)

- `visible` : ouvre ou ferme la fenêtre.
- `title` : titre affiché.
- `dialogWidth` : largeur de la fenêtre.
- `actionDisabled` : désactive le bouton principal.
- `showAction` : affiche ou cache le bouton principal.
- `cancelLabel` : texte du bouton annuler.
- `contentTpl` : template du contenu.

## Outputs (Sorties)

- `onAction` : envoyé quand l’utilisateur confirme.
- `onCancel` : envoyé quand la fenêtre est fermée.

## Exemple réel

Dans `commande`, ce composant est utilisé directement dans l’écran de vue avec `[showAction]="false"`.

Il est aussi utilisé indirectement via `app-data-grid-create` et `app-data-grid-edit`.

## Notes

- La visibilité se pilote avec `[(visible)]`.
- Le composant ferme aussi la fenêtre quand `hide()` est appelé.

# Nom du composant

`AppEditorComponent`

## Description simple

Ce composant affiche un éditeur de texte riche.

Il est utile pour écrire un contenu avec mise en forme.

## Comment l’utiliser

```html
<app-editor
  [model]="content"
  height="320px" />
```

## Inputs (Entrées)

- `model` : texte initial affiché dans l’éditeur.
- `height` : hauteur de l’éditeur.

## Outputs (Sorties)

- Pas de sortie personnalisée.

## Exemple réel

Ce composant n’est pas utilisé directement dans `commande`.

## Notes

- Le composant ne fournit pas de `ControlValueAccessor`.
- Il ne renvoie pas automatiquement les changements vers le parent.

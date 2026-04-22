# Nom du composant

`AppToggleComponent`

## Description simple

Ce composant affiche un interrupteur oui/non.

Il sert à gérer une valeur booléenne.

## Comment l’utiliser

```html
<app-toggle
  label="common.active"
  [(ngModel)]="item.active" />
```

## Inputs (Entrées)

- `id` : identifiant HTML.
- `label` : texte affiché à côté.
- `readonly` : empêche le changement.
- `hidden` : masque le composant.
- `disabled` : désactive le champ. Cette entrée vient de `CvaBase`.

## Outputs (Sorties)

- Pas de sortie personnalisée.
- Les changements passent par `ngModel`.

## Exemple réel

Ce composant n’est pas utilisé directement dans `commande`.

## Notes

- La valeur gérée est un booléen.

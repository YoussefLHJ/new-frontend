# Nom du composant

`AppInputNumberComponent`

## Description simple

Ce composant affiche un champ numérique.

Il est utile pour les montants, quantités et autres nombres.

## Comment l’utiliser

```html
<app-input-number
  [placeholder]="'commande.total'"
  [(ngModel)]="item.total" />
```

## Inputs (Entrées)

- `id` : identifiant HTML.
- `label` : texte affiché au-dessus.
- `placeholder` : texte dans le champ.
- `isInvalid` : état invalide.
- `errorMessage` : message d’erreur.
- `readonly` : met le champ en lecture seule.
- `hidden` : masque le composant.
- `showButtons` : affiche les boutons plus et moins.
- `disabled` : désactive le champ. Cette entrée vient de `CvaBase`.

## Outputs (Sorties)

- Pas de sortie personnalisée.
- Les changements passent par `ngModel`.

## Exemple réel

Dans `commande`, ce composant est utilisé pour `total`, `totalPayer`, `prix` et `quantite`.

## Notes

- La valeur peut être un nombre ou `null`.

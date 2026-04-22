# Nom du composant

`ActionMenuComponent`

## Description simple

Ce composant affiche un menu d’actions.

Il ouvre une liste d’options quand on clique sur le bouton.

## Comment l’utiliser

```html
<app-action-menu [actions]="menuActions" />
```

## Inputs (Entrées)

- `actions` : liste des actions PrimeNG `MenuItem`.

## Outputs (Sorties)

- Pas de sortie personnalisée.

## Exemple réel

Ce composant n’est pas utilisé directement dans `commande`.

Il peut servir quand une page a besoin d’un petit menu d’actions réutilisable.

## Notes

- Chaque action doit contenir sa logique dans `command`, `routerLink` ou une autre propriété PrimeNG.

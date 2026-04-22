# Nom du composant

`AppDatepickerComponent`

## Description simple

Ce composant affiche un champ de date.

Il accepte aussi une chaîne de caractères venant de l’API et la transforme en objet `Date`.

## Comment l’utiliser

```html
<app-datepicker
  [placeholder]="'commande.dateCommande'"
  [(ngModel)]="item.dateCommande" />
```

## Inputs (Entrées)

- `label` : texte affiché au-dessus du champ.
- `placeholder` : texte affiché dans le champ.
- `dateFormat` : format d’affichage.
- `showTime` : affiche aussi l’heure.
- `showSeconds` : affiche aussi les secondes.
- `appendTo` : emplacement du panneau calendrier.
- `disabled` : désactive le champ. Cette entrée vient de `CvaBase`.

## Outputs (Sorties)

- Pas de sortie personnalisée.
- Les changements passent par `ngModel` grâce au `ControlValueAccessor`.

## Exemple réel

Dans `commande`, ce composant est utilisé pour `dateCommande` dans les écrans de création, modification et lecture seule.

## Notes

- Le composant convertit une date texte reçue de l’API en objet `Date`.
- Il ne déclare pas d’input `id`.

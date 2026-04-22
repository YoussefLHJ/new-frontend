# Nom du composant

`AppInputComponent`

## Description simple

Ce composant affiche un champ texte simple.

Il est pensé pour être réutilisé dans plusieurs formulaires.

## Comment l’utiliser

```html
<app-input
  [placeholder]="'commande.code'"
  [(ngModel)]="item.code" />
```

## Inputs (Entrées)

- `id` : identifiant HTML.
- `label` : texte affiché au-dessus.
- `placeholder` : texte dans le champ.
- `required` : marque le champ comme obligatoire.
- `isInvalid` : état invalide.
- `errorMessage` : message d’erreur.
- `readonly` : met le champ en lecture seule.
- `hidden` : masque le composant.
- `disabled` : désactive le champ. Cette entrée vient de `CvaBase`.

## Outputs (Sorties)

- Pas de sortie personnalisée.
- Les changements passent par `ngModel`.

## Exemple réel

Dans `commande`, ce composant est utilisé pour `code`, `etatComande` et plusieurs champs de `commandeItem`.

## Notes

- Le composant utilise un `ControlValueAccessor`.

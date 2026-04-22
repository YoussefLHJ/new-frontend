# Nom du composant

`AppSelectComponent`

## Description simple

Ce composant affiche une liste déroulante simple.

Il permet de choisir une seule valeur.

## Comment l’utiliser

```html
<app-select
  [options]="options"
  optionLabel="libelle"
  [placeholder]="'common.choose'"
  [(ngModel)]="selectedValue" />
```

## Inputs (Entrées)

- `id` : identifiant HTML.
- `label` : texte affiché au-dessus.
- `placeholder` : texte affiché avant le choix.
- `options` : liste des options.
- `optionLabel` : champ affiché pour chaque option.
- `filter` : active la recherche dans la liste.
- `filterMatchMode` : mode de recherche.
- `showClear` : affiche le bouton pour vider la valeur.
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

Ce composant n’est pas utilisé directement dans `commande`.

## Notes

- Le composant utilise `appendTo="body"` dans son template.
- Si `readonly` est vrai, le sélecteur est désactivé.

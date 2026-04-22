# Nom du composant

`AppMultiSelectComponent`

## Description simple

Ce composant affiche une sélection multiple.

L’utilisateur peut choisir plusieurs valeurs dans une seule liste.

## Comment l’utiliser

```html
<app-multiSelect
  [options]="options"
  optionLabel="libelle"
  [(ngModel)]="selectedValues" />
```

## Inputs (Entrées)

- `options` : liste des options.
- `defaultLabel` : texte affiché quand rien n’est choisi.
- `optionLabel` : champ affiché pour chaque option.
- `appendTo` : endroit où ouvrir le panneau.
- `virtualScroll` : active le défilement virtuel.
- `itemSize` : taille d’une ligne pour le mode virtuel.
- `disabled` : désactive le champ. Cette entrée vient de `CvaBase`.

## Outputs (Sorties)

- Pas de sortie personnalisée.
- Les changements passent par `ngModel`.

## Exemple réel

Ce composant n’est pas utilisé directement dans `commande`.

## Notes

- `writeValue` transforme `null` en tableau vide.
- `itemSize` est prévu pour le virtual scroll.

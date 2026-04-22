# Nom du composant

`AppTextareaComponent`

## Description simple

Ce composant affiche une zone de texte sur plusieurs lignes.

Il est utile pour les descriptions et commentaires.

## Comment l’utiliser

```html
<app-textarea
  [placeholder]="'commandeItem.description'"
  [(ngModel)]="item.description" />
```

## Inputs (Entrées)

- `id` : identifiant HTML.
- `label` : texte affiché au-dessus.
- `placeholder` : texte affiché dans la zone.
- `required` : marque le champ comme obligatoire.
- `isInvalid` : état invalide.
- `errorMessage` : message d’erreur.
- `readonly` : met le champ en lecture seule.
- `hidden` : masque le composant.
- `rows` : nombre de lignes.
- `cols` : largeur de base.
- `autoResize` : agrandit automatiquement la zone.
- `disabled` : désactive le champ. Cette entrée vient de `CvaBase`.

## Outputs (Sorties)

- Pas de sortie personnalisée.
- Les changements passent par `ngModel`.

## Exemple réel

Dans `commande`, ce composant est utilisé pour `description`, `commentaireClient` et `commentaireVendeur` des `commandeItems`.

## Notes

- Le composant utilise un `ControlValueAccessor`.

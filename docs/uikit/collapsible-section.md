# Nom du composant

`AppCollapsibleSectionComponent`

## Description simple

Ce composant affiche une section que l’on peut ouvrir ou fermer.

Il est utile pour découper un grand formulaire en petits blocs.

## Comment l’utiliser

```html
<app-collapsible-section
  title="commande.header"
  subtitle="common.details"
  icon="pi-box"
  [(expanded)]="sectionOpen">
  <p>Contenu de la section</p>
</app-collapsible-section>
```

## Inputs (Entrées)

- `title` : titre de la section.
- `subtitle` : texte court sous le titre.
- `icon` : icône affichée à gauche.
- `expanded` : état ouvert ou fermé.

## Outputs (Sorties)

- Pas de sortie personnalisée.
- Le changement d’état passe par `[(expanded)]`.

## Exemple réel

Ce composant n’est pas utilisé directement dans `commande` pour le moment.

Il peut servir dans les formulaires longs pour cacher une partie du contenu.

## Notes

- Le contenu est projeté avec `ng-content`.
- Le clic sur l’en-tête inverse l’état ouvert ou fermé.

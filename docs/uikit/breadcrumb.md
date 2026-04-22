# Nom du composant

`AppBreadcrumbComponent`

## Description simple

Ce composant affiche le chemin de navigation de la page.

Il montre toujours l’accueil admin, puis les éléments intermédiaires, puis la page courante.

## Comment l’utiliser

```html
<app-breadcrumb labelKey="commande.header" />
```

Ou avec des étapes en plus :

```html
<app-breadcrumb
  labelKey="commande.header"
  [extraItems]="[{ label: 'Ventes', routerLink: '/app/admin/vente' }]" />
```

## Inputs (Entrées)

- `labelKey` : clé de traduction de la page courante.
- `extraItems` : éléments placés entre l’accueil et la page courante.

## Outputs (Sorties)

- Pas de sortie personnalisée.

## Exemple réel

Dans `commande`, ce composant est utilisé en haut de la liste avec `labelKey="commande.header"`.

Il ajoute automatiquement l’entrée d’accueil qui pointe vers `/app/admin`.

## Notes

- Le libellé est recalculé quand la langue change.
- L’icône d’accueil est fixe.

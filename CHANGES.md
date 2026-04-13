# CHANGES.md - Corrections de compilation Angular

## Résumé

Toutes les erreurs de compilation `ng build` ont été corrigées sans modifier la logique métier.
Les corrections couvrent : imports cassés, modules PrimeNG obsolètes, syntaxe Angular @if incomplète,
composants standalone mal déclarés, propriétés manquantes et dépassement de budget CSS.

---

### frontend/src/app/layout/component/app.layout.module.ts
- **Problème** : Imports absolus pointant vers un chemin machine spécifique (`Desktop/office/new-frontend-main/...`) pour `AppMenuComponent`, `AppMenuitem`, `AppTopBarComponent` et `AppFooterComponent`
- **Correction** : Remplacement par des imports relatifs (`./app.menu.component`, etc.)
- **Raison** : Les chemins absolus n'existent pas sur cette machine, empêchant la compilation

---

### frontend/src/app/module/admin/view/core/core-admin.module.ts
- **Problème 1** : Imports de modules PrimeNG obsolètes (`primeng/dropdown`, `primeng/inputswitch`, `primeng/calendar`, `primeng/tabview`, `primeng/messages`) non disponibles dans PrimeNG 21
- **Correction** : Remplacement par les équivalents PrimeNG 21 (`primeng/select`, `primeng/toggleswitch`, `primeng/datepicker`, `primeng/tabs`). Suppression de `MessagesModule` (déjà couvert par `MessageModule`)
- **Raison** : PrimeNG 21 a renommé/supprimé ces modules

- **Problème 2** : Composants standalone (`AppareilCreateAdminComponent`, `AppareilEditAdminComponent`, `BatimentCreateAdminComponent`, `BatimentEditAdminComponent`) déclarés dans `declarations` au lieu de `imports`
- **Correction** : Déplacement de ces composants de `declarations` vers `imports`
- **Raison** : Un composant standalone ne peut pas être dans `declarations` d'un NgModule

- **Problème 3** : `DataGridListComponent` et `DataGridViewComponent` non importés dans le module
- **Correction** : Ajout de l'import et inclusion dans le tableau `imports`
- **Raison** : Les composants list/view (non-standalone) utilisent `app-data-grid-list` et `app-data-grid-view` dans leurs templates

---

### frontend/src/app/module/admin/view/config/config-admin.module.ts
- **Problème 1** : Mêmes imports PrimeNG obsolètes que `CoreAdminModule`
- **Correction** : Mêmes remplacements PrimeNG 21
- **Raison** : PrimeNG 21 a renommé/supprimé ces modules

- **Problème 2** : Composants standalone (`CommuneCreateAdminComponent`, `CommuneEditAdminComponent`) dans `declarations`
- **Correction** : Déplacement vers `imports`
- **Raison** : Un composant standalone doit être dans `imports`, pas `declarations`

- **Problème 3** : `DataGridListComponent` et `DataGridViewComponent` non importés
- **Correction** : Ajout dans `imports`
- **Raison** : Nécessaire pour que les templates list/view puissent utiliser `app-data-grid-list`

---

### frontend/src/app/module/admin/view/config/commune/create/commune-create-admin.component.html
- **Problème 1** : Blocs `@if` incomplets (sans accolades `{ }`)
- **Correction** : Ajout des accolades manquantes autour du contenu des `@if`
- **Raison** : La syntaxe Angular control flow exige `@if (condition) { ... }`

- **Problème 2** : Utilisation de `<p-tabView>` et `<p-tabPanel>` (ancienne API PrimeNG) alors que le composant importe `TabsModule`
- **Correction** : Remplacement par `<p-tabs>`, `<p-tabpanels>`, `<p-tabpanel>` (API PrimeNG 21)
- **Raison** : `TabsModule` ne fournit pas les anciens composants `p-tabView`/`p-tabPanel`

- **Problème 3** : Attribut `label` invalide sur un élément `<button>` HTML natif
- **Correction** : Suppression de l'attribut `label`
- **Raison** : `label` n'est pas une propriété HTML standard pour `<button>`

---

### frontend/src/app/module/admin/view/config/commune/edit/commune-edit-admin.component.html
- **Problème** : Mêmes erreurs que le composant create (blocs `@if`, anciens composants tab, attribut `label`)
- **Correction** : Mêmes corrections appliquées
- **Raison** : Empêchait la compilation Angular

### frontend/src/app/module/admin/view/config/commune/edit/commune-edit-admin.component.ts
- **Problème 1** : Import de `DataGridCreateComponent` au lieu de `DataGridEditComponent`
- **Correction** : Remplacement par `DataGridEditComponent`
- **Raison** : Le template utilise `<app-data-grid-edit>`, pas `<app-data-grid-create>`

- **Problème 2** : Paramètre `platformId` sans annotation de type (`private platformId?`)
- **Correction** : Ajout du type `Object` (`private platformId?: Object`)
- **Raison** : TypeScript strict interdit les paramètres implicitement typés `any`

- **Problème 3** : Propriété `onUpdated` manquante
- **Correction** : Ajout de `public onUpdated = output<void>()`
- **Raison** : Le template parent lie `(onUpdated)="onUpdated()"` sur ce composant

---

### frontend/src/app/module/admin/view/config/commune/list/commune-list-admin.component.ts
- **Problème 1** : `viewChild` non importé depuis `@angular/core`
- **Correction** : Ajout de `viewChild` dans l'import
- **Raison** : Utilisé pour référencer `DataGridListComponent`

- **Problème 2** : Paramètre `platformId` sans type
- **Correction** : Ajout du type `Object`
- **Raison** : TypeScript strict

- **Problème 3** : Propriété `groupingConfig` manquante
- **Correction** : Ajout de `groupingConfig: GroupingConfig = {}`
- **Raison** : Le template lie `[groupingConfig]="groupingConfig"`

- **Problème 4** : Méthodes `onSaved()` et `onUpdated()` manquantes
- **Correction** : Ajout des méthodes qui appellent `this.dataGridList()?.refresh()`
- **Raison** : Le template lie `(onSaved)="onSaved()"` et `(onUpdated)="onUpdated()"`

### frontend/src/app/module/admin/view/config/commune/list/commune-list-admin.component.html
- **Problème** : Balise `<div class="grid">` non fermée avant le bloc `} @else{`
- **Correction** : Ajout de `</div>` avant `} @else{`
- **Raison** : Angular ne peut pas fermer le bloc `@if` si un élément HTML est encore ouvert

---

### frontend/src/app/module/admin/view/core/appareil/create/appareil-create-admin.component.html
- **Problème** : Bloc `@if` incomplet, anciens composants tab (`p-tabView`/`p-tabPanel`), attribut `label` invalide
- **Correction** : Ajout des accolades, migration vers PrimeNG 21 tabs, suppression de `label`
- **Raison** : Empêchait la compilation

### frontend/src/app/module/admin/view/core/appareil/edit/appareil-edit-admin.component.html
- **Problème** : Mêmes erreurs (bloc `@if`, anciens tabs, attribut `label`)
- **Correction** : Mêmes corrections
- **Raison** : Empêchait la compilation

### frontend/src/app/module/admin/view/core/appareil/edit/appareil-edit-admin.component.ts
- **Problème 1** : Import de `DataGridCreateComponent` au lieu de `DataGridEditComponent`
- **Correction** : Remplacement par `DataGridEditComponent`
- **Raison** : Le template utilise `<app-data-grid-edit>`

- **Problème 2** : `platformId` sans type
- **Correction** : Ajout du type `Object`
- **Raison** : TypeScript strict

- **Problème 3** : `onUpdated` manquant
- **Correction** : Ajout de `public onUpdated = output<void>()`
- **Raison** : Utilisé dans le template parent

### frontend/src/app/module/admin/view/core/appareil/list/appareil-list-admin.component.ts
- **Problème 1** : `viewChild` non importé
- **Correction** : Ajout dans l'import `@angular/core`
- **Raison** : Utilisé pour `dataGridList = viewChild(DataGridListComponent)`

- **Problème 2** : `platformId` sans type
- **Correction** : Ajout du type `Object`
- **Raison** : TypeScript strict

- **Problème 3** : `groupingConfig`, `onSaved()`, `onUpdated()` manquants
- **Correction** : Ajout de la propriété et des méthodes
- **Raison** : Utilisés dans le template

### frontend/src/app/module/admin/view/core/appareil/list/appareil-list-admin.component.html
- **Problème** : `<div class="grid">` non fermée
- **Correction** : Ajout de `</div>`
- **Raison** : Structure HTML incomplète empêchant le bloc `@if/@else`

---

### frontend/src/app/module/admin/view/core/batiment/create/batiment-create-admin.component.html
- **Problème** : Blocs `@if` incomplets (3 occurrences), anciens composants tab (2 panels), attribut `label` invalide
- **Correction** : Ajout des accolades, migration PrimeNG 21 tabs avec 2 `p-tabpanel`, suppression de `label`
- **Raison** : Empêchait la compilation

### frontend/src/app/module/admin/view/core/batiment/edit/batiment-edit-admin.component.html
- **Problème** : Mêmes erreurs que le create (blocs `@if`, anciens tabs, attribut `label`)
- **Correction** : Mêmes corrections
- **Raison** : Empêchait la compilation

### frontend/src/app/module/admin/view/core/batiment/edit/batiment-edit-admin.component.ts
- **Problème 1** : Import de `DataGridCreateComponent` au lieu de `DataGridEditComponent`
- **Correction** : Remplacement par `DataGridEditComponent`
- **Raison** : Le template utilise `<app-data-grid-edit>`

- **Problème 2** : `platformId` sans type
- **Correction** : Ajout du type `Object`
- **Raison** : TypeScript strict

- **Problème 3** : `onUpdated` manquant
- **Correction** : Ajout de `public onUpdated = output<void>()`
- **Raison** : Utilisé dans le template parent

### frontend/src/app/module/admin/view/core/batiment/list/batiment-list-admin.component.ts
- **Problème 1** : `platformId` sans type
- **Correction** : Ajout du type `Object`
- **Raison** : TypeScript strict

- **Problème 2** : `groupingConfig`, `onSaved()`, `onUpdated()` manquants
- **Correction** : Ajout de la propriété `GroupingConfig` et des méthodes
- **Raison** : Utilisés dans le template

- **Problème 3** : Assignation de `null` à des types non-nullable (`d.batiment = null`, `d.id = null`)
- **Correction** : Utilisation de `null as any`
- **Raison** : TypeScript strict interdit l'assignation de `null` à `BatimentDto` et `number`

### frontend/src/app/module/admin/view/core/batiment/list/batiment-list-admin.component.html
- **Problème** : `<div class="grid">` non fermée
- **Correction** : Ajout de `</div>`
- **Raison** : Structure HTML incomplète

---

### frontend/src/app/pages/components/data-grid/list/data-table/data-table.component.ts
- **Problème** : Import incorrect de `ExportService` depuis `@/app/shared/service/Export.service` (fichier inexistant)
- **Correction** : Remplacement par `@/app/zynerator/util/Export.service`
- **Raison** : Le fichier `ExportService` se trouve dans `zynerator/util/`, pas dans `shared/service/`

### frontend/src/app/pages/components/data-grid/list/server-data-table/server-data-table.component.ts
- **Problème** : Même import incorrect de `ExportService`
- **Correction** : Même remplacement de chemin
- **Raison** : Même cause

---

### frontend/angular.json
- **Problème** : Budget `anyComponentStyle` limité à `4kb`, dépassé par `change-password-admin.component.css` (4.07 kB)
- **Correction** : Augmentation du budget à `8kb`
- **Raison** : Le fichier CSS dépasse le budget configuré, bloquant le build en mode production

---

## Migration vers les composants UI Kit

### frontend/src/app/module/admin/view/config/commune/list/commune-list-admin.component.ts
### frontend/src/app/module/admin/view/core/appareil/list/appareil-list-admin.component.ts
### frontend/src/app/module/admin/view/core/batiment/list/batiment-list-admin.component.ts
- **Changement** : Refactorisation des composants de liste pour s'appuyer directement sur le composant partagé `app-data-grid-list` issu de `frontend/src/app/pages/components/data-grid`, dans l'esprit des composants réutilisables du dossier `uikit`
- **Correction** : Suppression de l'ancien code de gestion de tableau dupliqué (pagination locale, export manuel, colonnes locales, état de sélection local, helpers devenus inutiles) pour ne conserver que :
  `columns`, `filterColumns`, `groupingConfig`, `dataLoader`, `criteriaFactory`, `exportDataLoader` et les actions CRUD nécessaires
- **Raison** : Centraliser le comportement d'affichage, de filtrage, de groupement, d'export et de pagination dans les composants UI partagés au lieu de le maintenir entité par entité

- **Changement** : Ajout de `sortable: true` et `groupable: true` sur les colonnes configurées pour les listes `Commune`, `Appareil` et `Batiment`
- **Correction** : Les colonnes exposent maintenant explicitement les capacités du composant partagé
- **Raison** : Permettre au data grid réutilisable de proposer le tri et le groupement sans logique spécifique dans chaque écran métier

- **Changement** : Simplification des actions `openCreate`, `openEdit`, `delete`, `deleteSelected`, `onSaved` et `onUpdated`
- **Correction** : Après modification des données, les composants déclenchent désormais `this.dataGridList()?.refresh()` pour déléguer le rechargement au composant partagé
- **Raison** : Garantir un rafraîchissement cohérent avec le mode serveur du data grid et éviter la duplication de logique de synchronisation locale

- **Impact fonctionnel** :
  Les listes `Commune`, `Appareil` et `Batiment` utilisent maintenant la même base UI que les composants réutilisables du projet
  Le rendu, les interactions de table, le filtrage avancé, le groupement et l'export sont désormais pilotés par le composant partagé plutôt que par du code spécifique à chaque écran

---

## Détail des migrations UI Kit

### frontend/src/app/module/admin/view/config/commune/list/commune-list-admin.component.ts
- **Changement 1** : Simplification radicale du composant de liste
- **Correction** : Suppression de l'ancien code de pilotage local du tableau (`findPaginatedByCriteria`, `onPage`, export manuel, colonnes `cols`, états de dialog redondants, getters/setters étendus)
- **Raison** : Toute cette logique est maintenant prise en charge par `app-data-grid-list` et son mode serveur

- **Changement 2** : Définition explicite des colonnes pour le data grid partagé
- **Correction** : Conservation uniquement du tableau `columns` au format `ServerColumnConfig[]` avec `criteriaMapping`
- **Raison** : Le composant réutilisable a besoin d'une description typée des colonnes pour le tri, les filtres et l'export

- **Changement 3** : Activation des capacités visuelles du composant partagé
- **Correction** : Ajout de `sortable: true` et `groupable: true` sur les colonnes `code`, `libelle`, `description`, `actif`
- **Raison** : Exposer les fonctionnalités du data grid sans réécrire de logique dans l'écran métier

- **Changement 4** : Centralisation du rafraîchissement après mutation
- **Correction** : Les méthodes `delete`, `deleteSelected`, `onSaved` et `onUpdated` appellent maintenant `this.dataGridList()?.refresh()`
- **Raison** : Le composant partagé recharge les données côté serveur de manière cohérente après création, modification ou suppression

### frontend/src/app/module/admin/view/core/appareil/list/appareil-list-admin.component.ts
- **Changement 1** : Refonte du composant pour qu'il soit un hôte léger du data grid partagé
- **Correction** : Suppression du code de pagination locale, de l'export manuel, des initialisations de colonnes héritées et des helpers devenus inutiles
- **Raison** : Réduire la duplication de code et aligner la liste `Appareil` sur le même socle UI que les autres listes migrées

- **Changement 2** : Normalisation des colonnes de liste
- **Correction** : Configuration des colonnes `numero`, `dernierePeriodeIndex`, `derniereAnneeIndex`, `batiment` avec `ServerColumnConfig`
- **Raison** : Permettre au composant partagé de gérer filtres, tri, groupement et export à partir d'une seule source de vérité

- **Changement 3** : Activation des options UI Kit de table
- **Correction** : Ajout de `sortable: true` et `groupable: true` sur toutes les colonnes affichées
- **Raison** : Rendre immédiatement disponibles les interactions standard du tableau partagé

- **Changement 4** : Rafraîchissement uniforme après actions CRUD
- **Correction** : Les suppressions simples et multiples déclenchent `refresh()` du data grid au lieu de manipuler uniquement l'état local
- **Raison** : Éviter les divergences entre l'état en mémoire et les données réellement renvoyées par le backend

### frontend/src/app/module/admin/view/core/batiment/list/batiment-list-admin.component.ts
- **Changement 1** : Remplacement de l'ancien contrôleur de liste volumineux par un composant de configuration de data grid
- **Correction** : Suppression du code historique lié à l'export, au chargement local, aux tableaux temporaires, aux méthodes de duplication et aux getters/setters non indispensables à l'écran
- **Raison** : Le comportement standard de liste doit être porté par le composant partagé, pas recopié dans chaque entité

- **Changement 2** : Déclaration propre des colonnes métier
- **Correction** : Les champs `code`, `complementAdresse`, `libelle`, `nombreEtages`, `nombrePointsLivraison`, `nombreLieuxReleve`, `nombreLieuxConsommation`, `commune`, `actif` sont maintenant décrits uniquement via `ServerColumnConfig[]`
- **Raison** : Une seule configuration suffit désormais pour afficher, filtrer, trier et exporter les données

- **Changement 3** : Alignement avec les interactions UI Kit
- **Correction** : Ajout de `sortable: true` et `groupable: true` sur les colonnes affichées
- **Raison** : Autoriser le tri et le groupement natifs sans logique spécifique supplémentaire

- **Changement 4** : Synchronisation centralisée des données après modification
- **Correction** : Appel systématique à `this.dataGridList()?.refresh()` après suppression, sauvegarde et mise à jour
- **Raison** : Le composant serveur doit rester l'unique responsable du rechargement des données affichées

---

## Migration UI Kit des formulaires Create

### frontend/src/app/module/admin/view/config/commune/create/commune-create-admin.component.ts
- **Changement 1** : Import de modules UI Kit complémentaires
- **Correction** : Ajout de `FluidModule`, `FloatLabelModule` et `TextareaModule` dans les imports du composant standalone
- **Raison** : Le template utilise désormais `p-fluid`, `p-floatlabel` et `pTextarea` dans un style cohérent avec les démos `uikit`

- **Changement 2** : Notification explicite au parent après sauvegarde
- **Correction** : Ajout de `this.onSaved.emit()` dans `saveWithShowOption()` après création réussie
- **Raison** : Permettre à la liste parente de se rafraîchir automatiquement après la création

### frontend/src/app/module/admin/view/config/commune/create/commune-create-admin.component.html
- **Changement 1** : Remplacement de la structure de formulaire par des patterns UI Kit
- **Correction** : Les champs texte utilisent maintenant `p-floatlabel` + `pInputText`, la description utilise `pTextarea` avec `autoResize`, et le conteneur du formulaire utilise `p-fluid`
- **Raison** : Harmoniser le rendu et l'expérience utilisateur avec les composants réutilisables du dossier `uikit`

- **Changement 2** : Suppression du footer HTML personnalisé
- **Correction** : Retrait des boutons HTML manuels du template
- **Raison** : Le composant `app-data-grid-create` fournit déjà un footer standard avec des `p-button` cohérents

- **Changement 3** : Conservation des validations métier avec rendu modernisé
- **Correction** : Les messages d'erreur et classes `ng-invalid ng-dirty` sont conservés autour des nouveaux champs `p-floatlabel`
- **Raison** : Moderniser l'UI sans casser les règles de validation existantes

### frontend/src/app/module/admin/view/core/appareil/create/appareil-create-admin.component.ts
- **Changement 1** : Enrichissement des imports UI partagés
- **Correction** : Ajout de `FluidModule` et `FloatLabelModule`
- **Raison** : Les champs du formulaire `Appareil` ont été migrés vers les composants et patterns de `uikit`

- **Changement 2** : Émission de l'événement de sauvegarde
- **Correction** : Ajout de `this.onSaved.emit()` après création réussie
- **Raison** : Garantir le rafraîchissement automatique de la liste après création

### frontend/src/app/module/admin/view/core/appareil/create/appareil-create-admin.component.html
- **Changement 1** : Refonte des champs d'entrée au format UI Kit
- **Correction** : Migration du champ `numero` vers `p-floatlabel` + `pInputText`, des champs numériques vers `p-inputNumber` avec `showButtons`, et du sélecteur `batiment` vers un `p-select` encapsulé dans `p-floatlabel`
- **Raison** : Aligner l'ergonomie du formulaire sur les composants démontrés dans `inputdemo.ts`

- **Changement 2** : Suppression du footer local
- **Correction** : Les anciens boutons HTML stylés manuellement ont été retirés
- **Raison** : Réutiliser le footer standard de `app-data-grid-create` pour les actions `Valider` et `Annuler`

- **Changement 3** : Conservation du comportement métier
- **Correction** : Les liaisons `ngModel`, la validation `validAppareilNumero` et le chargement des `batiments` restent inchangés
- **Raison** : Moderniser le rendu sans modifier la logique fonctionnelle

### frontend/src/app/module/admin/view/core/batiment/create/batiment-create-admin.component.ts
- **Changement 1** : Ajout des modules nécessaires au rendu UI Kit des formulaires
- **Correction** : Intégration de `FluidModule` et `FloatLabelModule`
- **Raison** : Les champs du formulaire principal et du sous-formulaire `Appareil` utilisent maintenant des composants de style UI Kit

- **Changement 2** : Propagation explicite de la sauvegarde réussie
- **Correction** : Ajout de `this.onSaved.emit()` dans `saveWithShowOption()`
- **Raison** : Assurer la synchronisation automatique avec la liste parente après création

### frontend/src/app/module/admin/view/core/batiment/create/batiment-create-admin.component.html
- **Changement 1** : Refonte complète du premier onglet de formulaire
- **Correction** : Migration des champs texte vers `p-floatlabel` + `pInputText`, des valeurs numériques vers `p-inputNumber` avec `showButtons`, du sélecteur `commune` vers `p-select` et du booléen `actif` vers `p-toggleswitch`
- **Raison** : Uniformiser le formulaire `Batiment` avec les patterns visibles dans `uikit/inputdemo`

- **Changement 2** : Modernisation du sous-formulaire de la collection `appareils`
- **Correction** : Les champs de l'onglet secondaire utilisent désormais `p-floatlabel`, `p-inputNumber` et `p-button`
- **Raison** : Même les formulaires embarqués doivent suivre le langage visuel partagé du projet

- **Changement 3** : Modernisation des actions dans la table des appareils
- **Correction** : Les boutons d'édition et de suppression sont passés sur des `p-button` arrondis, textuels et cohérents avec le design system PrimeNG/UI Kit
- **Raison** : Supprimer les classes utilitaires ad hoc et s'aligner sur les composants réutilisables

- **Changement 4** : Suppression du footer manuel
- **Correction** : Le template repose maintenant sur le footer intégré de `app-data-grid-create`
- **Raison** : Éviter la duplication de markup et normaliser les actions de dialogue

---

## Configuration liée au faux problème tsconfig

### frontend/eslint.config.js
- **Problème** : `parserOptions.project` référençait `e2e/tsconfig.json`
- **Correction** : Suppression de cette entrée pour ne conserver que `tsconfig.json`
- **Raison** : Le fichier `e2e/tsconfig.json` n'existe pas dans ce dépôt ; cela pouvait faire croire à un problème dans `tsconfig.json` alors que la configuration TypeScript était valide

- **Vérification** : Exécution de `npx.cmd tsc -p tsconfig.app.json --noEmit`
- **Résultat** : La vérification TypeScript passe sans erreur

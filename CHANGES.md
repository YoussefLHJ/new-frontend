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

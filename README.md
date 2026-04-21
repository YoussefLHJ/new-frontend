# Guide d'utilisation des composants partagés

## 1. Introduction

Les **composants partagés** sont des composants Angular réutilisables qui permettent de construire rapidement des interfaces CRUD (Créer, Lire, Modifier, Supprimer).

**Pourquoi les utiliser ?**

- **Réutilisation** : un seul composant pour toutes les entités
- **Cohérence** : même apparence et comportement partout
- **Gain de temps** : pas besoin de recoder les listes, filtres, exports, etc.

---

## 2. Structure des composants

Les composants se trouvent dans :

```
src/app/pages/components/data-grid/
├── list/                        # Composant de liste (tableau)
│   ├── data-grid-list           # Point d'entrée (client ou serveur)
│   ├── data-table               # Tableau côté client
│   └── server-data-table        # Tableau côté serveur (paginé)
├── create/                      # Dialogue de création
├── edit/                        # Dialogue de modification
├── view/                        # Dialogue de consultation
├── shared/                      # Outils partagés
│   ├── filter-dialog            # Filtres avancés
│   ├── column-selector          # Sélection des colonnes
│   └── export-menu              # Export (Excel, CSV, PDF)
├── models/                      # Interfaces et types
└── services/                    # Services utilitaires
```

### Composants principaux

| Composant | Rôle |
|-----------|------|
| `DataGridListComponent` | Affiche un tableau avec pagination, filtres, tri et export |
| `DataGridCreateComponent` | Dialogue pour créer une nouvelle entité |
| `DataGridEditComponent` | Dialogue pour modifier une entité |
| `DataGridViewComponent` | Dialogue pour consulter une entité (lecture seule) |

---

## 3. Exemple avec "Appareil"

Le module **Appareil** (`src/app/module/admin/view/core/appareil/`) montre comment utiliser les composants partagés. C'est un bon exemple à suivre.

### 3.1 La liste (`appareil-list-admin`)

La liste utilise `app-data-grid-list` en mode **serveur** pour afficher les appareils avec pagination.

**Ce qu'il faut configurer :**

1. **Les colonnes** : quelles données afficher et comment les filtrer
2. **Le chargement des données** : quelle API appeler
3. **Les actions** : que faire quand l'utilisateur crée, modifie ou supprime

### 3.2 Création et modification

- `appareil-create-admin` utilise `app-data-grid-create` comme enveloppe de dialogue
- `appareil-edit-admin` utilise `app-data-grid-edit` de la même manière
- Le formulaire personnalisé est **projeté** à l'intérieur du dialogue

### 3.3 Consultation

La vue utilise `app-data-grid-view` directement dans le template de la liste. Ce composant affiche les données en lecture seule en se basant sur la configuration des colonnes.

---

## 4. Utilisation étape par étape

### Étape 1 : Importer les composants

```typescript
import {
  ServerColumnConfig,
  GroupingConfig,
  DataGridListComponent,
  DataGridCreateComponent,
  DataGridEditComponent,
  DataGridViewComponent
} from '@/app/pages/components/data-grid';
```

### Étape 2 : Configurer les colonnes

Chaque colonne décrit un champ de votre entité :

```typescript
columns: ServerColumnConfig[] = [
  {
    field: 'numero',              // nom du champ dans l'objet
    header: 'appareil.numero',    // clé de traduction pour l'en-tête
    type: 'text',                 // type : 'text', 'numeric', 'boolean', 'date', 'entity'
    sortable: true,
    criteriaMapping: {            // correspondance avec les champs du backend
      contains: 'numeroLike',
      equals: 'numero'
    }
  },
  {
    field: 'batiment',
    header: 'appareil.batiment',
    type: 'entity',               // pour les relations (objets liés)
    entityLabelField: 'libelle',  // quel champ afficher (par défaut : 'libelle')
    groupable: true,              // permet le regroupement
    criteriaMapping: {
      contains: 'batiment.libelleLike'
    }
  }
];
```

**Types disponibles :**

| Type | Usage | Exemple |
|------|-------|---------|
| `text` | Texte simple | nom, numéro |
| `numeric` | Nombre | index, quantité |
| `boolean` | Vrai/Faux | actif, validé |
| `date` | Date | dateCreation |
| `entity` | Relation vers une autre entité | batiment, categorie |

### Étape 3 : Configurer le chargement des données

```typescript
// Charger les données paginées (obligatoire en mode serveur)
dataLoader = (criteria: AppareilCriteria) =>
  this.service.findPaginatedByCriteria(criteria);

// Créer un objet critères vide (obligatoire en mode serveur)
criteriaFactory = () => new AppareilCriteria();

// Charger toutes les données pour l'export (optionnel)
exportDataLoader = (criteria: AppareilCriteria) =>
  this.service.findByCriteria(criteria);
```

### Étape 4 : Utiliser dans le HTML

```html
<app-data-grid-list
  mode="server"
  [columns]="columns"
  [dataLoader]="dataLoader"
  [criteriaFactory]="criteriaFactory"
  [exportDataLoader]="exportDataLoader"
  [groupingConfig]="groupingConfig"
  title="appareil.header"
  storageKey="appareil"
  exportFileName="Appareil"
  [globalFilterFields]="['numero', 'dernierePeriodeIndex']"
  (onCreate)="openCreate()"
  (onEdit)="openEdit($event)"
  (onDelete)="delete($event)"
  (onDeleteSelected)="deleteSelected($event)" />
```

### Étape 5 : Gérer les événements

```typescript
// Référence au composant pour le rafraîchir
dataGridList = viewChild(DataGridListComponent);

openCreate() {
  this.service.item = new AppareilDto();
  this.service.createDialog = true;
}

openEdit(dto: AppareilDto) {
  this.service.findByIdWithAssociatedList(dto).subscribe(res => {
    this.service.item = res;
    this.service.editDialog = true;
  });
}

delete(dto: AppareilDto) {
  this.confirmationService.confirm({
    message: 'Voulez-vous supprimer cet élément ?',
    accept: () => {
      this.service.delete(dto).subscribe(status => {
        if (status > 0) {
          this.dataGridList()?.refresh();   // Rafraîchir le tableau
        }
      });
    }
  });
}

// Après création ou modification réussie
onSaved() {
  this.dataGridList()?.refresh();
}
```

---

## 5. Exemples de code

### 5.1 Formulaire de création

**TypeScript :**

```typescript
@Component({
  selector: 'app-appareil-create-admin',
  standalone: true,
  imports: [DataGridCreateComponent, /* ... */],
  templateUrl: './appareil-create-admin.component.html'
})
export class AppareilCreateAdminComponent {
  onSaved = output<void>();

  get item(): AppareilDto { return this.service.item; }
  get createDialog(): boolean { return this.service.createDialog; }
  set createDialog(value: boolean) { this.service.createDialog = value; }

  save() {
    this.service.save().subscribe(item => {
      if (item != null) {
        this.createDialog = false;
        this.onSaved.emit();
      }
    });
  }
}
```

**HTML :**

```html
<app-data-grid-create
  [(visible)]="createDialog"
  title="appareil.tabPan"
  (onSave)="save()"
  (onCancel)="hideCreateDialog()">

  <!-- Votre formulaire personnalisé ici -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">

    <!-- Champ texte -->
    <div class="flex flex-col gap-2">
      <label for="create-numero">{{ 'appareil.numero' | translate }}</label>
      <input pInputText id="create-numero" [(ngModel)]="item.numero" />
    </div>

    <!-- Champ numérique -->
    <div class="flex flex-col gap-2">
      <label for="create-index">{{ 'appareil.dernierePeriodeIndex' | translate }}</label>
      <p-inputNumber id="create-index" [(ngModel)]="item.dernierePeriodeIndex" />
    </div>

    <!-- Sélection d'entité liée -->
    <div class="flex flex-col gap-2">
      <label for="create-batiment">{{ 'appareil.batiment' | translate }}</label>
      <p-select
        [options]="batiments"
        [(ngModel)]="item.batiment"
        optionLabel="libelle"
        [filter]="true"
        [showClear]="true" />
    </div>

  </div>
</app-data-grid-create>
```

### 5.2 Template complet de la liste

```html
<!-- Tableau -->
<app-data-grid-list
  mode="server"
  [columns]="columns"
  [dataLoader]="dataLoader"
  [criteriaFactory]="criteriaFactory"
  title="appareil.header"
  (onCreate)="openCreate()"
  (onEdit)="openEdit($event)"
  (onDelete)="delete($event)" />

<!-- Consultation -->
<app-data-grid-view
  [(visible)]="viewDialogVisible"
  [item]="viewItem"
  [columns]="columns"
  title="appareil.header" />

<!-- Création et modification -->
<app-appareil-create-admin (onSaved)="onSaved()" />
<app-appareil-edit-admin (onUpdated)="onUpdated()" />

<p-confirmDialog [style]="{width: '450px'}"></p-confirmDialog>
```

---

## 6. Bonnes pratiques

- **Réutiliser** les composants partagés. Ne pas recréer de tableau ou de dialogue personnalisé.
- **Ne pas modifier** la logique interne des composants partagés. Utiliser uniquement les `@Input` et `@Output` fournis.
- **Passer des configurations**, pas du code. Les colonnes, le chargement de données et le groupement se configurent via des objets simples.
- **Utiliser `criteriaMapping`** pour chaque colonne filtrable. C'est ce qui fait le lien entre le filtre UI et le backend.
- **Appeler `refresh()`** après chaque création, modification ou suppression pour mettre à jour le tableau.
- **Suivre le pattern Appareil** pour toute nouvelle entité : list, create, edit, view.

---

## 7. Conclusion

Les composants partagés offrent tout ce dont vous avez besoin pour créer des interfaces CRUD complètes :

- **Liste** avec pagination, filtres, tri, regroupement et export
- **Création / Modification** avec des dialogues configurables
- **Consultation** automatique basée sur les colonnes

Pour ajouter une nouvelle entité, il suffit de :

1. Définir les colonnes
2. Connecter le service API
3. Créer les formulaires de création/modification

Prenez le module **Appareil** comme modèle et adaptez-le à votre entité.

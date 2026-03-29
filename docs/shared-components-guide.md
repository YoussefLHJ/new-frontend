# Shared Data Grid Components - Developer Guide

## 1. Introduction

The shared data grid components in `src/app/shared/components/data-grid/` provide a complete, reusable toolkit for building CRUD list views with filtering, pagination, grouping, and export.

**What you get out of the box:**
- Server-side paginated data table with backend-driven filtering
- Client-side data table with in-memory filtering
- Advanced multi-condition filter dialog (AND/OR logic)
- Multi-column grouping with collapsible rows
- Column visibility selector (persisted to localStorage)
- Export to Excel, CSV, and PDF
- Quick-view detail dialog
- Global search (debounced)

**Why use them:**
- A full CRUD list view that used to take **562 lines** (see `lot-releve` v1) now takes **~130 lines** (see `new-releve`)
- Consistent UI/UX across all modules
- Backend filtering logic is handled declaratively through column configuration
- Zero manual `p-table`, paginator, or filter panel markup required

---

## 2. Prerequisites

### Required import in your NgModule

`ServerDataTableComponent` is a standalone component. Import it in your feature module:

```typescript
import { ServerDataTableComponent } from 'src/app/shared/components/data-grid';

@NgModule({
  imports: [
    // ... other imports
    ServerDataTableComponent
  ]
})
export class YourFeatureModule { }
```

### Dependencies (already installed in the project)

| Package | Purpose |
|---------|---------|
| `primeng` 21+ | Table, Dialog, Toolbar, Paginator, all form controls |
| `@ngx-translate/core` | Column header translation |
| `tailwindcss` 4+ | Layout and spacing utilities |

### Required backend service pattern

Your service must implement these two methods:

```typescript
findPaginatedByCriteria(criteria: YourCriteria): Observable<PaginatedList<YourDto>>
findByCriteria(criteria: YourCriteria): Observable<Array<YourDto>>
```

Where `PaginatedList<T>` has the shape `{ list: T[], dataSize: number }`.

---

## 3. Step-by-Step Usage

### Step 1: Define your model, criteria, and service

These typically already exist in `src/app/shared/`. Example from LotReleve:

**Model** (`src/app/shared/model/releve/LotReleve.model.ts`):
```typescript
export class LotReleveDto extends BaseDto {
    public numero: string;
    public code: string;
    public nbBatiments: null | number;
    public dateCreation: Date | null;
    public actif: null | boolean;
    public uniteReleve: UniteReleveDto | null;
    public batiments: Array<BatimentDto>;
    // ...
}
```

**Criteria** (`src/app/shared/criteria/releve/LotReleveCriteria.model.ts`):
```typescript
export class LotReleveCriteria extends BaseCriteria {
    public numero: string;
    public numeroLike: string;       // text "contains" filter
    public nbBatiments: number;
    public nbBatimentsMin: number;   // numeric "greaterThan" filter
    public nbBatimentsMax: number;   // numeric "lessThan" filter
    public dateCreation: Date;
    public dateCreationFrom: Date;   // date "greaterThan" filter
    public dateCreationTo: Date;     // date "lessThan" filter
    public actif: null | boolean;
    public uniteReleve: UniteReleveCriteria;
    // ...
}
```

**Service** (must have `findPaginatedByCriteria` and `findByCriteria`):
```typescript
@Injectable({ providedIn: 'root' })
export class LotReleveAdminService {
    findPaginatedByCriteria(criteria: LotReleveCriteria): Observable<PaginatedList<LotReleveDto>> {
        return this.http.post<PaginatedList<LotReleveDto>>(this.API + 'find-paginated-by-criteria', criteria);
    }
    findByCriteria(criteria: LotReleveCriteria): Observable<Array<LotReleveDto>> {
        return this.http.post<Array<LotReleveDto>>(this.API + 'find-by-criteria', criteria);
    }
    // ...
}
```

### Step 2: Define column configuration with criteria mapping

This is the core of the declarative approach. Each column maps its filter operators to the backend criteria field names.

```typescript
import { ServerColumnConfig } from '@/app/shared/components/data-grid';

columns: ServerColumnConfig[] = [
    {
        field: 'numero',                    // DTO property name
        header: 'lotReleve.numero',         // i18n translation key
        type: 'text',                       // controls filter operators & rendering
        sortable: true,
        groupable: true,                    // enables "Group by" for this column
        criteriaMapping: {                  // maps filter operators → criteria fields
            contains: 'numeroLike',
            equals: 'numero'
        }
    },
    {
        field: 'nbBatiments',
        header: 'lotReleve.nbBatiments',
        type: 'numeric',
        sortable: true,
        criteriaMapping: {
            equals: 'nbBatiments',
            greaterThan: 'nbBatimentsMin',
            lessThan: 'nbBatimentsMax'
        }
    },
    {
        field: 'dateCreation',
        header: 'lotReleve.dateCreation',
        type: 'date',
        sortable: true,
        dateFormat: 'dd/MM/yyyy HH:mm',    // display format in the table
        criteriaMapping: {
            equals: 'dateCreation',
            greaterThan: 'dateCreationFrom',
            lessThan: 'dateCreationTo'
        }
    },
    {
        field: 'uniteReleve',
        header: 'lotReleve.uniteReleve',
        type: 'entity',                     // renders as entity.libelle
        entityLabelField: 'libelle',        // which field to display
        sortable: true,
        criteriaMapping: {
            contains: 'uniteReleve.libelleLike',  // nested path supported
            equals: 'uniteReleve.libelle'
        }
    },
    {
        field: 'actif',
        header: 'lotReleve.actif',
        type: 'boolean',                    // renders as colored tag
        sortable: true,
        criteriaMapping: {
            equals: 'actif'
        }
    },
];
```

**Column type reference:**

| Type | Filter operators | Table rendering | Filter UI input |
|------|-----------------|-----------------|-----------------|
| `text` | contains, equals, startsWith, endsWith | Plain text | Text input |
| `numeric` | equals, greaterThan, lessThan | Plain number | Number input |
| `date` | equals, greaterThan, lessThan | Formatted date | Date picker |
| `boolean` | equals | Colored `<p-tag>` | Toggle switch |
| `entity` | contains, equals, startsWith, endsWith | `entity[labelField]` | Text input |

### Step 3: Create data-loading arrow functions

These **must** be arrow-function class properties (not methods) to avoid creating new function references on every change detection cycle.

```typescript
loadData = (criteria: LotReleveCriteria) =>
    this.service.findPaginatedByCriteria(criteria);

createCriteria = () => new LotReleveCriteria();

exportData = (criteria: LotReleveCriteria) =>
    this.service.findByCriteria(criteria);
```

### Step 4: Wire up the template

```html
<app-server-data-table
    [columns]="columns"
    [dataLoader]="loadData"
    [criteriaFactory]="createCriteria"
    [exportDataLoader]="exportData"
    [title]="'lotReleve.header'"
    [storageKey]="'new-releve'"
    [exportFileName]="'NewReleve'"
    [dataKey]="'id'"
    [globalFilterFields]="['numero', 'code']"
    (onCreate)="openCreate()"
    (onEdit)="edit($event)"
    (onDelete)="delete($event)"
    (onDeleteSelected)="deleteMultiple($event)" />
```

### Step 5: Implement action handlers

```typescript
@ViewChild(ServerDataTableComponent) serverTable!: ServerDataTableComponent;

private readonly service = inject(LotReleveAdminService);
private readonly messageService = inject(MessageService);
private readonly confirmationService = inject(ConfirmationService);

openCreate() {
    this.service.item = new LotReleveDto();
    this.service.createDialog = true;
}

edit(dto: LotReleveDto) {
    this.service.findByIdWithAssociatedList(dto).subscribe(res => {
        this.service.item = res;
        this.service.editDialog = true;
    });
}

delete(dto: LotReleveDto) {
    this.confirmationService.confirm({
        message: 'Voulez-vous supprimer cet element ?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.service.delete(dto).subscribe(status => {
                if (status > 0) {
                    this.messageService.add({
                        severity: 'success', summary: 'Succes',
                        detail: 'Element Supprime', life: 3000
                    });
                    this.serverTable.refresh(); // reload from backend
                }
            });
        }
    });
}
```

### Step 6: Register in module and routing

**Module** - declare the component and import `ServerDataTableComponent`:
```typescript
@NgModule({
  declarations: [
    NewReleveListAdminComponent,
    NewReleveCreateAdminComponent,
    NewReleveEditAdminComponent,
    NewReleveViewAdminComponent,
  ],
  imports: [
    CommonModule,
    // PrimeNG modules for create/edit/view dialogs...
    ServerDataTableComponent   // standalone component, goes in imports
  ]
})
```

**Routing** - add the list route with `AuthGuard`:
```typescript
{
    path: 'new-releve',
    children: [
        {
            path: 'list',
            component: NewReleveListAdminComponent,
            canActivate: [AuthGuard]
        }
    ]
}
```

---

## 4. Filtering System

### How backend-driven filtering works

The filtering system has three layers:

```
User interacts with FilterDialog
         |
         v
FilterDialog emits FilterGroup { logic: 'AND'|'OR', conditions: [...] }
         |
         v
CriteriaMapperService translates FilterGroup → backend Criteria object
  using criteriaMapping from each ServerColumnConfig
         |
         v
ServerDataTableComponent calls dataLoader(criteria) → HTTP POST to backend
```

**Example flow:**

1. User opens the filter dialog and adds two conditions:
   - `numero` **contains** `"ABC"`
   - `nbBatiments` **greaterThan** `5`

2. The dialog emits:
   ```json
   {
     "logic": "AND",
     "conditions": [
       { "field": "numero", "operator": "contains", "value": "ABC" },
       { "field": "nbBatiments", "operator": "greaterThan", "value": 5 }
     ]
   }
   ```

3. `CriteriaMapperService` looks up each condition's `criteriaMapping`:
   - `numero` + `contains` → maps to `numeroLike` on the criteria
   - `nbBatiments` + `greaterThan` → maps to `nbBatimentsMin` on the criteria

4. The resulting criteria object sent to the backend:
   ```json
   {
     "page": 0,
     "maxResults": 10,
     "numeroLike": "ABC",
     "nbBatimentsMin": 5
   }
   ```

### How criteria mapping works for each type

**Text fields** - your criteria model needs `fieldLike` for contains, `field` for equals:
```typescript
// Criteria model
public numero: string;
public numeroLike: string;

// Column config
criteriaMapping: { contains: 'numeroLike', equals: 'numero' }
```

**Numeric fields** - your criteria model needs `fieldMin`/`fieldMax` for range filters:
```typescript
// Criteria model
public nbBatiments: number;
public nbBatimentsMin: number;
public nbBatimentsMax: number;

// Column config
criteriaMapping: { equals: 'nbBatiments', greaterThan: 'nbBatimentsMin', lessThan: 'nbBatimentsMax' }
```

**Date fields** - same range pattern with `From`/`To` suffixes:
```typescript
// Criteria model
public dateCreation: Date;
public dateCreationFrom: Date;
public dateCreationTo: Date;

// Column config
criteriaMapping: { equals: 'dateCreation', greaterThan: 'dateCreationFrom', lessThan: 'dateCreationTo' }
```

**Entity fields** - use dot-notation for nested criteria paths:
```typescript
// Criteria model
public uniteReleve: UniteReleveCriteria;  // nested object

// Column config
criteriaMapping: { contains: 'uniteReleve.libelleLike', equals: 'uniteReleve.libelle' }
// CriteriaMapperService will set: criteria.uniteReleve.libelleLike = "value"
```

**Boolean fields** - single equality mapping:
```typescript
criteriaMapping: { equals: 'actif' }
```

### Standalone filter dialog usage (without ServerDataTableComponent)

You can use the filter dialog independently in any component. When you provide a `criteriaFactory`, it will emit a ready-to-use backend criteria object:

```html
<app-filter-dialog
    [(visible)]="filterDialogVisible"
    [columns]="serverColumns"
    [criteriaFactory]="createCriteria"
    (filtersApplied)="onFilterGroup($event)"
    (backendCriteriaApplied)="onBackendCriteria($event)" />
```

```typescript
createCriteria = () => new LotReleveCriteria();

onBackendCriteria(criteria: LotReleveCriteria) {
    // criteria already has filter values mapped — add pagination and call backend
    criteria.page = 0;
    criteria.maxResults = 25;
    this.service.findPaginatedByCriteria(criteria).subscribe(result => {
        this.items = result.list;
    });
}
```

### What changed from lot-releve (legacy) to new-releve

**lot-releve v1** (legacy, 562 lines) built everything manually:

```html
<!-- Manual filter panel — 80+ lines of form inputs bound directly to criteria -->
<div *ngIf="findByCriteriaShow" class="grid ...">
    <input pInputText [(ngModel)]="criteria.numeroLike">
    <p-inputNumber [(ngModel)]="criteria.nbBatimentsMin">
    <p-inputNumber [(ngModel)]="criteria.nbBatimentsMax">
    <!-- ...repeat for every single field... -->
</div>

<!-- Manual p-table — another 100+ lines -->
<p-table [value]="items" [paginator]="true" ...>
    <ng-template pTemplate="header"> ... </ng-template>
    <ng-template pTemplate="body" let-item> ... </ng-template>
</p-table>
```

```typescript
// 50+ getter/setter proxies for ServiceLocator pattern
get items(): Array<LotReleveDto> { return this.service.items; }
set items(value) { this.service.items = value; }
get item(): LotReleveDto { return this.service.item; }
// ...repeated for every property
```

**new-releve** (new approach, ~130 lines) is entirely declarative:

```html
<!-- Entire list view in ~30 lines of template -->
<app-server-data-table
    [columns]="columns"
    [dataLoader]="loadData"
    [criteriaFactory]="createCriteria"
    (onCreate)="openCreate()"
    (onEdit)="edit($event)"
    (onDelete)="delete($event)"
    (onDeleteSelected)="deleteMultiple($event)" />
```

| Aspect | lot-releve v1 | new-releve |
|--------|--------------|------------|
| List component lines | 562 | ~130 |
| Template lines | 200+ | 33 |
| Filter UI | Manual inputs per field | Declarative via column config |
| Filter logic | Manual criteria binding | Auto-mapped by CriteriaMapperService |
| Pagination | Manual paginator wiring | Built into ServerDataTableComponent |
| Export | Manual column mapping | Automatic from column config |
| DI pattern | ServiceLocator + 50 proxies | `inject()` function |
| Grouping | Not available | Built-in multi-column grouping |
| Column visibility | Not available | Built-in with localStorage |

---

## 5. Full Example: new-releve List Component

### TypeScript (`new-releve-list-admin.component.ts`)

```typescript
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LotReleveAdminService } from 'src/app/shared/service/admin/releve/LotReleveAdmin.service';
import { LotReleveDto } from 'src/app/shared/model/releve/LotReleve.model';
import { LotReleveCriteria } from 'src/app/shared/criteria/releve/LotReleveCriteria.model';
import { ServerColumnConfig } from '@/app/shared/components/data-grid';
import { ServerDataTableComponent } from '@/app/shared/components/data-grid';

@Component({
    selector: 'app-new-releve-list-admin',
    standalone: false,
    templateUrl: './new-releve-list-admin.component.html'
})
export class NewReleveListAdminComponent implements OnInit {

    @ViewChild(ServerDataTableComponent) serverTable!: ServerDataTableComponent;

    private readonly service = inject(LotReleveAdminService);
    private readonly messageService = inject(MessageService);
    private readonly confirmationService = inject(ConfirmationService);

    // ─── Column Configuration ──────────────────────────────────────────
    columns: ServerColumnConfig[] = [
        {
            field: 'numero', header: 'lotReleve.numero', type: 'text',
            sortable: true, groupable: true,
            criteriaMapping: { contains: 'numeroLike', equals: 'numero' }
        },
        {
            field: 'code', header: 'lotReleve.code', type: 'text',
            sortable: true,
            criteriaMapping: { contains: 'codeLike', equals: 'code' }
        },
        {
            field: 'nbBatiments', header: 'lotReleve.nbBatiments', type: 'numeric',
            sortable: true, groupable: true,
            criteriaMapping: { equals: 'nbBatiments', greaterThan: 'nbBatimentsMin', lessThan: 'nbBatimentsMax' }
        },
        {
            field: 'dateCreation', header: 'lotReleve.dateCreation', type: 'date',
            sortable: true, dateFormat: 'dd/MM/yyyy HH:mm',
            criteriaMapping: { equals: 'dateCreation', greaterThan: 'dateCreationFrom', lessThan: 'dateCreationTo' }
        },
        {
            field: 'uniteReleve', header: 'lotReleve.uniteReleve', type: 'entity',
            sortable: true, groupable: true, entityLabelField: 'libelle',
            criteriaMapping: { contains: 'uniteReleve.libelleLike', equals: 'uniteReleve.libelle' }
        },
        {
            field: 'actif', header: 'lotReleve.actif', type: 'boolean',
            sortable: true, groupable: true,
            criteriaMapping: { equals: 'actif' }
        },
    ];

    // ─── Data Loading (arrow functions) ────────────────────────────────
    loadData = (criteria: LotReleveCriteria) =>
        this.service.findPaginatedByCriteria(criteria);

    createCriteria = () => new LotReleveCriteria();

    exportData = (criteria: LotReleveCriteria) =>
        this.service.findByCriteria(criteria);

    ngOnInit() {}

    // ─── Actions ───────────────────────────────────────────────────────
    openCreate() {
        this.service.item = new LotReleveDto();
        this.service.createDialog = true;
    }

    edit(dto: LotReleveDto) {
        this.service.findByIdWithAssociatedList(dto).subscribe(res => {
            this.service.item = res;
            this.service.editDialog = true;
        });
    }

    delete(dto: LotReleveDto) {
        this.confirmationService.confirm({
            message: 'Voulez-vous supprimer cet element ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            rejectButtonProps: { label: 'Cancel', severity: 'secondary', outlined: true },
            acceptButtonProps: { label: 'Ok' },
            accept: () => {
                this.service.delete(dto).subscribe(status => {
                    if (status > 0) {
                        this.messageService.add({
                            severity: 'success', summary: 'Succes',
                            detail: 'Element Supprime', life: 3000
                        });
                        this.serverTable.refresh();
                    }
                });
            }
        });
    }

    deleteMultiple(selections: LotReleveDto[]) {
        this.confirmationService.confirm({
            message: 'Voulez-vous supprimer ces elements ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            rejectButtonProps: { label: 'Cancel', severity: 'secondary', outlined: true },
            acceptButtonProps: { label: 'Ok' },
            accept: () => {
                this.service.selections = selections;
                this.service.deleteMultiple().subscribe(() => {
                    this.messageService.add({
                        severity: 'success', summary: 'Succes',
                        detail: 'Les elements selectionnes ont ete supprimes', life: 3000
                    });
                    this.serverTable.refresh();
                });
            }
        });
    }

    // ─── Dialog State ──────────────────────────────────────────────────
    get createDialog(): boolean { return this.service.createDialog; }
    get editDialog(): boolean { return this.service.editDialog; }
    get viewDialog(): boolean { return this.service.viewDialog; }

    get createActionIsValid(): boolean { return this.service.createActionIsValid; }
    get editActionIsValid(): boolean { return this.service.editActionIsValid; }
    get listActionIsValid(): boolean { return this.service.listActionIsValid; }
    get viewActionIsValid(): boolean { return this.service.viewActionIsValid; }
}
```

### Template (`new-releve-list-admin.component.html`)

```html
@if (listActionIsValid) {
    <div class="grid">
        <div class="col-12">
            <p-toast />
            <div class="card">
                <app-server-data-table
                    [columns]="columns"
                    [dataLoader]="loadData"
                    [criteriaFactory]="createCriteria"
                    [exportDataLoader]="exportData"
                    [title]="'lotReleve.header'"
                    [storageKey]="'new-releve'"
                    [exportFileName]="'NewReleve'"
                    [dataKey]="'id'"
                    [globalFilterFields]="['numero', 'code']"
                    (onCreate)="openCreate()"
                    (onEdit)="edit($event)"
                    (onDelete)="delete($event)"
                    (onDeleteSelected)="deleteMultiple($event)" />
            </div>

            <app-new-releve-create-admin *ngIf="createDialog && createActionIsValid" />
            <app-new-releve-edit-admin *ngIf="editDialog && editActionIsValid" />
            <app-new-releve-view-admin *ngIf="viewDialog && viewActionIsValid" />
            <p-confirmDialog [style]="{ width: '450px' }" />
        </div>
    </div>
} @else {
    <p-card header="Permission not allowed">
        <p class="m-0">You don't have permission to access!</p>
    </p-card>
}
```

---

## 6. API Reference

### ServerDataTableComponent Inputs

| Input | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `columns` | `ServerColumnConfig[]` | Yes | `[]` | Column definitions with criteria mapping |
| `dataLoader` | `(criteria) => Observable<{list, dataSize}>` | **Yes** | - | Function to load paginated data |
| `criteriaFactory` | `() => any` | **Yes** | - | Function to create blank criteria |
| `exportDataLoader` | `(criteria) => Observable<any[]>` | No | - | Function for full export data |
| `title` | `string` | No | `''` | i18n key for table header |
| `storageKey` | `string` | No | `''` | Key for persisting column visibility |
| `exportFileName` | `string` | No | `'export'` | File name for exports |
| `dataKey` | `string` | No | `'id'` | Row identity field |
| `globalFilterFields` | `string[]` | No | `[]` | Fields for quick-search filtering |
| `groupOptions` | `GroupOption[]` | No | `[]` | Custom group options (overrides `groupable`) |
| `tableMinWidth` | `string` | No | `'60rem'` | Min width of the table |
| `emptyMessage` | `string` | No | `'common.noData'` | i18n key for empty state |
| `customCellFields` | `string[]` | No | `[]` | Fields using custom cell templates |
| `initialRows` | `number` | No | `10` | Initial rows per page |

### ServerDataTableComponent Outputs

| Output | Payload | Description |
|--------|---------|-------------|
| `onCreate` | `void` | Create button clicked |
| `onEdit` | `any` (row item) | Edit action on a row |
| `onDelete` | `any` (row item) | Delete action on a row |
| `onDeleteSelected` | `any[]` (selected items) | Bulk delete action |

### ServerDataTableComponent Methods

| Method | Description |
|--------|-------------|
| `refresh()` | Triggers a data reload from the backend. Call after create/edit/delete. |

### ServerColumnConfig Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `field` | `string` | Yes | DTO property name |
| `header` | `string` | Yes | i18n translation key for column header |
| `type` | `'text' \| 'numeric' \| 'boolean' \| 'date' \| 'entity'` | Yes | Controls rendering and filter operators |
| `criteriaMapping` | `Partial<Record<FilterOperator, string>>` | No | Maps filter operators to criteria field names |
| `sortable` | `boolean` | No | Enable column sorting |
| `groupable` | `boolean` | No | Enable "Group by" for this column |
| `visible` | `boolean` | No | Initial visibility (default: `true`) |
| `entityLabelField` | `string` | No | Property to display for entity type (default: `'libelle'`) |
| `dateFormat` | `string` | No | Angular date pipe format (default: `'dd/MM/yyyy'`) |
| `width` | `string` | No | Column width override |
| `booleanTrueLabel` | `string` | No | i18n key for true value (default: `'common.active'`) |
| `booleanFalseLabel` | `string` | No | i18n key for false value (default: `'common.inactive'`) |
| `booleanTrueSeverity` | `string` | No | PrimeNG tag severity for true (default: `'success'`) |
| `booleanFalseSeverity` | `string` | No | PrimeNG tag severity for false (default: `'danger'`) |

---

## 7. Best Practices

### Do

- **Use arrow functions** for `dataLoader`, `criteriaFactory`, and `exportDataLoader` — this preserves `this` context and avoids new references per change detection cycle.
- **Use `inject()`** for dependency injection instead of constructor + ServiceLocator.
- **Call `serverTable.refresh()`** after mutations (create, edit, delete) to reload from the backend.
- **Use unique `storageKey`** values per feature to avoid column visibility conflicts in localStorage.
- **Map all filterable fields** in `criteriaMapping` — if a criteria field exists on the backend, expose it.

### Don't

- **Don't define data loaders as methods.** `loadData(criteria) { ... }` creates a new reference on every CD cycle. Use `loadData = (criteria) => ...` instead.
- **Don't manually build filter UI.** The filter dialog handles all field types automatically from column config.
- **Don't mix client-side and server-side filtering.** Use `ServerDataTableComponent` for backend-paginated data and `DataTableComponent` for small in-memory datasets.
- **Don't forget `criteriaMapping`** on columns you want filterable — without it, the filter dialog will show the field but the condition will be silently ignored.
- **Don't modify shared components** for feature-specific needs. Use `customCellFields` + `customCell` template for custom rendering instead.

### Custom cell rendering

If a column needs special rendering (e.g., a progress bar, custom badge), use content projection:

```html
<app-server-data-table [columns]="columns" [customCellFields]="['status']" ...>
    <ng-template #customCell let-item let-col="column">
        @if (col.field === 'status') {
            <my-custom-status-badge [value]="item.status" />
        }
    </ng-template>
</app-server-data-table>
```

---

## 8. Integration Checklist

Use this checklist when building a new list view with shared components:

- [ ] **Model** exists in `src/app/shared/model/` (DTO class extending `BaseDto`)
- [ ] **Criteria** exists in `src/app/shared/criteria/` (criteria class extending `BaseCriteria` with `Like`, `Min`, `Max`, `From`, `To` variants for filterable fields)
- [ ] **Service** exists in `src/app/shared/service/` with `findPaginatedByCriteria()` and `findByCriteria()` methods
- [ ] **List component** created with:
  - [ ] `ServerColumnConfig[]` array with `criteriaMapping` for each filterable column
  - [ ] Arrow-function `dataLoader`, `criteriaFactory`, `exportDataLoader`
  - [ ] `@ViewChild(ServerDataTableComponent)` for calling `refresh()`
  - [ ] Action handlers: `openCreate()`, `edit()`, `delete()`, `deleteMultiple()`
- [ ] **Template** uses `<app-server-data-table>` with all required inputs/outputs
- [ ] **Create/Edit/View dialogs** conditionally rendered below the table
- [ ] **Module** updated:
  - [ ] Component declared in `declarations`
  - [ ] `ServerDataTableComponent` in `imports` (standalone component)
  - [ ] Component added to `exports`
- [ ] **Routing** updated with path and `AuthGuard`
- [ ] **Translation keys** added for column headers (`header` values)

---

## 9. Component Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│  Feature Component (e.g., NewReleveListAdminComponent)          │
│                                                                 │
│  columns: ServerColumnConfig[]     ← declarative config         │
│  loadData = (criteria) => ...      ← arrow function             │
│  createCriteria = () => ...        ← arrow function             │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  <app-server-data-table>                                  │  │
│  │                                                           │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │  DataGridToolbarComponent                           │  │  │
│  │  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌───────┐  │  │  │
│  │  │  │  Filter   │ │  Group   │ │ Columns  │ │Export │  │  │  │
│  │  │  │  Button   │ │ Selector │ │ Selector │ │ Menu  │  │  │  │
│  │  │  └─────┬────┘ └──────────┘ └──────────┘ └───────┘  │  │  │
│  │  │        │                                            │  │  │
│  │  │  ┌─────▼────────────────────┐                       │  │  │
│  │  │  │  FilterDialogComponent   │                       │  │  │
│  │  │  │  (multi-condition,       │                       │  │  │
│  │  │  │   AND/OR logic,          │                       │  │  │
│  │  │  │   type-aware inputs)     │                       │  │  │
│  │  │  └─────┬────────────────────┘                       │  │  │
│  │  └────────│────────────────────────────────────────────┘  │  │
│  │           │ emits FilterGroup                             │  │
│  │           ▼                                               │  │
│  │  CriteriaMapperService.buildCriteria()                    │  │
│  │           │ maps via criteriaMapping                      │  │
│  │           ▼                                               │  │
│  │  dataLoader(criteria) → HTTP POST → Backend               │  │
│  │           │                                               │  │
│  │           ▼                                               │  │
│  │  PrimeNG Table + Server Paginator                         │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  <app-*-create-admin />  ← conditional dialog                   │
│  <app-*-edit-admin />    ← conditional dialog                   │
│  <app-*-view-admin />    ← conditional dialog                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 10. File Reference

| File | Purpose |
|------|---------|
| `shared/components/data-grid/index.ts` | Barrel export — import everything from here |
| `shared/components/data-grid/models/data-grid.models.ts` | All TypeScript interfaces and type constants |
| `shared/components/data-grid/server-data-table/` | Server-side paginated table component |
| `shared/components/data-grid/data-table/` | Client-side in-memory table component |
| `shared/components/data-grid/filter-dialog/` | Advanced multi-condition filter dialog |
| `shared/components/data-grid/data-grid-toolbar/` | Toolbar orchestrating filter, group, columns, export |
| `shared/components/data-grid/services/criteria-mapper.service.ts` | FilterGroup → backend criteria translation |
| `shared/components/data-grid/services/data-grid-filter.service.ts` | Client-side in-memory filter evaluation |
| `shared/components/data-grid/export-menu/` | Excel/CSV/PDF export popover menu |
| `shared/components/data-grid/column-selector/` | Column visibility toggle with localStorage |
| `shared/components/data-grid/view-detail-dialog/` | Read-only quick-view dialog |

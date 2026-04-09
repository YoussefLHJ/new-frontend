import { Component, OnInit, ViewChild } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TreeTableModule } from 'primeng/treetable';
import { TreeTable } from 'primeng/treetable';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { CustomerService, Customer } from '@/app/pages/service/customer.service';
import { TreeNode } from 'primeng/api';

interface ColumnDefinition {
    field: string;
    header: string;
    sortable?: boolean;
    groupable?: boolean;
}

@Component({
    selector: 'app-my-table',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        TableModule,
        TreeTableModule,
        MultiSelectModule,
        SelectModule,
        ButtonModule,
        TagModule,
        InputTextModule,
        InputIconModule,
        IconFieldModule
    ],
    template: `
        <div class="card">
            <div class="font-semibold text-xl mb-4">Advanced Data Table</div>

            <!-- ── Toolbar ── -->
            <div class="flex flex-wrap gap-3 items-end mb-4 p-3 surface-100 border-round">

                <!-- Column Selection -->
                <div class="flex flex-column gap-1">
                    <label class="text-sm font-medium text-color-secondary">Visible Columns</label>
                    <p-multiselect
                        [options]="allColumns"
                        [(ngModel)]="selectedColumns"
                        optionLabel="header"
                        placeholder="Select Columns"
                        styleClass="w-15rem"
                        [maxSelectedLabels]="2"
                        selectedItemsLabel="{0} columns">
                    </p-multiselect>
                </div>

                <!-- Group By -->
                <div class="flex flex-column gap-1">
                    <label class="text-sm font-medium text-color-secondary">Group By</label>
                    <p-multiselect
                        [options]="groupableColumns"
                        [(ngModel)]="groupByFields"
                        optionLabel="header"
                        optionValue="field"
                        placeholder="No Grouping"
                        styleClass="w-15rem"
                        [maxSelectedLabels]="2"
                        selectedItemsLabel="{0} groups"
                        (onChange)="onGroupByChange()">
                    </p-multiselect>
                </div>

                <!-- Lines per page -->
                <div class="flex flex-column gap-1">
                    <label class="text-sm font-medium text-color-secondary">Rows per Page</label>
                    <p-select
                        [options]="pageSizeOptions"
                        [(ngModel)]="pageSize"
                        optionLabel="label"
                        optionValue="value"
                        styleClass="w-8rem"
                        (onChange)="onPageSizeChange()">
                    </p-select>
                </div>

                <!-- Reset -->
                <div class="flex flex-column gap-1">
                    <label class="text-sm font-medium text-color-secondary">&nbsp;</label>
                    <button pButton label="Reset" icon="pi pi-refresh"
                            class="p-button-outlined p-button-secondary"
                            (click)="resetAll()">
                    </button>
                </div>

                <!-- Global search (pushes right) -->
                <div class="flex flex-column gap-1 ml-auto">
                    <label class="text-sm font-medium text-color-secondary">Search</label>
                    <p-iconfield iconPosition="left">
                        <p-inputicon><i class="pi pi-search"></i></p-inputicon>
                        <input pInputText type="text"
                               [(ngModel)]="globalFilterValue"
                               (input)="onGlobalFilter($event)"
                               placeholder="Search…"
                               class="w-14rem" />
                    </p-iconfield>
                </div>
            </div>

            <!-- ── Active state summary ── -->
            <div class="flex gap-3 mb-3 text-sm text-color-secondary" *ngIf="groupByFields.length || sortField">
                <span *ngIf="groupByFields.length">
                    <i class="pi pi-th-large mr-1"></i>
                    Grouped by: <strong>{{ getGroupByLabels() }}</strong>
                </span>
                <span *ngIf="sortField">
                    <i class="pi pi-sort-alt mr-1"></i>
                    Sorted by: <strong>{{ getLabelForField(sortField) }}</strong>
                    ({{ sortOrder === 1 ? 'Ascending' : 'Descending' }})
                </span>
            </div>

            <!-- ── Table ── -->
            <p-treetable
                #dt
                [value]="treeCustomers"
                [columns]="cols"
                [paginator]="true"
                [rows]="pageSize"
                [rowsPerPageOptions]="[5, 10, 25, 50, 100]"
                [loading]="loading"
                [rowHover]="true"
                [showGridlines]="true"
                [sortField]="sortField"
                [sortOrder]="sortOrder"
                [sortMode]="sortMode"
                [scrollable]="true"
                [tableStyle]="{ 'min-width': '50rem' }"
                [globalFilterFields]="globalFilterFields"
                [filterMode]="'lenient'"
                styleClass="p-treetable-gridlines p-treetable-striped"
                (onSort)="onSort($event)">

                <!-- ── Column Headers ── -->
                <ng-template pTemplate="header" let-columns>
                    <tr>
                        <th *ngFor="let col of columns"
                            [pSortableColumn]="col.sortable !== false ? col.field : null"
                            style="min-width: 10rem">
                            <div class="flex justify-between items-center">
                                {{ col.header }}
                                <p-sortIcon [field]="col.field" *ngIf="col.sortable !== false"></p-sortIcon>
                            </div>
                        </th>
                    </tr>
                </ng-template>

                <!-- ── Body ── -->
                <ng-template pTemplate="body" let-rowNode let-rowData="rowData" let-columns="columns">
                    <tr [ttRow]="rowNode" [class]="rowNode.node.leaf ? '' : 'p-rowgroup-header'">
                        <td *ngFor="let col of columns; let i = index">
                            <ng-container *ngIf="col.field === 'tree'; else dataCol">
                                <div class="flex items-center gap-2">
                                    <p-treeTableToggler [rowNode]="rowNode"></p-treeTableToggler>
                                    <ng-container *ngIf="!rowNode.node.leaf; else leafName">
                                        <i class="pi pi-users text-primary"></i>
                                        <span class="font-bold">{{ rowData.groupKey }}</span>
                                        <span class="text-color-secondary text-sm ml-1">({{ rowData.count }} records)</span>
                                    </ng-container>
                                    <ng-template #leafName>
                                        <span>{{ rowData.name }}</span>
                                    </ng-template>
                                </div>
                            </ng-container>
                            <ng-template #dataCol>
                                <ng-container *ngIf="rowNode.node.leaf">
                                    <ng-container [ngSwitch]="col.field">

                                        <ng-container *ngSwitchCase="'status'">
                                            <p-tag
                                                [value]="rowData.status"
                                                [severity]="getSeverity(rowData.status)"
                                                styleClass="dark:bg-surface-900!">
                                            </p-tag>
                                        </ng-container>

                                        <ng-container *ngSwitchCase="'country'">
                                            <div class="flex items-center gap-2">
                                                <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png"
                                                     [class]="'flag flag-' + rowData.country.code"
                                                     width="24" />
                                                <span>{{ rowData.country.name }}</span>
                                            </div>
                                        </ng-container>

                                        <ng-container *ngSwitchCase="'representative'">
                                            <div class="flex items-center gap-2">
                                                <img [alt]="rowData.representative.name"
                                                     src="https://primefaces.org/cdn/primeng/images/demo/avatar/{{ rowData.representative.image }}"
                                                     width="28"
                                                     style="vertical-align: middle; border-radius: 50%;" />
                                                <span>{{ rowData.representative.name }}</span>
                                            </div>
                                        </ng-container>

                                        <ng-container *ngSwitchCase="'balance'">
                                            {{ rowData.balance | currency: 'USD' }}
                                        </ng-container>

                                        <ng-container *ngSwitchCase="'date'">
                                            {{ rowData.date }}
                                        </ng-container>

                                        <ng-container *ngSwitchDefault>
                                            {{ getNestedValue(rowData, col.field) }}
                                        </ng-container>

                                    </ng-container>
                                </ng-container>
                            </ng-template>
                        </td>
                    </tr>
                </ng-template>

                <!-- ── Empty ── -->
                <ng-template pTemplate="emptymessage" let-columns>
                    <tr>
                        <td [attr.colspan]="columns.length" class="text-center py-6">
                            <i class="pi pi-inbox text-4xl text-color-secondary mb-3" style="display:block"></i>
                            No records found.
                        </td>
                    </tr>
                </ng-template>

                <!-- ── Loading ── -->
                <ng-template pTemplate="loadingbody" let-columns>
                    <tr>
                        <td [attr.colspan]="columns.length" class="text-center py-6">
                            <i class="pi pi-spin pi-spinner text-2xl mr-2"></i>
                            Loading data…
                        </td>
                    </tr>
                </ng-template>

            </p-treetable>

            <!-- ── Footer summary ── -->
            <div class="flex justify-between items-center mt-2 text-sm text-color-secondary px-1">
                <span>Total records: <strong>{{ customers.length }}</strong></span>
                <span>Showing <strong>{{ pageSize }}</strong> rows per page</span>
            </div>
        </div>
    `,
    styles: `
        :host ::ng-deep .p-treetable .p-treetable-thead > tr > th {
            background: var(--surface-100);
            font-weight: 600;
        }

        :host ::ng-deep .p-treetable.p-treetable-striped .p-treetable-tbody > tr:nth-child(even) {
            background: var(--surface-50);
        }

        :host ::ng-deep .p-treetable-tbody > tr.p-rowgroup-header td {
            background: var(--primary-50) !important;
            border-left: 3px solid var(--primary-color) !important;
        }

        :host ::ng-deep .p-multiselect-label {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        :host ::ng-deep .p-paginator {
            border-top: 1px solid var(--surface-border);
        }
    `,
    providers: [CustomerService]
})
export class MyTable implements OnInit {

    @ViewChild('dt') dt?: TreeTable;

    // ── Data ──────────────────────────────────────────────────────────────────
    customers: Customer[] = [];
    treeCustomers: TreeNode[] = [];
    loading = true;

    // ── Column definitions ────────────────────────────────────────────────────
    allColumns: ColumnDefinition[] = [
        { field: 'name',           header: 'Name',           sortable: true,  groupable: true  },
        { field: 'country',        header: 'Country',        sortable: true,  groupable: true  },
        { field: 'representative', header: 'Representative', sortable: false, groupable: true  },
        { field: 'company',        header: 'Company',        sortable: true,  groupable: true  },
        { field: 'status',         header: 'Status',         sortable: true,  groupable: true  },
        { field: 'date',           header: 'Date',           sortable: true,  groupable: false },
        { field: 'balance',        header: 'Balance',        sortable: true,  groupable: false },
        { field: 'activity',       header: 'Activity',       sortable: true,  groupable: false }
    ];

    // Columns currently visible (default: first 5)
    selectedColumns: ColumnDefinition[] = [];

    get cols(): ColumnDefinition[] {
        return [
            { field: 'tree', header: 'Name', sortable: false, groupable: false },
            ...this.selectedColumns.filter(c => c.field !== 'name')
        ];
    }

    get groupableColumns(): ColumnDefinition[] {
        return this.allColumns.filter(c => c.groupable);
    }

    get sortableColumns(): ColumnDefinition[] {
        return this.allColumns.filter(c => c.sortable !== false);
    }

    // ── Group By ──────────────────────────────────────────────────────────────
    groupByFields: string[] = [];

    // ── Sort ──────────────────────────────────────────────────────────────────
    sortField: string = '';
    sortOrder: 1 | -1 = 1;
    sortMode: 'single' | 'multiple' = 'single';

    // ── Pagination / Line Limit ───────────────────────────────────────────────
    pageSize = 10;
    pageSizeOptions = [
        { label:  '5 rows',   value:  5  },
        { label: '10 rows',   value: 10  },
        { label: '25 rows',   value: 25  },
        { label: '50 rows',   value: 50  },
        { label: '100 rows',  value: 100 }
    ];

    // ── Global filter ─────────────────────────────────────────────────────────
    globalFilterValue = '';
    globalFilterFields = ['name', 'country.name', 'representative.name', 'company', 'status'];

    constructor(private customerService: CustomerService) {}

    ngOnInit(): void {
        // Default visible columns
        this.selectedColumns = this.allColumns.slice(0, 5);

        this.customerService.getCustomersLarge().then(data => {
            this.customers = data;
            this.buildTree();
            this.loading = false;
        });
    }

    // ── Event handlers ────────────────────────────────────────────────────────

    onGroupByChange(): void {
        this.buildTree();
    }

    onSort(event: any): void {
        this.sortField = event.field;
        this.sortOrder = event.order;
    }

    onPageSizeChange(): void {
        // p-treetable reacts to [rows] binding automatically
    }

    onGlobalFilter(event: Event): void {
        const value = (event.target as HTMLInputElement).value;
        this.globalFilterValue = value;
        if (this.dt) {
            this.dt.filterGlobal(value, 'contains');
        }
    }

    resetAll(): void {
        this.selectedColumns  = this.allColumns.slice(0, 5);
        this.groupByFields    = [];
        this.sortField        = '';
        this.sortOrder        = 1;
        this.pageSize         = 10;
        this.globalFilterValue = '';
        this.buildTree();
    }

    // ── Helpers ───────────────────────────────────────────────────────────────

    getGroupByLabels(): string {
        return this.groupByFields.map(f => this.getLabelForField(f)).join(', ');
    }

    /** Resolve a dot-notation field path on an object (e.g. 'country.name'). */
    getNestedValue(obj: any, field: string): any {
        return field.split('.').reduce((o, k) => (o ?? {})[k], obj);
    }

    /** Human-readable label for a field key. */
    getLabelForField(field: string): string {
        return this.allColumns.find(c => c.field === field)?.header ?? field;
    }

    getLabelForValue(field: string, val: any): string {
        if (val && typeof val === 'object') {
            return val.name ?? JSON.stringify(val);
        }
        return val ?? '(empty)';
    }

    buildTree() {
        this.treeCustomers = this.groupToTree(this.customers, this.groupByFields);
    }

    private groupToTree(data: Customer[], groups: string[], level: number = 0): TreeNode[] {
        if (level >= groups.length) {
            return data.map(item => ({
                data: item,
                children: [],
                leaf: true
            }));
        }

        const field = groups[level];
        const grouped = new Map<string, Customer[]>();

        for (const item of data) {
            const val = this.getNestedValue(item, field);
            const key = this.getLabelForValue(field, val);
            if (!grouped.has(key)) {
                grouped.set(key, []);
            }
            grouped.get(key)!.push(item);
        }

        const keys = Array.from(grouped.keys()).sort();
        const nodes: TreeNode[] = [];

        for (const key of keys) {
            const children = this.groupToTree(grouped.get(key)!, groups, level + 1);
            const count = children.reduce((sum, child) => sum + (child.leaf ? 1 : (child.data as any).count), 0);

            nodes.push({
                data: { groupKey: key, count },
                children,
                leaf: false
            });
        }

        return nodes;
    }

    getSeverity(status: string): 'success' | 'warn' | 'danger' | 'info' | 'secondary' | 'contrast' {
        switch (status?.toLowerCase()) {
            case 'qualified':    return 'success';
            case 'new':          return 'info';
            case 'negotiation':  return 'warn';
            case 'renewal':      return 'warn';
            case 'proposal':     return 'secondary';
            case 'unqualified':  return 'danger';
            default:             return 'info';
        }
    }
}2

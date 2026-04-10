import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ButtonGroupModule } from 'primeng/buttongroup';
import { SplitButtonModule } from 'primeng/splitbutton';

import { BaseButtonComponent } from './button/base-button/base-button.component';
import { SaveButtonComponent } from './button/save-button/save-button.component';
import { CancelButtonComponent } from './button/cancel-button/cancel-button.component';
import { DeleteButtonComponent } from './button/delete-button/delete-button.component';
import { ExportButtonComponent } from './button/export-button/export-button.component';
import { ImportButtonComponent } from './button/import-button/import-button.component';

/**
 * Button demo page. This file no longer hand-writes raw `p-button` markup;
 * instead it showcases the reusable button library living under
 * `./button/*`. Any screen in the app can import those same components
 * directly — this page is only an illustrative gallery.
 */
@Component({
    selector: 'app-button-demo',
    standalone: true,
    imports: [
        ButtonModule,
        ButtonGroupModule,
        SplitButtonModule,
        BaseButtonComponent,
        SaveButtonComponent,
        CancelButtonComponent,
        DeleteButtonComponent,
        ExportButtonComponent,
        ImportButtonComponent
    ],
    template: `
        <div class="flex flex-col md:flex-row gap-8">
            <div class="md:w-1/2">
                <div class="card flex flex-col gap-4">
                    <div class="font-semibold text-xl">Action Buttons (reusable)</div>
                    <div class="flex flex-wrap gap-2">
                        <app-save-button (clicked)="onSave()"></app-save-button>
                        <app-cancel-button (clicked)="onCancel()"></app-cancel-button>
                        <app-delete-button (clicked)="onDelete()"></app-delete-button>
                        <app-export-button format="excel" (exportRequested)="onExport($event)"></app-export-button>
                        <app-export-button format="pdf" (exportRequested)="onExport($event)"></app-export-button>
                        <app-import-button (filesSelected)="onImport($event)"></app-import-button>
                    </div>
                </div>

                <div class="card flex flex-col gap-4">
                    <div class="font-semibold text-xl">Base Button — Severities</div>
                    <div class="flex flex-wrap gap-2">
                        <app-base-button label="Primary"></app-base-button>
                        <app-base-button label="Secondary" severity="secondary"></app-base-button>
                        <app-base-button label="Success" severity="success"></app-base-button>
                        <app-base-button label="Info" severity="info"></app-base-button>
                        <app-base-button label="Warn" severity="warn"></app-base-button>
                        <app-base-button label="Help" severity="help"></app-base-button>
                        <app-base-button label="Danger" severity="danger"></app-base-button>
                        <app-base-button label="Contrast" severity="contrast"></app-base-button>
                    </div>
                </div>

                <div class="card flex flex-col gap-4">
                    <div class="font-semibold text-xl">Base Button — Outlined</div>
                    <div class="flex flex-wrap gap-2">
                        <app-base-button label="Primary" [outlined]="true"></app-base-button>
                        <app-base-button label="Success" severity="success" [outlined]="true"></app-base-button>
                        <app-base-button label="Danger" severity="danger" [outlined]="true"></app-base-button>
                        <app-base-button label="Info" severity="info" [outlined]="true"></app-base-button>
                    </div>
                </div>

                <div class="card flex flex-col gap-4">
                    <div class="font-semibold text-xl">Base Button — Text</div>
                    <div class="flex flex-wrap gap-2">
                        <app-base-button label="Primary" [text]="true"></app-base-button>
                        <app-base-button label="Success" severity="success" [text]="true"></app-base-button>
                        <app-base-button label="Danger" severity="danger" [text]="true"></app-base-button>
                    </div>
                </div>

                <div class="card flex flex-col gap-4">
                    <div class="font-semibold text-xl">Group</div>
                    <div class="flex flex-wrap gap-2">
                        <p-buttongroup>
                            <app-save-button></app-save-button>
                            <app-delete-button></app-delete-button>
                            <app-cancel-button></app-cancel-button>
                        </p-buttongroup>
                    </div>
                </div>

                <div class="card flex flex-col gap-4">
                    <div class="font-semibold text-xl">SplitButton (PrimeNG native)</div>
                    <div class="flex flex-wrap gap-2">
                        <p-splitbutton label="Save" [model]="items"></p-splitbutton>
                        <p-splitbutton label="Save" [model]="items" severity="success"></p-splitbutton>
                        <p-splitbutton label="Save" [model]="items" severity="danger"></p-splitbutton>
                    </div>
                </div>
            </div>

            <div class="md:w-1/2">
                <div class="card flex flex-col gap-4">
                    <div class="font-semibold text-xl">Icon Only</div>
                    <div class="flex flex-wrap gap-2">
                        <app-base-button icon="pi pi-bookmark" ariaLabel="Bookmark"></app-base-button>
                        <app-base-button label="Bookmark" icon="pi pi-bookmark"></app-base-button>
                        <app-base-button label="Bookmark" icon="pi pi-bookmark" iconPos="right"></app-base-button>
                    </div>
                </div>

                <div class="card flex flex-col gap-4">
                    <div class="font-semibold text-xl">Rounded</div>
                    <div class="flex flex-wrap gap-2">
                        <app-base-button label="Primary" [rounded]="true"></app-base-button>
                        <app-base-button label="Success" severity="success" [rounded]="true"></app-base-button>
                        <app-base-button label="Danger" severity="danger" [rounded]="true"></app-base-button>
                    </div>
                </div>

                <div class="card flex flex-col gap-4">
                    <div class="font-semibold text-xl">Raised</div>
                    <div class="flex flex-wrap gap-2">
                        <app-base-button label="Primary" [raised]="true"></app-base-button>
                        <app-base-button label="Secondary" severity="secondary" [raised]="true"></app-base-button>
                        <app-base-button label="Success" severity="success" [raised]="true"></app-base-button>
                        <app-base-button label="Danger" severity="danger" [raised]="true"></app-base-button>
                    </div>
                </div>

                <div class="card flex flex-col gap-4">
                    <div class="font-semibold text-xl">Rounded Icons</div>
                    <div class="flex flex-wrap gap-2">
                        <app-base-button icon="pi pi-check" [rounded]="true" ariaLabel="Check"></app-base-button>
                        <app-base-button icon="pi pi-search" severity="success" [rounded]="true" ariaLabel="Search"></app-base-button>
                        <app-base-button icon="pi pi-user" severity="info" [rounded]="true" ariaLabel="User"></app-base-button>
                        <app-base-button icon="pi pi-times" severity="danger" [rounded]="true" ariaLabel="Remove"></app-base-button>
                    </div>
                </div>

                <div class="card flex flex-col gap-4">
                    <div class="font-semibold text-xl">Loading</div>
                    <div class="flex flex-wrap gap-2">
                        <app-base-button label="Search" icon="pi pi-search" [loading]="loading[0]" (clicked)="load(0)"></app-base-button>
                        <app-base-button label="Search" icon="pi pi-search" iconPos="right" [loading]="loading[1]" (clicked)="load(1)"></app-base-button>
                        <app-base-button icon="pi pi-search" [loading]="loading[2]" (clicked)="load(2)" ariaLabel="Search"></app-base-button>
                        <app-save-button [loading]="loading[3]" (clicked)="load(3)"></app-save-button>
                    </div>
                </div>

                <div class="card flex flex-col gap-4">
                    <div class="font-semibold text-xl">Templating (content projection)</div>
                    <div class="flex flex-wrap gap-2">
                        <app-base-button>
                            <img alt="logo" src="https://primefaces.org/cdn/primeng/images/logo.svg" style="width: 1.5rem" />
                        </app-base-button>
                        <app-base-button [outlined]="true" severity="success">
                            <img alt="logo" src="https://primefaces.org/cdn/primeng/images/logo.svg" style="width: 1.5rem" />
                            <span class="text-bold">PrimeNG</span>
                        </app-base-button>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class ButtonDemo implements OnInit {
    items: MenuItem[] = [];
    loading = [false, false, false, false];

    ngOnInit() {
        this.items = [
            { label: 'Update', icon: 'pi pi-refresh' },
            { label: 'Delete', icon: 'pi pi-times' },
            { label: 'Angular.io', icon: 'pi pi-info', url: 'http://angular.io' },
            { separator: true },
            { label: 'Setup', icon: 'pi pi-cog' }
        ];
    }

    load(index: number) {
        this.loading[index] = true;
        setTimeout(() => (this.loading[index] = false), 1000);
    }

    onSave() {
        console.log('[demo] save clicked');
    }

    onCancel() {
        console.log('[demo] cancel clicked');
    }

    onDelete() {
        console.log('[demo] delete clicked');
    }

    onExport(format: string) {
        console.log('[demo] export requested as', format);
    }

    onImport(files: File[]) {
        console.log('[demo] imported files', files.map((f) => f.name));
    }
}

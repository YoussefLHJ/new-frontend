import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';

import { Product, ProductService } from '@/app/pages/service/product.service';

import { BaseButtonComponent } from './button/base-button/base-button.component';
import { SaveButtonComponent } from './button/save-button/save-button.component';
import { DeleteButtonComponent } from './button/delete-button/delete-button.component';
import { DialogComponent } from './overlay/dialog/dialog.component';
import { DrawerComponent } from './overlay/drawer/drawer.component';
import { PopoverComponent } from './overlay/popover/popover.component';
import { ConfirmPopupComponent } from './overlay/confirm-popup/confirm-popup.component';
import { ConfirmDialogComponent } from './overlay/confirm-dialog/confirm-dialog.component';
import { ToastNotifierComponent } from './message/toast-notifier/toast-notifier.component';

@Component({
    selector: 'app-overlay-demo',
    standalone: true,
    imports: [
        FormsModule,
        TableModule,
        TooltipModule,
        InputTextModule,
        BaseButtonComponent,
        SaveButtonComponent,
        DeleteButtonComponent,
        DialogComponent,
        DrawerComponent,
        PopoverComponent,
        ConfirmPopupComponent,
        ConfirmDialogComponent,
        ToastNotifierComponent
    ],
    template: `
        <app-toast-notifier></app-toast-notifier>

        <div class="flex flex-col md:flex-row gap-8">
            <div class="md:w-1/2">
                <div class="card">
                    <div class="font-semibold text-xl mb-4">Dialog</div>
                    <app-dialog header="Dialog" [(visible)]="display" [style]="{ width: '30vw' }">
                        <p class="leading-normal m-0">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>
                        <ng-container slot="footer">
                            <app-save-button (clicked)="display = false"></app-save-button>
                        </ng-container>
                    </app-dialog>
                    <app-base-button label="Show" (clicked)="display = true"></app-base-button>
                </div>

                <div class="card">
                    <div class="font-semibold text-xl mb-4">Popover</div>
                    <div class="flex flex-wrap gap-2">
                        <app-base-button label="Show" (clicked)="productsPopover.toggle($event)"></app-base-button>
                        <app-popover #productsPopover>
                            <p-table [value]="products" selectionMode="single" [(selection)]="selectedProduct" dataKey="id" [rows]="5" [paginator]="true" (onRowSelect)="onProductSelect($event)">
                                <ng-template #header>
                                    <tr>
                                        <th pSortableColumn="name" style="width: 33%;">Name <p-sortIcon field="name" /></th>
                                        <th style="width: 33%;">Image</th>
                                        <th pSortableColumn="price" style="width: 33%;">Price <p-sortIcon field="price" /></th>
                                    </tr>
                                </ng-template>
                                <ng-template #body let-product>
                                    <tr [pSelectableRow]="product">
                                        <td>{{ product.name }}</td>
                                        <td><img [src]="'/demo/images/product/' + product.image" [alt]="product.name" class="w-16 shadow-sm" /></td>
                                        <td>{{ product.price }}</td>
                                    </tr>
                                </ng-template>
                            </p-table>
                        </app-popover>
                    </div>
                </div>

                <div class="card">
                    <div class="font-semibold text-xl mb-4">Tooltip</div>
                    <div class="inline-flex gap-4">
                        <input pInputText type="text" placeholder="Username" pTooltip="Your username" />
                        <app-base-button label="Save" pTooltip="Click to proceed"></app-base-button>
                    </div>
                </div>
            </div>

            <div class="md:w-1/2">
                <div class="card">
                    <div class="font-semibold text-xl mb-4">Drawer</div>

                    <app-drawer [(visible)]="visibleLeft" header="Drawer" position="left">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </app-drawer>
                    <app-drawer [(visible)]="visibleRight" header="Drawer" position="right">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </app-drawer>
                    <app-drawer [(visible)]="visibleTop" header="Drawer" position="top">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </app-drawer>
                    <app-drawer [(visible)]="visibleBottom" header="Drawer" position="bottom">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </app-drawer>
                    <app-drawer [(visible)]="visibleFull" header="Drawer" position="full">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </app-drawer>

                    <div class="flex gap-2">
                        <app-base-button icon="pi pi-arrow-right" ariaLabel="Open left drawer" (clicked)="visibleLeft = true"></app-base-button>
                        <app-base-button icon="pi pi-arrow-left" ariaLabel="Open right drawer" (clicked)="visibleRight = true"></app-base-button>
                        <app-base-button icon="pi pi-arrow-down" ariaLabel="Open top drawer" (clicked)="visibleTop = true"></app-base-button>
                        <app-base-button icon="pi pi-arrow-up" ariaLabel="Open bottom drawer" (clicked)="visibleBottom = true"></app-base-button>
                        <app-base-button icon="pi pi-external-link" ariaLabel="Open full drawer" (clicked)="visibleFull = true"></app-base-button>
                    </div>
                </div>

                <div class="card">
                    <div class="font-semibold text-xl mb-4">ConfirmPopup</div>
                    <app-confirm-popup key="confirm2"></app-confirm-popup>
                    <app-base-button label="Confirm" icon="pi pi-check" (clicked)="confirm($event)"></app-base-button>
                </div>

                <div class="card">
                    <div class="font-semibold text-xl mb-4">ConfirmDialog</div>
                    <app-delete-button (clicked)="displayConfirmation = true"></app-delete-button>
                    <app-confirm-dialog
                        [(visible)]="displayConfirmation"
                        message="Are you sure you want to proceed?"
                        acceptLabel="Yes"
                        rejectLabel="No"
                        variant="danger"
                        (accepted)="onConfirmed()"
                        (rejected)="onRejected()"
                    ></app-confirm-dialog>
                </div>
            </div>
        </div>
    `,
    providers: [ConfirmationService, MessageService, ProductService]
})
export class OverlayDemo implements OnInit {
    display = false;
    displayConfirmation = false;

    visibleLeft = false;
    visibleRight = false;
    visibleTop = false;
    visibleBottom = false;
    visibleFull = false;

    products: Product[] = [];
    selectedProduct!: Product;

    @ViewChild('productsPopover') productsPopover?: PopoverComponent;

    constructor(
        private productService: ProductService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        this.productService.getProductsSmall().then((p) => (this.products = p));
    }

    confirm(event: Event) {
        this.confirmationService.confirm({
            key: 'confirm2',
            target: event.target || new EventTarget(),
            message: 'Are you sure that you want to proceed?',
            icon: 'pi pi-exclamation-triangle',
            rejectButtonProps: { label: 'Cancel', severity: 'secondary', outlined: true },
            acceptButtonProps: { label: 'Save' },
            accept: () => this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' }),
            reject: () => this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' })
        });
    }

    onProductSelect(event: any) {
        this.productsPopover?.hide();
        this.messageService.add({ severity: 'info', summary: 'Product Selected', detail: event?.data?.name, life: 3000 });
    }

    onConfirmed() {
        this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Action accepted' });
    }

    onRejected() {
        this.messageService.add({ severity: 'secondary', summary: 'Cancelled', detail: 'Action cancelled' });
    }
}

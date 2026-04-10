import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';

import { BaseButtonComponent } from './button/base-button/base-button.component';
import { TextInputComponent } from './input/text-input/text-input.component';
import { ToastNotifierComponent } from './message/toast-notifier/toast-notifier.component';
import { SuccessMessageComponent } from './message/success-message/success-message.component';
import { InfoMessageComponent } from './message/info-message/info-message.component';
import { WarningMessageComponent } from './message/warning-message/warning-message.component';
import { ErrorMessageComponent } from './message/error-message/error-message.component';
import { InlineMessageComponent } from './message/inline-message/inline-message.component';

@Component({
    selector: 'app-messages-demo',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        BaseButtonComponent,
        TextInputComponent,
        ToastNotifierComponent,
        SuccessMessageComponent,
        InfoMessageComponent,
        WarningMessageComponent,
        ErrorMessageComponent,
        InlineMessageComponent
    ],
    template: `
        <div class="flex flex-col md:flex-row gap-8">
            <div class="md:w-1/2">
                <div class="card">
                    <div class="font-semibold text-xl mb-4">Toast</div>
                    <div class="flex flex-wrap gap-2">
                        <app-base-button label="Success" severity="success" (clicked)="showToast('success')"></app-base-button>
                        <app-base-button label="Info" severity="info" (clicked)="showToast('info')"></app-base-button>
                        <app-base-button label="Warn" severity="warn" (clicked)="showToast('warn')"></app-base-button>
                        <app-base-button label="Error" severity="danger" (clicked)="showToast('error')"></app-base-button>
                        <app-toast-notifier></app-toast-notifier>
                    </div>

                    <div class="font-semibold text-xl mt-4 mb-4">Inline</div>
                    <div class="flex flex-col gap-3">
                        <div class="flex gap-1 items-start">
                            <app-text-input class="flex-1" [(ngModel)]="username" placeholder="Username"></app-text-input>
                            <app-error-message text="Username is required"></app-error-message>
                        </div>
                        <div class="flex gap-1 items-start">
                            <app-text-input class="flex-1" [(ngModel)]="email" placeholder="Email"></app-text-input>
                            <app-error-message icon="pi pi-times-circle"></app-error-message>
                        </div>
                    </div>
                </div>
            </div>

            <div class="md:w-1/2">
                <div class="card">
                    <div class="font-semibold text-xl mb-4">Message</div>
                    <div class="flex flex-col gap-4 mb-4">
                        <app-success-message text="Success Message"></app-success-message>
                        <app-info-message text="Info Message"></app-info-message>
                        <app-warning-message text="Warn Message"></app-warning-message>
                        <app-error-message text="Error Message"></app-error-message>
                        <app-inline-message severity="secondary" text="Secondary Message"></app-inline-message>
                        <app-inline-message severity="contrast" text="Contrast Message"></app-inline-message>
                    </div>
                </div>
            </div>
        </div>
    `,
    providers: [MessageService]
})
export class MessagesDemo {
    username?: string;
    email?: string;

    constructor(private service: MessageService) {}

    showToast(severity: 'success' | 'info' | 'warn' | 'error') {
        const copy = {
            success: { summary: 'Success Message', detail: 'Message sent' },
            info: { summary: 'Info Message', detail: 'PrimeNG rocks' },
            warn: { summary: 'Warn Message', detail: 'There are unsaved changes' },
            error: { summary: 'Error Message', detail: 'Validation failed' }
        };
        this.service.add({ severity, ...copy[severity] });
    }
}

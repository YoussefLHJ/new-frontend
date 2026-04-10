import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from '../dialog/dialog.component';
import { CancelButtonComponent } from '../../button/cancel-button/cancel-button.component';
import { DeleteButtonComponent } from '../../button/delete-button/delete-button.component';
import { SaveButtonComponent } from '../../button/save-button/save-button.component';

/**
 * Pre-built confirmation dialog. Renders a warning icon, a message and
 * accept/reject buttons. Use `variant="danger"` for destructive actions
 * (defaults to a red accept button).
 */
@Component({
    selector: 'app-confirm-dialog',
    standalone: true,
    imports: [CommonModule, DialogComponent, CancelButtonComponent, DeleteButtonComponent, SaveButtonComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <app-dialog
            [header]="header"
            [(visible)]="visible"
            [style]="{ width: '380px' }"
            (visibleChange)="visibleChange.emit($event)"
        >
            <div class="flex items-center justify-center gap-4 py-2">
                <i [class]="icon" style="font-size: 2rem"></i>
                <span>{{ message }}</span>
            </div>
            <ng-container slot="footer">
                <app-cancel-button [label]="rejectLabel" (clicked)="handleReject()"></app-cancel-button>
                <app-delete-button *ngIf="variant === 'danger'" [label]="acceptLabel" (clicked)="handleAccept()"></app-delete-button>
                <app-save-button *ngIf="variant !== 'danger'" [label]="acceptLabel" (clicked)="handleAccept()"></app-save-button>
            </ng-container>
        </app-dialog>
    `
})
export class ConfirmDialogComponent {
    @Input() visible = false;
    @Input() header = 'Confirmation';
    @Input() message = 'Are you sure you want to proceed?';
    @Input() icon = 'pi pi-exclamation-triangle';
    @Input() acceptLabel = 'Yes';
    @Input() rejectLabel = 'No';
    @Input() variant: 'default' | 'danger' = 'default';

    @Output() visibleChange = new EventEmitter<boolean>();
    @Output() accepted = new EventEmitter<void>();
    @Output() rejected = new EventEmitter<void>();

    handleAccept() {
        this.accepted.emit();
        this.close();
    }

    handleReject() {
        this.rejected.emit();
        this.close();
    }

    private close() {
        this.visible = false;
        this.visibleChange.emit(false);
    }
}

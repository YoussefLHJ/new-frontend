import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';

/**
 * Reusable modal dialog. Exposes two-way bound `[(visible)]`, typed
 * `closed`/`opened` outputs, and footer/header projection slots.
 *
 * Usage:
 *   <app-dialog [(visible)]="show" header="Details" [style]="{width:'30vw'}">
 *     main content
 *     <ng-container slot="footer">
 *       <app-save-button (clicked)="close()"></app-save-button>
 *     </ng-container>
 *   </app-dialog>
 */
@Component({
    selector: 'app-dialog',
    standalone: true,
    imports: [CommonModule, DialogModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <p-dialog
            [header]="header"
            [(visible)]="visible"
            [modal]="modal"
            [closable]="closable"
            [draggable]="draggable"
            [resizable]="resizable"
            [style]="style"
            [breakpoints]="breakpoints"
            [dismissableMask]="dismissableMask"
            (onShow)="opened.emit()"
            (onHide)="handleHide()"
            (visibleChange)="visibleChange.emit($event)"
        >
            <ng-content></ng-content>
            <ng-template #footer>
                <ng-content select="[slot=footer]"></ng-content>
            </ng-template>
        </p-dialog>
    `
})
export class DialogComponent {
    @Input() visible = false;
    @Input() header = '';
    @Input() modal = true;
    @Input() closable = true;
    @Input() draggable = false;
    @Input() resizable = false;
    @Input() dismissableMask = true;
    @Input() style: any = { width: '30vw' };
    @Input() breakpoints: any = { '960px': '75vw', '640px': '95vw' };

    @Output() visibleChange = new EventEmitter<boolean>();
    @Output() opened = new EventEmitter<void>();
    @Output() closed = new EventEmitter<void>();

    handleHide() {
        this.closed.emit();
    }
}

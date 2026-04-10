import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';

export type DrawerPosition = 'left' | 'right' | 'top' | 'bottom' | 'full';

@Component({
    selector: 'app-drawer',
    standalone: true,
    imports: [DrawerModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <p-drawer
            [(visible)]="visible"
            [position]="position"
            [header]="header"
            [modal]="modal"
            (visibleChange)="visibleChange.emit($event)"
            (onHide)="closed.emit()"
        >
            <ng-content></ng-content>
        </p-drawer>
    `
})
export class DrawerComponent {
    @Input() visible = false;
    @Input() position: DrawerPosition = 'left';
    @Input() header = '';
    @Input() modal = true;

    @Output() visibleChange = new EventEmitter<boolean>();
    @Output() closed = new EventEmitter<void>();
}

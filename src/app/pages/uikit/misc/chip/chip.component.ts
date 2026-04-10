import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ChipModule } from 'primeng/chip';

@Component({
    selector: 'app-chip',
    standalone: true,
    imports: [ChipModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `<p-chip [label]="label" [icon]="icon" [image]="image" [removable]="removable" [styleClass]="styleClass" (onRemove)="removed.emit()"></p-chip>`
})
export class ChipComponent {
    @Input() label = '';
    @Input() icon = '';
    @Input() image = '';
    @Input() removable = false;
    @Input() styleClass = '';

    @Output() removed = new EventEmitter<void>();
}

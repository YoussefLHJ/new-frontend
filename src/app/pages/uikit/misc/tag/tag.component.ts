import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TagModule } from 'primeng/tag';

export type TagSeverity = 'secondary' | 'success' | 'info' | 'warn' | 'danger' | 'contrast';

@Component({
    selector: 'app-tag',
    standalone: true,
    imports: [TagModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `<p-tag [value]="value" [severity]="severity" [icon]="icon" [rounded]="rounded" [styleClass]="styleClass"></p-tag>`
})
export class TagComponent {
    @Input() value = '';
    @Input() severity: TagSeverity | undefined = undefined;
    @Input() icon = '';
    @Input() rounded = false;
    @Input() styleClass = '';
}

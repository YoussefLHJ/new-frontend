import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { InlineMessageComponent } from '../inline-message/inline-message.component';

@Component({
    selector: 'app-warning-message',
    standalone: true,
    imports: [InlineMessageComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `<app-inline-message severity="warn" [text]="text"><ng-content></ng-content></app-inline-message>`
})
export class WarningMessageComponent {
    @Input() text = '';
}

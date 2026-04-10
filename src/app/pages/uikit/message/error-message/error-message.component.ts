import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { InlineMessageComponent } from '../inline-message/inline-message.component';

@Component({
    selector: 'app-error-message',
    standalone: true,
    imports: [InlineMessageComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `<app-inline-message severity="error" [text]="text" [icon]="icon"><ng-content></ng-content></app-inline-message>`
})
export class ErrorMessageComponent {
    @Input() text = '';
    @Input() icon = '';
}

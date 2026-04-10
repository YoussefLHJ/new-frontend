import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { InlineMessageComponent } from '../inline-message/inline-message.component';

@Component({
    selector: 'app-info-message',
    standalone: true,
    imports: [InlineMessageComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `<app-inline-message severity="info" [text]="text"><ng-content></ng-content></app-inline-message>`
})
export class InfoMessageComponent {
    @Input() text = '';
}

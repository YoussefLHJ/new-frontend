import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

@Component({
    selector: 'app-confirm-popup',
    standalone: true,
    imports: [ConfirmPopupModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `<p-confirmpopup [key]="key"></p-confirmpopup>`
})
export class ConfirmPopupComponent {
    @Input() key = 'confirm-popup';
}

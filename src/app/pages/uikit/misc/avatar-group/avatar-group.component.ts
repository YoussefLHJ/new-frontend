import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AvatarGroupModule } from 'primeng/avatargroup';

@Component({
    selector: 'app-avatar-group',
    standalone: true,
    imports: [AvatarGroupModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <p-avatargroup [styleClass]="styleClass">
            <ng-content></ng-content>
        </p-avatargroup>
    `
})
export class AvatarGroupComponent {
    @Input() styleClass = '';
}

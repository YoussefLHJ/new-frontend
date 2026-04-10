import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';

@Component({
    selector: 'app-avatar',
    standalone: true,
    imports: [AvatarModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `<p-avatar [image]="image" [label]="label" [icon]="icon" [size]="size" [shape]="shape" [style]="style" [styleClass]="styleClass"></p-avatar>`
})
export class AvatarComponent {
    @Input() image = '';
    @Input() label = '';
    @Input() icon = '';
    @Input() size: 'normal' | 'large' | 'xlarge' = 'normal';
    @Input() shape: 'square' | 'circle' = 'circle';
    @Input() style: any = null;
    @Input() styleClass = '';
}

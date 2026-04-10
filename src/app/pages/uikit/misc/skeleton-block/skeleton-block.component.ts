import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
    selector: 'app-skeleton-block',
    standalone: true,
    imports: [SkeletonModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `<p-skeleton [shape]="shape" [size]="size" [width]="width" [height]="height" [borderRadius]="borderRadius" [styleClass]="styleClass"></p-skeleton>`
})
export class SkeletonBlockComponent {
    @Input() shape: 'rectangle' | 'circle' = 'rectangle';
    @Input() size = '';
    @Input() width = '100%';
    @Input() height = '1rem';
    @Input() borderRadius = '';
    @Input() styleClass = '';
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';

/**
 * Reusable toolbar with three named projection slots: `start`, `center`,
 * and `end`. Works for any screen that needs a top action bar.
 */
@Component({
    selector: 'app-toolbar-bar',
    standalone: true,
    imports: [ToolbarModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <p-toolbar>
            <ng-template #start>
                <ng-content select="[slot=start]"></ng-content>
            </ng-template>
            <ng-template #center>
                <ng-content select="[slot=center]"></ng-content>
            </ng-template>
            <ng-template #end>
                <ng-content select="[slot=end]"></ng-content>
            </ng-template>
        </p-toolbar>
    `
})
export class ToolbarBarComponent {}

import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { StepperModule } from 'primeng/stepper';

export interface StepItem {
    value: number;
    label: string;
}

@Component({
    selector: 'app-step-list',
    standalone: true,
    imports: [StepperModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <p-stepper [value]="activeValue" (valueChange)="activeValueChange.emit($event)">
            <p-step-list>
                @for (s of steps; track s.value) {
                    <p-step [value]="s.value">{{ s.label }}</p-step>
                }
            </p-step-list>
        </p-stepper>
    `
})
export class StepListComponent {
    @Input() steps: StepItem[] = [];
    @Input() activeValue: number = 1;
    @Output() activeValueChange = new EventEmitter<number>();
}

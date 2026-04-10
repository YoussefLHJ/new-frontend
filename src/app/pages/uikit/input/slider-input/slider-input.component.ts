import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SliderModule } from 'primeng/slider';

@Component({
    selector: 'app-slider-input',
    standalone: true,
    imports: [CommonModule, FormsModule, SliderModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SliderInputComponent), multi: true }],
    template: `
        <div class="flex flex-col gap-1 w-full">
            <label *ngIf="label" class="text-sm font-medium">{{ label }}</label>
            <p-slider [ngModel]="value" (ngModelChange)="update($event)" [min]="min" [max]="max" [step]="step" [disabled]="disabled"></p-slider>
        </div>
    `
})
export class SliderInputComponent implements ControlValueAccessor {
    @Input() label = '';
    @Input() min = 0;
    @Input() max = 100;
    @Input() step = 1;

    @Output() valueChange = new EventEmitter<number>();

    value = 0;
    disabled = false;

    private onChange: (v: number) => void = () => {};
    private onTouched: () => void = () => {};

    writeValue(v: number) { this.value = v ?? 0; }
    registerOnChange(fn: any) { this.onChange = fn; }
    registerOnTouched(fn: any) { this.onTouched = fn; }
    setDisabledState(d: boolean) { this.disabled = d; }

    update(v: number) {
        this.value = v;
        this.onChange(v);
        this.valueChange.emit(v);
    }
}

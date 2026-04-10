import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
    selector: 'app-number-input',
    standalone: true,
    imports: [CommonModule, FormsModule, InputNumberModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NumberInputComponent), multi: true }],
    template: `
        <div class="flex flex-col gap-1 w-full">
            <label *ngIf="label" class="text-sm font-medium">{{ label }}</label>
            <p-inputnumber
                [ngModel]="value"
                (ngModelChange)="update($event)"
                [mode]="mode"
                [showButtons]="showButtons"
                [min]="min"
                [max]="max"
                [step]="step"
                [disabled]="disabled"
                [placeholder]="placeholder"
                [currency]="currency"
                [locale]="locale"
                [minFractionDigits]="minFractionDigits"
                [maxFractionDigits]="maxFractionDigits"
            ></p-inputnumber>
        </div>
    `
})
export class NumberInputComponent implements ControlValueAccessor {
    @Input() label = '';
    @Input() placeholder = '';
    @Input() mode: 'decimal' | 'currency' = 'decimal';
    @Input() showButtons = false;
    @Input() min?: number;
    @Input() max?: number;
    @Input() step = 1;
    @Input() currency?: string;
    @Input() locale?: string;
    @Input() minFractionDigits?: number;
    @Input() maxFractionDigits?: number;

    @Output() valueChange = new EventEmitter<number | null>();

    value: number | null = null;
    disabled = false;

    private onChange: (v: number | null) => void = () => {};
    private onTouched: () => void = () => {};

    writeValue(v: number | null) { this.value = v; }
    registerOnChange(fn: any) { this.onChange = fn; }
    registerOnTouched(fn: any) { this.onTouched = fn; }
    setDisabledState(d: boolean) { this.disabled = d; }

    update(v: number | null) {
        this.value = v;
        this.onChange(v);
        this.valueChange.emit(v);
    }
}

import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-input',
    standalone: true,
    imports: [FormsModule, InputTextModule, NgClass],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => AppInputComponent),
        multi: true
    }],
    template: `
        @if (!hidden) {
            <div class="flex flex-col gap-2">
                <input
                    pInputText
                    [id]="id"
                    [placeholder]="placeholder || label + (required ? ' *' : '')"
                    [ngModel]="value"
                    (ngModelChange)="onValueChange($event)"
                    [readOnly]="readonly"
                    [disabled]="disabled"
                    class="w-full"
                    [ngClass]="{ 'ng-invalid ng-dirty': isInvalid }"
                />
                @if (isInvalid && errorMessage) {
                    <small class="text-red-500">{{ errorMessage }}</small>
                }
            </div>
        }
    `
})
export class AppInputComponent implements ControlValueAccessor {
    @Input() id = '';
    @Input() label = '';
    @Input() placeholder = '';
    @Input() required = false;
    @Input() isInvalid = false;
    @Input() errorMessage = '';
    @Input() readonly = false;
    @Input() hidden = false;
    @Input() disabled = false;

    value: any = '';

    private onChange: (val: any) => void = () => {};
    private onTouched: () => void = () => {};

    writeValue(val: any): void { this.value = val; }
    registerOnChange(fn: any): void { this.onChange = fn; }
    registerOnTouched(fn: any): void { this.onTouched = fn; }
    setDisabledState(isDisabled: boolean): void { this.disabled = isDisabled; }

    onValueChange(val: any): void {
        this.value = val;
        this.onChange(val);
        this.onTouched();
    }
}
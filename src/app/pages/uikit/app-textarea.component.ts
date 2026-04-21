import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { TextareaModule } from 'primeng/textarea';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-textarea',
    standalone: true,
    imports: [FormsModule, TextareaModule, NgClass],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => AppTextareaComponent),
        multi: true
    }],
    template: `
        @if (!hidden) {
            <div class="flex flex-col gap-2">
                <textarea
                    pTextarea
                    [id]="id"
                    [placeholder]="placeholder || label + (required ? ' *' : '')"
                    [rows]="rows"
                    [cols]="cols"
                    [autoResize]="autoResize"
                    [ngModel]="value"
                    (ngModelChange)="onValueChange($event)"
                    [readOnly]="readonly"
                    [disabled]="disabled"
                    class="w-full"
                    [ngClass]="{ 'ng-invalid ng-dirty': isInvalid }"
                ></textarea>
                @if (isInvalid && errorMessage) {
                    <small class="text-red-500">{{ errorMessage }}</small>
                }
            </div>
        }
    `
})
export class AppTextareaComponent implements ControlValueAccessor {
    @Input() id = '';
    @Input() label = '';
    @Input() placeholder = '';
    @Input() required = false;
    @Input() isInvalid = false;
    @Input() errorMessage = '';
    @Input() readonly = false;
    @Input() hidden = false;
    @Input() disabled = false;
    @Input() rows = 5;
    @Input() cols = 30;
    @Input() autoResize = true;

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

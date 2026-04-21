import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
    selector: 'app-input-number',
    standalone: true,
    imports: [FormsModule, InputNumberModule],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => AppInputNumberComponent),
        multi: true
    }],
    template: `
        @if (!hidden) {
            <div class="flex flex-col gap-2">
                <p-inputnumber
                    [inputId]="id"
                    [placeholder]="placeholder || label"
                    [ngModel]="value"
                    (ngModelChange)="onValueChange($event)"
                    [showButtons]="showButtons"
                    [disabled]="disabled"
                    [readonly]="readonly"
                    styleClass="w-full"
                />
                @if (isInvalid && errorMessage) {
                    <small class="text-red-500">{{ errorMessage }}</small>
                }
            </div>
        }
    `
})
export class AppInputNumberComponent implements ControlValueAccessor {
    @Input() id = '';
    @Input() label = '';
    @Input() placeholder = '';
    @Input() isInvalid = false;
    @Input() errorMessage = '';
    @Input() readonly = false;
    @Input() hidden = false;
    @Input() disabled = false;
    @Input() showButtons = false;

    value: any = null;

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
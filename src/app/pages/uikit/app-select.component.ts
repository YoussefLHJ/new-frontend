import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';


@Component({
    selector: 'app-select',
    standalone: true,
    imports: [FormsModule, SelectModule],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => AppSelectComponent),
        multi: true
    }],
    template: `
        @if (!hidden) {
            <div class="flex flex-col gap-2">
                <p-select
                    [inputId]="id"
                    [placeholder]="placeholder || label"
                    [ngModel]="value"
                    (ngModelChange)="onValueChange($event)"
                    [options]="options"
                    [optionLabel]="optionLabel"
                    [filter]="filter"
                    [filterMatchMode]="filterMatchMode"
                    [showClear]="showClear"
                    [disabled]="disabled || readonly"
                    appendTo="body"
                    Class="w-full"
                />
                @if (isInvalid && errorMessage) {
                    <small class="text-red-500">{{ errorMessage }}</small>
                }
            </div>
        }
    `
})
export class AppSelectComponent implements ControlValueAccessor {
    @Input() id = '';
    @Input() label = '';
    @Input() placeholder = '';
    @Input() options: any[] = [];
    @Input() optionLabel = 'libelle';
    @Input() filter = true;
    @Input() filterMatchMode: 'contains' | 'startsWith' | 'endsWith' | 'equals' | 'notEquals' | 'in' | 'lt' | 'lte' | 'gt' | 'gte' = 'contains';
    @Input() showClear = true;
    @Input() isInvalid = false;
    @Input() errorMessage = '';
    @Input() readonly = false;
    @Input() hidden = false;
    @Input() disabled = false;

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
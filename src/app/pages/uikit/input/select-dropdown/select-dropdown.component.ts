import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectModule } from 'primeng/select';

@Component({
    selector: 'app-select-dropdown',
    standalone: true,
    imports: [CommonModule, FormsModule, SelectModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SelectDropdownComponent), multi: true }],
    template: `
        <div class="flex flex-col gap-1 w-full">
            <label *ngIf="label" class="text-sm font-medium">{{ label }}</label>
            <p-select
                [ngModel]="value"
                (ngModelChange)="update($event)"
                [options]="options"
                [optionLabel]="optionLabel"
                [optionValue]="optionValue"
                [placeholder]="placeholder"
                [disabled]="disabled"
                [filter]="filter"
                [showClear]="showClear"
                appendTo="body"
            ></p-select>
        </div>
    `
})
export class SelectDropdownComponent implements ControlValueAccessor {
    @Input() label = '';
    @Input() placeholder = 'Select';
    @Input() options: any[] = [];
    @Input() optionLabel = 'name';
    @Input() optionValue?: string;
    @Input() filter = false;
    @Input() showClear = false;

    @Output() valueChange = new EventEmitter<any>();

    value: any = null;
    disabled = false;

    private onChange: (v: any) => void = () => {};
    private onTouched: () => void = () => {};

    writeValue(v: any) { this.value = v; }
    registerOnChange(fn: any) { this.onChange = fn; }
    registerOnTouched(fn: any) { this.onTouched = fn; }
    setDisabledState(d: boolean) { this.disabled = d; }

    update(v: any) {
        this.value = v;
        this.onChange(v);
        this.valueChange.emit(v);
    }
}

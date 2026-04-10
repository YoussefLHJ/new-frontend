import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';

@Component({
    selector: 'app-multi-select',
    standalone: true,
    imports: [CommonModule, FormsModule, MultiSelectModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => MultiSelectComponent), multi: true }],
    template: `
        <div class="flex flex-col gap-1 w-full">
            <label *ngIf="label" class="text-sm font-medium">{{ label }}</label>
            <p-multiselect
                [ngModel]="value"
                (ngModelChange)="update($event)"
                [options]="options"
                [optionLabel]="optionLabel"
                [placeholder]="placeholder"
                [filter]="filter"
                [display]="display"
                [disabled]="disabled"
                appendTo="body"
            ></p-multiselect>
        </div>
    `
})
export class MultiSelectComponent implements ControlValueAccessor {
    @Input() label = '';
    @Input() placeholder = 'Select';
    @Input() options: any[] = [];
    @Input() optionLabel = 'name';
    @Input() filter = true;
    @Input() display: 'comma' | 'chip' = 'chip';

    @Output() valueChange = new EventEmitter<any[]>();

    value: any[] = [];
    disabled = false;

    private onChange: (v: any[]) => void = () => {};
    private onTouched: () => void = () => {};

    writeValue(v: any[]) { this.value = v ?? []; }
    registerOnChange(fn: any) { this.onChange = fn; }
    registerOnTouched(fn: any) { this.onTouched = fn; }
    setDisabledState(d: boolean) { this.disabled = d; }

    update(v: any[]) {
        this.value = v;
        this.onChange(v);
        this.valueChange.emit(v);
    }
}

import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ListboxModule } from 'primeng/listbox';

@Component({
    selector: 'app-listbox-input',
    standalone: true,
    imports: [CommonModule, FormsModule, ListboxModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ListboxInputComponent), multi: true }],
    template: `
        <div class="flex flex-col gap-1 w-full">
            <label *ngIf="label" class="text-sm font-medium">{{ label }}</label>
            <p-listbox
                [ngModel]="value"
                (ngModelChange)="update($event)"
                [options]="options"
                [optionLabel]="optionLabel"
                [filter]="filter"
                [multiple]="multiple"
                [disabled]="disabled"
            ></p-listbox>
        </div>
    `
})
export class ListboxInputComponent implements ControlValueAccessor {
    @Input() label = '';
    @Input() options: any[] = [];
    @Input() optionLabel = 'name';
    @Input() filter = true;
    @Input() multiple = false;

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

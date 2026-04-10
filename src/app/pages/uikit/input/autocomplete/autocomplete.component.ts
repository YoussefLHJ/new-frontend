import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';

@Component({
    selector: 'app-autocomplete',
    standalone: true,
    imports: [CommonModule, FormsModule, AutoCompleteModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AutocompleteComponent), multi: true }],
    template: `
        <div class="flex flex-col gap-1 w-full">
            <label *ngIf="label" class="text-sm font-medium">{{ label }}</label>
            <p-autocomplete
                [ngModel]="value"
                (ngModelChange)="update($event)"
                [suggestions]="suggestions"
                [optionLabel]="optionLabel"
                [placeholder]="placeholder"
                [dropdown]="dropdown"
                [multiple]="multiple"
                [display]="display"
                [disabled]="disabled"
                (completeMethod)="search.emit($event)"
            ></p-autocomplete>
        </div>
    `
})
export class AutocompleteComponent implements ControlValueAccessor {
    @Input() label = '';
    @Input() placeholder = '';
    @Input() suggestions: any[] = [];
    @Input() optionLabel = 'name';
    @Input() dropdown = true;
    @Input() multiple = false;
    @Input() display: 'comma' | 'chip' = 'chip';

    @Output() valueChange = new EventEmitter<any>();
    @Output() search = new EventEmitter<AutoCompleteCompleteEvent>();

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

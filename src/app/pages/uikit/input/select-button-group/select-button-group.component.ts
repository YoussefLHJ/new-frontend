import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';

@Component({
    selector: 'app-select-button-group',
    standalone: true,
    imports: [CommonModule, FormsModule, SelectButtonModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SelectButtonGroupComponent), multi: true }],
    template: `
        <p-selectbutton
            [ngModel]="value"
            (ngModelChange)="update($event)"
            [options]="options"
            [optionLabel]="optionLabel"
            [multiple]="multiple"
            [disabled]="disabled"
        ></p-selectbutton>
    `
})
export class SelectButtonGroupComponent implements ControlValueAccessor {
    @Input() options: any[] = [];
    @Input() optionLabel = 'name';
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

import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
    selector: 'app-date-picker',
    standalone: true,
    imports: [CommonModule, FormsModule, DatePickerModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DatePickerComponent), multi: true }],
    template: `
        <div class="flex flex-col gap-1 w-full">
            <label *ngIf="label" class="text-sm font-medium">{{ label }}</label>
            <p-datepicker
                [ngModel]="value"
                (ngModelChange)="update($event)"
                [showIcon]="showIcon"
                [showButtonBar]="showButtonBar"
                [selectionMode]="selectionMode"
                [dateFormat]="dateFormat"
                [disabled]="disabled"
                [placeholder]="placeholder"
                [showTime]="showTime"
            ></p-datepicker>
        </div>
    `
})
export class DatePickerComponent implements ControlValueAccessor {
    @Input() label = '';
    @Input() placeholder = '';
    @Input() showIcon = true;
    @Input() showButtonBar = true;
    @Input() showTime = false;
    @Input() selectionMode: 'single' | 'multiple' | 'range' = 'single';
    @Input() dateFormat = 'dd/mm/yy';

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

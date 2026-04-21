import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';
import {DatePickerModule} from 'primeng/datepicker';

@Component({
    selector: 'app-datepicker',
    standalone: true,
    imports: [DatePickerModule, FormsModule],
    template: `
        <div class="flex flex-col gap-1">

            @if (label) {
            <label class="text-sm font-medium">{{ label }}</label>
            }

            <p-datepicker
                [ngModel]="value"
                (ngModelChange)="onChangeValue($event)"
                (onBlur)="onTouched()"
                [placeholder]="placeholder"
                [dateFormat]="dateFormat"
                [showIcon]="true"
                [readonlyInput]="true"
                [disabled]="disabled"
                [showTime]="showTime"
                [showSeconds]="showSeconds">
            </p-datepicker>

        </div>
    `,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => AppDatepickerComponent),
            multi: true
        }
    ]
})
export class AppDatepickerComponent implements ControlValueAccessor {

    @Input() label = '';
    @Input() placeholder = 'Choisir une date';
    @Input() dateFormat = 'dd/mm/yy';
    @Input() showTime = false;
    @Input() showSeconds = true;

    value: Date | null = null;
    disabled = false;

    onChange: any = () => {
    };
    onTouched: any = () => {
    };

    writeValue(value: Date | null): void {
        this.value = value;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    onChangeValue(value: Date | null) {
        this.value = value;
        this.onChange(value);
    }
}

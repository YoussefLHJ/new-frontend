import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ToggleButtonModule } from 'primeng/togglebutton';

@Component({
    selector: 'app-toggle-button',
    standalone: true,
    imports: [CommonModule, FormsModule, ToggleButtonModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ToggleButtonComponent), multi: true }],
    template: `
        <p-togglebutton
            [ngModel]="value"
            (ngModelChange)="update($event)"
            [onLabel]="onLabel"
            [offLabel]="offLabel"
            [onIcon]="onIcon"
            [offIcon]="offIcon"
            [disabled]="disabled"
            [style]="{ width: width }"
        ></p-togglebutton>
    `
})
export class ToggleButtonComponent implements ControlValueAccessor {
    @Input() onLabel = 'Yes';
    @Input() offLabel = 'No';
    @Input() onIcon = '';
    @Input() offIcon = '';
    @Input() width = '10em';

    @Output() valueChange = new EventEmitter<boolean>();

    value = false;
    disabled = false;

    private onChange: (v: boolean) => void = () => {};
    private onTouched: () => void = () => {};

    writeValue(v: boolean) { this.value = !!v; }
    registerOnChange(fn: any) { this.onChange = fn; }
    registerOnTouched(fn: any) { this.onTouched = fn; }
    setDisabledState(d: boolean) { this.disabled = d; }

    update(v: boolean) {
        this.value = v;
        this.onChange(v);
        this.valueChange.emit(v);
    }
}

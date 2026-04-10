import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ColorPickerModule } from 'primeng/colorpicker';

@Component({
    selector: 'app-color-picker',
    standalone: true,
    imports: [CommonModule, FormsModule, ColorPickerModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ColorPickerComponent), multi: true }],
    template: `
        <div class="flex items-center gap-2">
            <label *ngIf="label" class="text-sm font-medium">{{ label }}</label>
            <p-colorpicker [ngModel]="value" (ngModelChange)="update($event)" [style]="{ width: '2rem' }"></p-colorpicker>
        </div>
    `
})
export class ColorPickerComponent implements ControlValueAccessor {
    @Input() label = '';

    @Output() valueChange = new EventEmitter<string>();

    value = '#1976D2';
    disabled = false;

    private onChange: (v: string) => void = () => {};
    private onTouched: () => void = () => {};

    writeValue(v: string) { this.value = v || '#1976D2'; }
    registerOnChange(fn: any) { this.onChange = fn; }
    registerOnTouched(fn: any) { this.onTouched = fn; }
    setDisabledState(d: boolean) { this.disabled = d; }

    update(v: string) {
        this.value = v;
        this.onChange(v);
        this.valueChange.emit(v);
    }
}

import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

@Component({
    selector: 'app-toggle-switch',
    standalone: true,
    imports: [CommonModule, FormsModule, ToggleSwitchModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ToggleSwitchComponent), multi: true }],
    template: `
        <div class="flex items-center gap-2">
            <p-toggleswitch [ngModel]="value" (ngModelChange)="update($event)" [disabled]="disabled"></p-toggleswitch>
            <label *ngIf="label" class="text-sm">{{ label }}</label>
        </div>
    `
})
export class ToggleSwitchComponent implements ControlValueAccessor {
    @Input() label = '';
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

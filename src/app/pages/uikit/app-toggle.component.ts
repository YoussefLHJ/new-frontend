import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

@Component({
    selector: 'app-toggle',
    standalone: true,
    imports: [FormsModule, ToggleSwitchModule],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => AppToggleComponent),
        multi: true
    }],
    template: `
        @if (!hidden) {
            <div class="flex flex-col gap-2">
                @if (label) {
                    <label class="text-sm font-semibold" [for]="id">{{ label }}</label>
                }
                <p-toggleswitch
                    [id]="id"
                    [ngModel]="value"
                    (ngModelChange)="onValueChange($event)"
                    [disabled]="disabled || readonly"
                />
            </div>
        }
    `
})
export class AppToggleComponent implements ControlValueAccessor {
    @Input() id = '';
    @Input() label = '';
    @Input() readonly = false;
    @Input() hidden = false;
    @Input() disabled = false;

    value: boolean = false;

    private onChange: (val: any) => void = () => {};
    private onTouched: () => void = () => {};

    writeValue(val: any): void { this.value = val; }
    registerOnChange(fn: any): void { this.onChange = fn; }
    registerOnTouched(fn: any): void { this.onTouched = fn; }
    setDisabledState(isDisabled: boolean): void { this.disabled = isDisabled; }

    onValueChange(val: any): void {
        this.value = val;
        this.onChange(val);
        this.onTouched();
    }
}
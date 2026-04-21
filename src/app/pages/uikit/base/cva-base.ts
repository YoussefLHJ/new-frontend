import { Directive, Input } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Directive()
export abstract class CvaBase<T> implements ControlValueAccessor {
    @Input() disabled = false;

    value!: T;

    protected onChange: (val: T) => void = () => {};
    protected onTouched: () => void = () => {};

    writeValue(val: T): void { this.value = val; }
    registerOnChange(fn: (val: T) => void): void { this.onChange = fn; }
    registerOnTouched(fn: () => void): void { this.onTouched = fn; }
    setDisabledState(isDisabled: boolean): void { this.disabled = isDisabled; }

    onValueChange(val: T): void {
        this.value = val;
        this.onChange(val);
        this.onTouched();
    }
}

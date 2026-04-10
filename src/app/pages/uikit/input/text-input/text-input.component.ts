import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

/**
 * Reusable text input that wraps PrimeNG's `p-inputtext`.
 *
 * Supports:
 *  - ngModel / formControl via ControlValueAccessor
 *  - optional floating label
 *  - optional leading/trailing icon
 *  - inline error message for manual validation
 */
@Component({
    selector: 'app-text-input',
    standalone: true,
    imports: [CommonModule, FormsModule, InputTextModule, FloatLabelModule, IconFieldModule, InputIconModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TextInputComponent),
            multi: true
        }
    ],
    template: `
        <div class="flex flex-col gap-1 w-full">
            <ng-container [ngSwitch]="layout">
                <!-- Float label layout -->
                <p-floatlabel *ngSwitchCase="'float'" [variant]="floatVariant">
                    <ng-container *ngTemplateOutlet="field"></ng-container>
                    <label [for]="inputId">{{ label }}</label>
                </p-floatlabel>

                <!-- Stacked label layout (default) -->
                <ng-container *ngSwitchDefault>
                    <label *ngIf="label" [for]="inputId" class="text-sm font-medium">
                        {{ label }}<span *ngIf="required" class="text-red-500 ml-0.5">*</span>
                    </label>
                    <ng-container *ngTemplateOutlet="field"></ng-container>
                </ng-container>
            </ng-container>

            <small *ngIf="hint && !errorMessage" class="text-muted-color">{{ hint }}</small>
            <small *ngIf="errorMessage" class="text-red-500">{{ errorMessage }}</small>
        </div>

        <ng-template #field>
            <p-iconfield *ngIf="leadingIcon || trailingIcon; else plainField" [iconPosition]="trailingIcon ? 'right' : 'left'">
                <p-inputicon *ngIf="leadingIcon" [styleClass]="leadingIcon"></p-inputicon>
                <input
                    pInputText
                    [id]="inputId"
                    [type]="type"
                    [placeholder]="placeholder"
                    [readonly]="readonly"
                    [disabled]="disabled"
                    [maxlength]="maxlength"
                    [ngModel]="value"
                    (ngModelChange)="handleChange($event)"
                    (blur)="handleBlur()"
                    [attr.aria-label]="label || placeholder"
                    [attr.aria-invalid]="!!errorMessage"
                    class="w-full"
                />
                <p-inputicon *ngIf="trailingIcon" [styleClass]="trailingIcon"></p-inputicon>
            </p-iconfield>

            <ng-template #plainField>
                <input
                    pInputText
                    [id]="inputId"
                    [type]="type"
                    [placeholder]="placeholder"
                    [readonly]="readonly"
                    [disabled]="disabled"
                    [maxlength]="maxlength"
                    [ngModel]="value"
                    (ngModelChange)="handleChange($event)"
                    (blur)="handleBlur()"
                    [attr.aria-label]="label || placeholder"
                    [attr.aria-invalid]="!!errorMessage"
                    class="w-full"
                />
            </ng-template>
        </ng-template>
    `
})
export class TextInputComponent implements ControlValueAccessor {
    @Input() label = '';
    @Input() placeholder = '';
    @Input() hint = '';
    @Input() errorMessage = '';
    @Input() type: 'text' | 'email' | 'password' | 'search' | 'url' | 'tel' = 'text';
    @Input() inputId = `text-input-${Math.random().toString(36).slice(2, 9)}`;
    @Input() leadingIcon = '';
    @Input() trailingIcon = '';
    @Input() readonly = false;
    @Input() required = false;
    @Input() maxlength: number | null = null;
    @Input() layout: 'stacked' | 'float' = 'stacked';
    @Input() floatVariant: 'in' | 'on' | 'over' = 'on';

    @Output() valueChange = new EventEmitter<string>();
    @Output() blurred = new EventEmitter<void>();

    value = '';
    disabled = false;

    private onChange: (value: string) => void = () => {};
    private onTouched: () => void = () => {};

    writeValue(value: string): void {
        this.value = value ?? '';
    }

    registerOnChange(fn: (value: string) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    handleChange(value: string): void {
        this.value = value;
        this.onChange(value);
        this.valueChange.emit(value);
    }

    handleBlur(): void {
        this.onTouched();
        this.blurred.emit();
    }
}

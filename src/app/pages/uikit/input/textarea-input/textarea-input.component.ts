import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TextareaModule } from 'primeng/textarea';

@Component({
    selector: 'app-textarea-input',
    standalone: true,
    imports: [CommonModule, FormsModule, TextareaModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => TextareaInputComponent), multi: true }],
    template: `
        <div class="flex flex-col gap-1 w-full">
            <label *ngIf="label" class="text-sm font-medium">{{ label }}</label>
            <textarea
                pTextarea
                [ngModel]="value"
                (ngModelChange)="update($event)"
                [autoResize]="autoResize"
                [rows]="rows"
                [cols]="cols"
                [placeholder]="placeholder"
                [disabled]="disabled"
            ></textarea>
        </div>
    `
})
export class TextareaInputComponent implements ControlValueAccessor {
    @Input() label = '';
    @Input() placeholder = '';
    @Input() autoResize = true;
    @Input() rows = 3;
    @Input() cols = 30;

    @Output() valueChange = new EventEmitter<string>();

    value = '';
    disabled = false;

    private onChange: (v: string) => void = () => {};
    private onTouched: () => void = () => {};

    writeValue(v: string) { this.value = v ?? ''; }
    registerOnChange(fn: any) { this.onChange = fn; }
    registerOnTouched(fn: any) { this.onTouched = fn; }
    setDisabledState(d: boolean) { this.disabled = d; }

    update(v: string) {
        this.value = v;
        this.onChange(v);
        this.valueChange.emit(v);
    }
}

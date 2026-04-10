import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

export interface CheckboxOption {
    label: string;
    value: any;
    disabled?: boolean;
}

@Component({
    selector: 'app-checkbox-group',
    standalone: true,
    imports: [CommonModule, FormsModule, CheckboxModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CheckboxGroupComponent), multi: true }],
    template: `
        <div class="flex flex-col gap-2">
            <div *ngIf="label" class="text-sm font-medium">{{ label }}</div>
            <div class="flex flex-col md:flex-row gap-4">
                <div *ngFor="let opt of options; let i = index" class="flex items-center">
                    <p-checkbox
                        [inputId]="name + '-' + i"
                        [name]="name"
                        [value]="opt.value"
                        [(ngModel)]="value"
                        (ngModelChange)="update($event)"
                        [disabled]="opt.disabled || disabled"
                    ></p-checkbox>
                    <label [for]="name + '-' + i" class="ml-2">{{ opt.label }}</label>
                </div>
            </div>
        </div>
    `
})
export class CheckboxGroupComponent implements ControlValueAccessor {
    @Input() label = '';
    @Input() options: CheckboxOption[] = [];
    @Input() name = 'checkboxGroup';

    @Output() valueChange = new EventEmitter<any[]>();

    value: any[] = [];
    disabled = false;

    private onChange: (v: any[]) => void = () => {};
    private onTouched: () => void = () => {};

    writeValue(v: any[]) { this.value = v ?? []; }
    registerOnChange(fn: any) { this.onChange = fn; }
    registerOnTouched(fn: any) { this.onTouched = fn; }
    setDisabledState(d: boolean) { this.disabled = d; }

    update(v: any[]) {
        this.value = v;
        this.onChange(v);
        this.valueChange.emit(v);
    }
}

import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';

export interface RadioOption {
    label: string;
    value: any;
    disabled?: boolean;
}

@Component({
    selector: 'app-radio-group',
    standalone: true,
    imports: [CommonModule, FormsModule, RadioButtonModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => RadioGroupComponent), multi: true }],
    template: `
        <div class="flex flex-col gap-2">
            <div *ngIf="label" class="text-sm font-medium">{{ label }}</div>
            <div class="flex flex-col md:flex-row gap-4">
                <div *ngFor="let opt of options; let i = index" class="flex items-center">
                    <p-radiobutton
                        [inputId]="name + '-' + i"
                        [name]="name"
                        [value]="opt.value"
                        [(ngModel)]="value"
                        (ngModelChange)="update($event)"
                    ></p-radiobutton>
                    <label [for]="name + '-' + i" class="leading-none ml-2">{{ opt.label }}</label>
                </div>
            </div>
        </div>
    `
})
export class RadioGroupComponent implements ControlValueAccessor {
    @Input() label = '';
    @Input() options: RadioOption[] = [];
    @Input() name = 'radioGroup';

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

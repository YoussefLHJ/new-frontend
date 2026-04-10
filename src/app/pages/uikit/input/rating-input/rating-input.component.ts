import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { RatingModule } from 'primeng/rating';

@Component({
    selector: 'app-rating-input',
    standalone: true,
    imports: [CommonModule, FormsModule, RatingModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => RatingInputComponent), multi: true }],
    template: `
        <div class="flex flex-col gap-1">
            <label *ngIf="label" class="text-sm font-medium">{{ label }}</label>
            <p-rating [ngModel]="value" (ngModelChange)="update($event)" [readonly]="readonly" [disabled]="disabled"></p-rating>
        </div>
    `
})
export class RatingInputComponent implements ControlValueAccessor {
    @Input() label = '';
    @Input() readonly = false;

    @Output() valueChange = new EventEmitter<number>();

    value = 0;
    disabled = false;

    private onChange: (v: number) => void = () => {};
    private onTouched: () => void = () => {};

    writeValue(v: number) { this.value = v ?? 0; }
    registerOnChange(fn: any) { this.onChange = fn; }
    registerOnTouched(fn: any) { this.onTouched = fn; }
    setDisabledState(d: boolean) { this.disabled = d; }

    update(v: number) {
        this.value = v;
        this.onChange(v);
        this.valueChange.emit(v);
    }
}

import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';

@Component({
  selector: 'app-multiSelect',
  standalone: true,
  imports: [FormsModule, MultiSelectModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppMultiSelectComponent),
      multi: true
    }
  ],
  template: `
    <div class="flex flex-col gap-2">

      <p-multiSelect
        class="w-full"
        [options]="options"
        [(ngModel)]="value"
        [placeholder]="defaultLabel"
        [optionLabel]="optionLabel"
        [appendTo]="appendTo"
        [virtualScroll]="virtualScroll"
        display="chip"
        (onChange)="onValueChange($event.value)"
      >
      </p-multiSelect>

    </div>
  `
})
export class AppMultiSelectComponent implements ControlValueAccessor {

  @Input() options: any[] = [];
  @Input() defaultLabel = 'Select';
  @Input() optionLabel = '';
  @Input() appendTo: any = null;
  @Input() virtualScroll = false;
  @Input() itemSize = 30;

  value: any[] = [];

  private onChange = (val: any) => {};
  private onTouched = () => {};

  writeValue(val: any): void {
    this.value = val || [];
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onValueChange(val: any) {
    this.value = val;
    this.onChange(val);
    this.onTouched();
  }
}

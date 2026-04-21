import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';

@Component({
  selector: 'app-fileUpload',
  standalone: true,
  imports: [FileUploadModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppFileUploadComponent),
      multi: true
    }
  ],
  template: `
    <div class="flex flex-col gap-2">

      <p-fileUpload
        [multiple]="multiple"
        [maxFileSize]="maxFileSize"
        [showUploadButton]="showUploadButton"
        [showCancelButton]="showCancelButton"
        (onSelect)="onSelect($event)"
      >
      </p-fileUpload>

      @if (isInvalid) {
        <small class="text-red-500">
          {{ errorMessage }}
        </small>
      }

    </div>
  `
})
export class AppFileUploadComponent implements ControlValueAccessor {

  @Input() multiple = false;
  @Input() maxFileSize = 10000000;
  @Input() showUploadButton = false;
  @Input() showCancelButton = false;

  @Input() isInvalid = false;
  @Input() errorMessage = '';

  @Output() selectFiles = new EventEmitter<any>();

  files: File[] = [];

  private onChange = (value: any) => {};
  private onTouched = () => {};

  writeValue(value: any): void {
    this.files = value || [];
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onSelect(event: any) {
    this.files = event.files;
    this.onChange(this.files);
    this.selectFiles.emit(event);
    this.onTouched();
  }
}
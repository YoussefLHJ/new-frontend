import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'primeng/fileupload';

/**
 * Reusable "advanced" file upload (drag & drop, previews, progress).
 * Wraps `p-fileupload mode="advanced"` and exposes a typed `uploaded`
 * output so consumers don't need to carry PrimeNG event types around.
 */
@Component({
    selector: 'app-file-upload-advanced',
    standalone: true,
    imports: [CommonModule, FileUploadModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <p-fileupload
            [name]="name"
            [url]="url"
            [multiple]="multiple"
            [accept]="accept"
            [maxFileSize]="maxFileSize"
            mode="advanced"
            [auto]="auto"
            [customUpload]="customUpload"
            (onUpload)="handleUpload($event)"
            (onSelect)="filesSelected.emit($event.currentFiles ?? [])"
            (onError)="uploadError.emit($event)"
            (uploadHandler)="uploadHandler.emit($event)"
        >
            <ng-template #empty>
                <div class="text-muted-color">{{ emptyText }}</div>
            </ng-template>
        </p-fileupload>
    `
})
export class FileUploadAdvancedComponent {
    @Input() name = 'files[]';
    @Input() url = '';
    @Input() multiple = true;
    @Input() accept = 'image/*';
    @Input() maxFileSize = 1_000_000;
    @Input() auto = false;
    @Input() customUpload = false;
    @Input() emptyText = 'Drag and drop files here to upload.';

    @Output() uploaded = new EventEmitter<File[]>();
    @Output() filesSelected = new EventEmitter<File[]>();
    @Output() uploadError = new EventEmitter<any>();
    @Output() uploadHandler = new EventEmitter<any>();

    handleUpload(event: { files: File[] }) {
        this.uploaded.emit(event.files ?? []);
    }
}

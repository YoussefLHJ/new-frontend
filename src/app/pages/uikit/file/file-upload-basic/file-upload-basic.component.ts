import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { SaveButtonComponent } from '../../button/save-button/save-button.component';

/**
 * Reusable basic file upload. Exposes `triggerUpload()` so a consumer-owned
 * button can submit the selection without the component needing to ship
 * its own button.
 */
@Component({
    selector: 'app-file-upload-basic',
    standalone: true,
    imports: [CommonModule, FileUploadModule, SaveButtonComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div class="flex flex-col gap-4 items-center justify-center">
            <p-fileupload
                #fu
                mode="basic"
                [name]="name"
                [url]="url"
                [accept]="accept"
                [maxFileSize]="maxFileSize"
                [chooseLabel]="chooseLabel"
                [chooseIcon]="chooseIcon"
                [auto]="auto"
                (onUpload)="uploaded.emit($event.files ?? [])"
                (onSelect)="filesSelected.emit($event.currentFiles ?? [])"
            />
            <app-save-button *ngIf="showSubmitButton" [label]="submitLabel" icon="pi pi-upload" (clicked)="fu.upload()"></app-save-button>
        </div>
    `
})
export class FileUploadBasicComponent {
    @Input() name = 'files[]';
    @Input() url = '';
    @Input() accept = 'image/*';
    @Input() maxFileSize = 1_000_000;
    @Input() chooseLabel = 'Choose';
    @Input() chooseIcon = 'pi pi-upload';
    @Input() submitLabel = 'Upload';
    @Input() showSubmitButton = true;
    @Input() auto = false;

    @Output() uploaded = new EventEmitter<File[]>();
    @Output() filesSelected = new EventEmitter<File[]>();

    @ViewChild('fu') fu?: FileUpload;

    triggerUpload() {
        this.fu?.upload();
    }
}

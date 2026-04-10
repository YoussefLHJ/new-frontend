import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

import { FileUploadAdvancedComponent } from './file/file-upload-advanced/file-upload-advanced.component';
import { FileUploadBasicComponent } from './file/file-upload-basic/file-upload-basic.component';
import { ToastNotifierComponent } from './message/toast-notifier/toast-notifier.component';

@Component({
    selector: 'app-file-demo',
    standalone: true,
    imports: [FileUploadAdvancedComponent, FileUploadBasicComponent, ToastNotifierComponent],
    template: `
        <app-toast-notifier></app-toast-notifier>
        <div class="grid grid-cols-12 gap-8">
            <div class="col-span-full lg:col-span-6">
                <div class="card">
                    <div class="font-semibold text-xl mb-4">Advanced</div>
                    <app-file-upload-advanced
                        name="demo[]"
                        url="https://www.primefaces.org/cdn/api/upload.php"
                        accept="image/*"
                        [maxFileSize]="1000000"
                        [multiple]="true"
                        emptyText="Drag and drop files to here to upload."
                        (uploaded)="onUpload($event)"
                    ></app-file-upload-advanced>
                </div>
            </div>

            <div class="col-span-full lg:col-span-6">
                <div class="card">
                    <div class="font-semibold text-xl mb-4">Basic</div>
                    <app-file-upload-basic
                        name="demo[]"
                        url="https://www.primefaces.org/cdn/api/upload.php"
                        accept="image/*"
                        [maxFileSize]="1000000"
                        chooseLabel="Choose"
                        chooseIcon="pi pi-upload"
                        submitLabel="Upload"
                        (uploaded)="onUpload($event)"
                    ></app-file-upload-basic>
                </div>
            </div>
        </div>
    `,
    providers: [MessageService]
})
export class FileDemo {
    uploadedFiles: File[] = [];

    constructor(private messageService: MessageService) {}

    onUpload(files: File[]) {
        this.uploadedFiles.push(...files);
        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    }
}

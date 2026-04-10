import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { BaseButtonComponent } from '../base-button/base-button.component';

/**
 * Reusable Import action button. Emits `filesSelected` once the user picks
 * one or many files from the native file dialog. If `triggerOnly` is true,
 * no file dialog is opened — consumers can wire their own UI and just
 * listen to `clicked`.
 */
@Component({
    selector: 'app-import-button',
    standalone: true,
    imports: [BaseButtonComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <app-base-button
            [label]="label"
            [icon]="icon"
            severity="help"
            [loading]="loading"
            [disabled]="disabled"
            [rounded]="rounded"
            [outlined]="outlined"
            [text]="text"
            type="button"
            [styleClass]="styleClass"
            (clicked)="onClick($event)"
        ></app-base-button>
        <input
            #fileInput
            type="file"
            class="hidden"
            [accept]="accept"
            [multiple]="multiple"
            (change)="onFileChange($event)"
        />
    `
})
export class ImportButtonComponent {
    @Input() label = 'Import';
    @Input() icon = 'pi pi-upload';
    @Input() accept = '.xlsx,.xls,.csv';
    @Input() multiple = false;
    @Input() triggerOnly = false;
    @Input() loading = false;
    @Input() disabled = false;
    @Input() rounded = false;
    @Input() outlined = false;
    @Input() text = false;
    @Input() styleClass = '';

    @Output() clicked = new EventEmitter<MouseEvent>();
    @Output() filesSelected = new EventEmitter<File[]>();

    @ViewChild('fileInput', { static: true }) fileInput!: ElementRef<HTMLInputElement>;

    onClick(event: MouseEvent): void {
        this.clicked.emit(event);
        if (!this.triggerOnly) {
            this.fileInput.nativeElement.click();
        }
    }

    onFileChange(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (!input.files || input.files.length === 0) return;
        this.filesSelected.emit(Array.from(input.files));
        input.value = '';
    }
}

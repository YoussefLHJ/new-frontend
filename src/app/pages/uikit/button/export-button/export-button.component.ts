import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { BaseButtonComponent } from '../base-button/base-button.component';

export type ExportFormat = 'excel' | 'pdf' | 'csv' | 'json' | 'custom';

/**
 * Reusable Export action button. By default it renders a neutral "info"
 * styled button with a download icon, but it can be specialized per format
 * (excel, pdf, csv, ...) through the `format` input. Consumers listen to
 * `exportRequested` to actually produce the file.
 */
@Component({
    selector: 'app-export-button',
    standalone: true,
    imports: [BaseButtonComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <app-base-button
            [label]="resolvedLabel"
            [icon]="resolvedIcon"
            severity="info"
            [loading]="loading"
            [disabled]="disabled"
            [rounded]="rounded"
            [outlined]="outlined"
            [text]="text"
            type="button"
            [styleClass]="styleClass"
            [ariaLabel]="resolvedLabel"
            (clicked)="onClick($event)"
        ></app-base-button>
    `
})
export class ExportButtonComponent {
    @Input() label?: string;
    @Input() icon?: string;
    @Input() format: ExportFormat = 'excel';
    @Input() loading = false;
    @Input() disabled = false;
    @Input() rounded = false;
    @Input() outlined = false;
    @Input() text = false;
    @Input() styleClass = '';

    @Output() clicked = new EventEmitter<MouseEvent>();
    @Output() exportRequested = new EventEmitter<ExportFormat>();

    get resolvedLabel(): string {
        if (this.label) return this.label;
        switch (this.format) {
            case 'pdf':
                return 'Export PDF';
            case 'csv':
                return 'Export CSV';
            case 'json':
                return 'Export JSON';
            case 'custom':
                return 'Export';
            case 'excel':
            default:
                return 'Export Excel';
        }
    }

    get resolvedIcon(): string {
        if (this.icon) return this.icon;
        switch (this.format) {
            case 'pdf':
                return 'pi pi-file-pdf';
            case 'csv':
                return 'pi pi-file';
            case 'json':
                return 'pi pi-code';
            case 'excel':
                return 'pi pi-file-excel';
            case 'custom':
            default:
                return 'pi pi-download';
        }
    }

    onClick(event: MouseEvent): void {
        this.clicked.emit(event);
        this.exportRequested.emit(this.format);
    }
}

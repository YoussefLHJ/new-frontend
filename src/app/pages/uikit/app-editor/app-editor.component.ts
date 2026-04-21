import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditorModule } from 'primeng/editor';

@Component({
    selector: 'app-editor',
    standalone: true,
    imports: [FormsModule, EditorModule],
    templateUrl: './app-editor.component.html'
})
export class AppEditorComponent {
    @Input() model: string = '';
    @Input() height: string = '320px';
}

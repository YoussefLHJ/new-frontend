import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { TextareaModule } from 'primeng/textarea';
import { NgClass } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CvaBase } from '../base/cva-base';

@Component({
    selector: 'app-textarea',
    standalone: true,
    imports: [FormsModule, TextareaModule, NgClass, TranslateModule],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => AppTextareaComponent),
        multi: true
    }],
    templateUrl: './app-textarea.component.html'
})
export class AppTextareaComponent extends CvaBase<string> {
    @Input() id = '';
    @Input() label = '';
    @Input() placeholder = '';
    @Input() required = false;
    @Input() isInvalid = false;
    @Input() errorMessage = '';
    @Input() readonly = false;
    @Input() hidden = false;
    @Input() rows = 5;
    @Input() cols = 30;
    @Input() autoResize = true;
    override value: string = '';
}

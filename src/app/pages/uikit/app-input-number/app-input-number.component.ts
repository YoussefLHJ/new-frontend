import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { TranslateModule } from '@ngx-translate/core';
import { CvaBase } from '../base/cva-base';

@Component({
    selector: 'app-input-number',
    standalone: true,
    imports: [FormsModule, InputNumberModule, TranslateModule],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => AppInputNumberComponent),
        multi: true
    }],
    templateUrl: './app-input-number.component.html'
})
export class AppInputNumberComponent extends CvaBase<number | null> {
    @Input() id = '';
    @Input() label = '';
    @Input() placeholder = '';
    @Input() isInvalid = false;
    @Input() errorMessage = '';
    @Input() readonly = false;
    @Input() hidden = false;
    @Input() showButtons = false;
    override value: number | null = null;
}

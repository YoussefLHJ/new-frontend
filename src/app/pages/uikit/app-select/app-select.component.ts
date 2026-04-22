import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { TranslateModule } from '@ngx-translate/core';
import { CvaBase } from '../base/cva-base';

@Component({
    selector: 'app-select',
    standalone: true,
    imports: [FormsModule, SelectModule, TranslateModule],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => AppSelectComponent),
        multi: true
    }],
    templateUrl: './app-select.component.html'
})
export class AppSelectComponent extends CvaBase<any> {
    @Input() id = '';
    @Input() label = '';
    @Input() placeholder = '';
    @Input() options: any[] = [];
    @Input() optionLabel = 'libelle';
    @Input() filter = true;
    @Input() filterMatchMode: 'contains' | 'startsWith' | 'endsWith' | 'equals' | 'notEquals' | 'in' | 'lt' | 'lte' | 'gt' | 'gte' = 'contains';
    @Input() showClear = true;
    @Input() required = false;
    @Input() isInvalid = false;
    @Input() errorMessage = '';
    @Input() readonly = false;
    @Input() hidden = false;
    override value: any = null;
}

import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { CvaBase } from '../base/cva-base';

@Component({
    selector: 'app-multiSelect',
    standalone: true,
    imports: [FormsModule, MultiSelectModule],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => AppMultiSelectComponent),
        multi: true
    }],
    templateUrl: './app-multiSelect.component.html'
})
export class AppMultiSelectComponent extends CvaBase<any[]> {
    @Input() options: any[] = [];
    @Input() defaultLabel = 'Select';
    @Input() optionLabel = '';
    @Input() appendTo: any = null;
    @Input() virtualScroll = false;
    @Input() itemSize = 30;
    override value: any[] = [];

    override writeValue(val: any[]): void { this.value = val || []; }
}

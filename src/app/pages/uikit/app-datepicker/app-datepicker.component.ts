import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { TranslateModule } from '@ngx-translate/core';
import { CvaBase } from '../base/cva-base';

@Component({
    selector: 'app-datepicker',
    standalone: true,
    imports: [DatePickerModule, FormsModule, TranslateModule],
    templateUrl: './app-datepicker.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => AppDatepickerComponent),
        multi: true
    }]
})
export class AppDatepickerComponent extends CvaBase<Date | null> {
    @Input() label = '';
    @Input() placeholder = 'Choisir une date';
    @Input() dateFormat = 'dd/mm/yy';
    @Input() showTime = false;
    @Input() showSeconds = true;
    @Input() appendTo: any = 'body';
    override value: Date | null = null;

    // API responses carry date strings (e.g. "2024-01-15"); p-datepicker requires Date objects.
    override writeValue(val: any): void {
        if (val instanceof Date) {
            this.value = val;
        } else if (typeof val === 'string' && val) {
            const d = new Date(val);
            this.value = isNaN(d.getTime()) ? null : d;
        } else {
            this.value = null;
        }
    }
}

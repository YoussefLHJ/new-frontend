import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { CvaBase } from '../base/cva-base';

@Component({
    selector: 'app-datepicker',
    standalone: true,
    imports: [DatePickerModule, FormsModule],
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
    override value: Date | null = null;
}

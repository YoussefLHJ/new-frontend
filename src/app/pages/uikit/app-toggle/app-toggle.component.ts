import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { TranslateModule } from '@ngx-translate/core';
import { CvaBase } from '../base/cva-base';

@Component({
    selector: 'app-toggle',
    standalone: true,
    imports: [FormsModule, ToggleSwitchModule, TranslateModule],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => AppToggleComponent),
        multi: true
    }],
    templateUrl: './app-toggle.component.html'
})
export class AppToggleComponent extends CvaBase<boolean> {
    @Input() id = '';
    @Input() label = '';
    @Input() readonly = false;
    @Input() hidden = false;
    override value: boolean = false;
}

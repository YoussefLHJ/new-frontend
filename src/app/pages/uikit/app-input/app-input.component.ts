import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { NgClass } from '@angular/common';
import { CvaBase } from '../base/cva-base';

@Component({
    selector: 'app-input',
    standalone: true,
    imports: [FormsModule, InputTextModule, NgClass],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => AppInputComponent),
        multi: true
    }],
    templateUrl: './app-input.component.html'
})
export class AppInputComponent extends CvaBase<string> {
    @Input() id = '';
    @Input() label = '';
    @Input() placeholder = '';
    @Input() required = false;
    @Input() isInvalid = false;
    @Input() errorMessage = '';
    @Input() readonly = false;
    @Input() hidden = false;
    override value: string = '';
}

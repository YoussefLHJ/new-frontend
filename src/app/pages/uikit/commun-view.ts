import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { AppInputComponent } from './app-input/app-input.component';
import { AppInputNumberComponent } from './app-input-number/app-input-number.component';
import { AppSelectComponent } from './app-select/app-select.component';
import { AppToggleComponent } from './app-toggle/app-toggle.component';
import { AppDatepickerComponent } from './app-datepicker/app-datepicker.component';
import { AppTextareaComponent } from './app-textarea/app-textarea.component';
import { AppMultiSelectComponent } from './app-multiSelect/app-multiSelect.component';
import { AppDialogFormComponent } from './app-dialog-form/app-dialog-form.component';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TabsModule } from 'primeng/tabs';

export const CommunView = [
    CommonModule,
    FormsModule,
    TranslateModule,
    AppTextareaComponent,

    AppInputComponent,
    AppInputNumberComponent,
    AppSelectComponent,
    AppToggleComponent,
    AppDatepickerComponent,
    AppMultiSelectComponent,
    AppDialogFormComponent,

    TableModule,
    ButtonModule,
    TabsModule,
] as const;

export {
    AppInputComponent,
    AppInputNumberComponent,
    AppSelectComponent,
    AppToggleComponent,
    AppTextareaComponent,
    AppDatepickerComponent,
    AppMultiSelectComponent,
    AppDialogFormComponent,
};

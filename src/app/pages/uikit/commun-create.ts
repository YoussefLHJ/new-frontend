import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AppInputComponent } from './app-input/app-input.component';
import { AppInputNumberComponent } from './app-input-number/app-input-number.component';
import { AppSelectComponent } from './app-select/app-select.component';
import { AppToggleComponent } from './app-toggle/app-toggle.component';
import { AppDatepickerComponent } from './app-datepicker/app-datepicker.component';
import { AppTextareaComponent } from './app-textarea/app-textarea.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TabsModule } from 'primeng/tabs';
import { DataGridCreateComponent } from '@/app/pages/components/data-grid';
import { AppMultiSelectComponent } from './app-multiSelect/app-multiSelect.component';

export const CommunCreate = [
    CommonModule,
    FormsModule,
    TranslateModule,

    AppInputComponent,
    AppInputNumberComponent,
    AppSelectComponent,
    AppToggleComponent,
    AppTextareaComponent,
    AppDatepickerComponent,
    AppMultiSelectComponent,

    TableModule,
    ButtonModule,
    TabsModule,
    DataGridCreateComponent,
] as const;

export {
    AppInputComponent,
    AppInputNumberComponent,
    AppSelectComponent,
    AppToggleComponent,
    AppTextareaComponent,
    AppDatepickerComponent,
    AppMultiSelectComponent,
};


import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AppInputComponent } from '@/app/pages/uikit/app-input.component';
import { AppInputNumberComponent } from '@/app/pages/uikit/app-input-number.component';
import { AppSelectComponent } from '@/app/pages/uikit/app-select.component';
import { AppToggleComponent } from '@/app/pages/uikit/app-toggle.component';
import { AppDatepickerComponent } from '@/app/pages/uikit/app-datepicker.component';
import { AppTextareaComponent } from '@/app/pages/uikit/app-textarea.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TabsModule } from 'primeng/tabs';
import {DataGridCreateComponent} from "@/app/pages/components/data-grid";
import { AppMultiSelectComponent } from '@/app/pages/uikit/app-multiSelect.component';

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

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ToastModule} from 'primeng/toast';
import {ToolbarModule} from 'primeng/toolbar';
import {TableModule} from 'primeng/table';
import {AppSelectComponent} from '@/app/pages/uikit/app-select.component';
import {AppToggleComponent} from '@/app/pages/uikit/app-toggle.component';
import {AppTextareaComponent} from '@/app/pages/uikit/app-textarea.component';
import {AppDatepickerComponent} from '@/app/pages/uikit/app-datepicker.component';
import {EditorModule} from "primeng/editor";
import { AppMultiSelectComponent } from '@/app/pages/uikit/app-multiSelect.component';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import {PanelModule} from 'primeng/panel';
import {AppInputNumberComponent} from '@/app/pages/uikit/app-input-number.component';
import {BadgeModule} from 'primeng/badge';
import {TranslateModule} from '@ngx-translate/core';
import {FileUploadModule} from 'primeng/fileupload';
import {FullCalendarModule} from '@fullcalendar/angular';
import {CardModule} from 'primeng/card';
import {TagModule} from 'primeng/tag';


import { DataGridListComponent, DataGridViewComponent } from '@/app/pages/components/data-grid';

import { CommandeItemCreateAdminComponent } from './commande-item/create/commande-item-create-admin.component';
import { CommandeItemEditAdminComponent } from './commande-item/edit/commande-item-edit-admin.component';
import { CommandeItemViewAdminComponent } from './commande-item/view/commande-item-view-admin.component';
import { CommandeItemListAdminComponent } from './commande-item/list/commande-item-list-admin.component';
import { CommandeCreateAdminComponent } from './commande/create/commande-create-admin.component';
import { CommandeEditAdminComponent } from './commande/edit/commande-edit-admin.component';
import { CommandeViewAdminComponent } from './commande/view/commande-view-admin.component';
import { CommandeListAdminComponent } from './commande/list/commande-list-admin.component';

import { PasswordModule } from 'primeng/password';
import { AppInputComponent } from '@/app/pages/uikit/app-input.component';
import {ButtonModule} from 'primeng/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MessageModule } from 'primeng/message';
import {PaginatorModule} from 'primeng/paginator';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { TabsModule } from 'primeng/tabs';
import { AppBreadcrumbComponent } from '@/app/pages/uikit/breadcrumb/app-breadcrumb.component';


@NgModule({
  declarations: [

    CommandeItemListAdminComponent,
    CommandeListAdminComponent,
  ],
  imports: [
    CommonModule,
    ToastModule,
    ToolbarModule,
    TableModule,
    ConfirmDialogModule,
    DialogModule,
    PasswordModule,
    AppInputComponent,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SplitButtonModule,
    AppSelectComponent,
    TabsModule,
    AppToggleComponent,
    AppTextareaComponent,
    AppDatepickerComponent,
    PanelModule,
    MessageModule,
    AppInputNumberComponent,
    BadgeModule,
    AppMultiSelectComponent,
    PaginatorModule,
    TranslateModule,
    FileUploadModule,
    FullCalendarModule,
    CardModule,
    EditorModule,
    TagModule,
    IconField,
    InputIcon,
    DataGridListComponent,
    AppBreadcrumbComponent,

    CommandeItemCreateAdminComponent,
    CommandeItemViewAdminComponent,
    CommandeItemEditAdminComponent,
    CommandeCreateAdminComponent,
    CommandeViewAdminComponent,
    CommandeEditAdminComponent,
  ],
  exports: [
    CommandeItemCreateAdminComponent,
    CommandeItemListAdminComponent,
    CommandeItemViewAdminComponent,
    CommandeItemEditAdminComponent,
    CommandeCreateAdminComponent,
    CommandeListAdminComponent,
    CommandeViewAdminComponent,
    CommandeEditAdminComponent,
  ],
})
export class CoreAdminModule { }

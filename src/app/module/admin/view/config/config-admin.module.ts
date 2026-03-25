import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ToastModule} from 'primeng/toast';
import {ToolbarModule} from 'primeng/toolbar';
import {TableModule} from 'primeng/table';
import {SelectModule} from 'primeng/select';
import {ToggleSwitchModule} from 'primeng/toggleswitch';
import {TextareaModule} from 'primeng/textarea';
import {EditorModule} from "primeng/editor";

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import {DatePickerModule} from 'primeng/datepicker';
import {PanelModule} from 'primeng/panel';
import {InputNumberModule} from 'primeng/inputnumber';
import {BadgeModule} from 'primeng/badge';
import { MultiSelectModule } from 'primeng/multiselect';
import {TranslateModule} from '@ngx-translate/core';
import {FileUploadModule} from 'primeng/fileupload';
import {FullCalendarModule} from '@fullcalendar/angular';
import {CardModule} from "primeng/card";
import {TagModule} from "primeng/tag";

import { AppareilCreateAdminComponent } from './appareil/create/appareil-create-admin.component';
import { AppareilEditAdminComponent } from './appareil/edit/appareil-edit-admin.component';
import { AppareilViewAdminComponent } from './appareil/view/appareil-view-admin.component';
import { AppareilListAdminComponent } from './appareil/list/appareil-list-admin.component';
import { BatimentCreateAdminComponent } from './batiment/create/batiment-create-admin.component';
import { BatimentEditAdminComponent } from './batiment/edit/batiment-edit-admin.component';
import { BatimentViewAdminComponent } from './batiment/view/batiment-view-admin.component';
import { BatimentListAdminComponent } from './batiment/list/batiment-list-admin.component';
import { CommuneCreateAdminComponent } from './commune/create/commune-create-admin.component';
import { CommuneEditAdminComponent } from './commune/edit/commune-edit-admin.component';
import { CommuneViewAdminComponent } from './commune/view/commune-view-admin.component';
import { CommuneListAdminComponent } from './commune/list/commune-list-admin.component';

import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {TabsModule} from 'primeng/tabs';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MessageModule } from 'primeng/message';
import {PaginatorModule} from 'primeng/paginator';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';


@NgModule({
  declarations: [

    AppareilCreateAdminComponent,
    AppareilListAdminComponent,
    AppareilViewAdminComponent,
    AppareilEditAdminComponent,
    BatimentCreateAdminComponent,
    BatimentListAdminComponent,
    BatimentViewAdminComponent,
    BatimentEditAdminComponent,
    CommuneCreateAdminComponent,
    CommuneListAdminComponent,
    CommuneViewAdminComponent,
    CommuneEditAdminComponent,
  ],
  imports: [
    CommonModule,
    ToastModule,
    ToolbarModule,
    TableModule,
    ConfirmDialogModule,
    DialogModule,
    PasswordModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SplitButtonModule,
    SelectModule,
    TabsModule,
    ToggleSwitchModule,
    TextareaModule,
    DatePickerModule,
    PanelModule,
    MessageModule,
    InputNumberModule,
    BadgeModule,
    MultiSelectModule,
    PaginatorModule,
    TranslateModule,
    FileUploadModule,
    FullCalendarModule,
    CardModule,
    EditorModule,
    TagModule,
    IconField,
    InputIcon


  ],
  exports: [
  AppareilCreateAdminComponent,
  AppareilListAdminComponent,
  AppareilViewAdminComponent,
  AppareilEditAdminComponent,
  BatimentCreateAdminComponent,
  BatimentListAdminComponent,
  BatimentViewAdminComponent,
  BatimentEditAdminComponent,
  CommuneCreateAdminComponent,
  CommuneListAdminComponent,
  CommuneViewAdminComponent,
  CommuneEditAdminComponent,
  ],
})
export class ConfigAdminModule { }

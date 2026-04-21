import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ToastModule} from 'primeng/toast';
import {ToolbarModule} from 'primeng/toolbar';
import {TableModule} from 'primeng/table';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { PanelModule} from 'primeng/panel';
import { BadgeModule} from 'primeng/badge';


import {AppSelectComponent} from '@/app/pages/uikit/app-select.component';
import {AppToggleComponent} from '@/app/pages/uikit/app-toggle.component';
import {AppTextareaComponent} from '@/app/pages/uikit/app-textarea.component';
import {AppFileUploadComponent} from '@/app/pages/uikit/app-file-upload.component';
import { AppInputNumberComponent } from '@/app/pages/uikit/app-input-number.component';
import { AppDatepickerComponent } from '@/app/pages/uikit/app-datepicker.component';
import { AppInputComponent } from '@/app/pages/uikit/app-input.component';
import { AppEditorComponent } from '@/app/pages/uikit/app-editor.component';
import { AppMultiSelectComponent } from '@/app/pages/uikit/app-multiSelect.component';


import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule} from '@angular/router';
import { TabsModule} from 'primeng/tabs';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MessageModule } from 'primeng/message';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';

import { LoginAdminComponent } from './login-admin/login-admin.component';
import { RegisterAdminComponent } from './register-admin/register-admin.component';
import { ChangePasswordAdminComponent } from './change-password-admin/change-password-admin.component';
import { ActivationAdminComponent } from './activation-admin/activation-admin.component';
import { ForgetPasswordAdminComponent } from './forget-password-admin/forget-password-admin.component';


import { CoreAdminModule } from './view/core/core-admin.module';
import { CoreAdminRoutingModule } from './view/core/core-admin-routing.module';

import {SecurityModule} from 'src/app/module/security/security.module';
import {SecurityRoutingModule} from 'src/app/module/security/security-routing.module';


@NgModule({
  declarations: [
   LoginAdminComponent,
   RegisterAdminComponent,
   ChangePasswordAdminComponent,
   ActivationAdminComponent,
   ForgetPasswordAdminComponent
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
    PanelModule,
    MessageModule,
    TabsModule,

    AppInputNumberComponent,
    AppMultiSelectComponent,
    AppSelectComponent,
    AppDatepickerComponent,
    AppToggleComponent,
    AppTextareaComponent,
    AppEditorComponent,
    AppFileUploadComponent,

    BadgeModule,
    IconField,
    InputIcon,
  CoreAdminModule,
  CoreAdminRoutingModule,
   SecurityModule,
   SecurityRoutingModule
  ],
  exports: [
    LoginAdminComponent,
    RegisterAdminComponent,
    ChangePasswordAdminComponent,
    ActivationAdminComponent,
    ForgetPasswordAdminComponent,

    CoreAdminModule,
    SecurityModule
  ],

})
export class AdminModule { }

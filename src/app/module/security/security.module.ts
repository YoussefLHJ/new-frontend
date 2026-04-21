import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ToastModule} from 'primeng/toast';
import {ToolbarModule} from 'primeng/toolbar';
import {TableModule} from 'primeng/table';
import {AppSelectComponent} from '@/app/pages/uikit/app-select.component';
import {AppToggleComponent} from '@/app/pages/uikit/app-toggle.component';
import {AppTextareaComponent} from '@/app/pages/uikit/app-textarea.component';

import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {DialogModule} from 'primeng/dialog';
import {AppDatepickerComponent} from '@/app/pages/uikit/app-datepicker.component';
import {PanelModule} from 'primeng/panel';
import {AppInputNumberComponent} from '@/app/pages/uikit/app-input-number.component';
import {BadgeModule} from 'primeng/badge';
import {AppMultiSelectComponent} from '@/app/pages/uikit/app-multiSelect.component';
import {ToggleSwitchModule} from 'primeng/toggleswitch';
import {SelectModule} from 'primeng/select';
import {MultiSelectModule} from 'primeng/multiselect';


import {PasswordModule} from 'primeng/password';
import {AppInputComponent} from '@/app/pages/uikit/app-input.component';
import {ButtonModule} from 'primeng/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {TabsModule} from 'primeng/tabs';
import {SplitButtonModule} from 'primeng/splitbutton';
import {MessageModule} from 'primeng/message';
import {ModelPermissionEditComponent} from './model-permission/edit/model-permission-edit.component';
import {UserCreateComponent} from './user/create/user-create.component';
import {UserListComponent} from './user/list/user-list.component';
import {UserViewComponent} from './user/view/user-view.component';
import {UserEditComponent} from './user/edit/user-edit.component';
import {ModelPermissionCreateComponent} from './model-permission/create/model-permission-create.component';
import {ModelPermissionListComponent} from './model-permission/list/model-permission-list.component';
import {ModelPermissionViewComponent} from './model-permission/view/model-permission-view.component';
import {RoleEditComponent} from './role/edit/role-edit.component';
import {ActionPermissionCreateComponent} from './action-permission/create/action-permission-create.component';
import {ActionPermissionListComponent} from './action-permission/list/action-permission-list.component';
import {ActionPermissionViewComponent} from './action-permission/view/action-permission-view.component';
import {ActionPermissionEditComponent} from './action-permission/edit/action-permission-edit.component';
import {ModelPermissionUserCreateComponent} from './model-permission-utilisateur/create/model-permission-user-create.component';
import {ModelPermissionUserListComponent} from './model-permission-utilisateur/list/model-permission-user-list.component';
import {ModelPermissionUserViewComponent} from './model-permission-utilisateur/view/model-permission-user-view.component';
import {ModelPermissionUserEditComponent} from './model-permission-utilisateur/edit/model-permission-user-edit.component';
import {RoleCreateComponent} from './role/create/role-create.component';
import {RoleListComponent} from './role/list/role-list.component';
import {RoleViewComponent} from './role/view/role-view.component';
import {PaginatorModule} from 'primeng/paginator';
import {TranslateModule} from '@ngx-translate/core';
import {CardModule} from 'primeng/card';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';


@NgModule({
    declarations: [
        UserCreateComponent,
        UserListComponent,
        UserViewComponent,
        UserEditComponent,
        ModelPermissionCreateComponent,
        ModelPermissionListComponent,
        ModelPermissionViewComponent,
        ModelPermissionEditComponent,
        ActionPermissionCreateComponent,
        ActionPermissionListComponent,
        ActionPermissionViewComponent,
        ActionPermissionEditComponent,
        ModelPermissionUserCreateComponent,
        ModelPermissionUserListComponent,
        ModelPermissionUserViewComponent,
        ModelPermissionUserEditComponent,
        RoleCreateComponent,
        RoleListComponent,
        RoleViewComponent,
        RoleEditComponent
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
        ToggleSwitchModule,
        SelectModule,
        MultiSelectModule,
        PaginatorModule,
        TranslateModule,
        CardModule,
        IconField,
        InputIcon
    ],
    exports: [
        UserCreateComponent,
        UserListComponent,
        UserViewComponent,
        UserEditComponent,
        ModelPermissionCreateComponent,
        ModelPermissionListComponent,
        ModelPermissionViewComponent,
        ModelPermissionEditComponent,
        ActionPermissionCreateComponent,
        ActionPermissionListComponent,
        ActionPermissionViewComponent,
        ActionPermissionEditComponent,
        ModelPermissionUserCreateComponent,
        ModelPermissionUserListComponent,
        ModelPermissionUserViewComponent,
        ModelPermissionUserEditComponent,
        RoleCreateComponent,
        RoleListComponent,
        RoleViewComponent,
        RoleEditComponent
    ]
})
export class SecurityModule {}

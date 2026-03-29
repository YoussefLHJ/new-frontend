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

import { LotReleveCreateAdminComponent } from './lot-releve/create/lot-releve-create-admin.component';
import { LotReleveEditAdminComponent } from './lot-releve/edit/lot-releve-edit-admin.component';
import { LotReleveViewAdminComponent } from './lot-releve/view/lot-releve-view-admin.component';
import { LotReleveListAdminComponent } from './lot-releve/list/lot-releve-list-admin.component';
import { LotReleveListAdminV2Component } from './lot-releve/list/lot-releve-list-admin-v2.component';
import { NewReleveCreateAdminComponent } from './new-releve/create/new-releve-create-admin.component';
import { NewReleveEditAdminComponent } from './new-releve/edit/new-releve-edit-admin.component';
import { NewReleveViewAdminComponent } from './new-releve/view/new-releve-view-admin.component';
import { NewReleveListAdminComponent } from './new-releve/list/new-releve-list-admin.component';
import { ServerDataTableComponent } from 'src/app/shared/components/data-grid';
import { TourneeReleveCompteurCreateAdminComponent } from './tournee-releve-compteur/create/tournee-releve-compteur-create-admin.component';
import { TourneeReleveCompteurEditAdminComponent } from './tournee-releve-compteur/edit/tournee-releve-compteur-edit-admin.component';
import { TourneeReleveCompteurViewAdminComponent } from './tournee-releve-compteur/view/tournee-releve-compteur-view-admin.component';
import { TourneeReleveCompteurListAdminComponent } from './tournee-releve-compteur/list/tournee-releve-compteur-list-admin.component';
import { TourneeLotReleveCreateAdminComponent } from './tournee-lot-releve/create/tournee-lot-releve-create-admin.component';
import { TourneeLotReleveEditAdminComponent } from './tournee-lot-releve/edit/tournee-lot-releve-edit-admin.component';
import { TourneeLotReleveViewAdminComponent } from './tournee-lot-releve/view/tournee-lot-releve-view-admin.component';
import { TourneeLotReleveListAdminComponent } from './tournee-lot-releve/list/tournee-lot-releve-list-admin.component';
import { TourneeReleveDetailCreateAdminComponent } from './tournee-releve-detail/create/tournee-releve-detail-create-admin.component';
import { TourneeReleveDetailEditAdminComponent } from './tournee-releve-detail/edit/tournee-releve-detail-edit-admin.component';
import { TourneeReleveDetailViewAdminComponent } from './tournee-releve-detail/view/tournee-releve-detail-view-admin.component';
import { TourneeReleveDetailListAdminComponent } from './tournee-releve-detail/list/tournee-releve-detail-list-admin.component';
import { UniteReleveCreateAdminComponent } from './unite-releve/create/unite-releve-create-admin.component';
import { UniteReleveEditAdminComponent } from './unite-releve/edit/unite-releve-edit-admin.component';
import { UniteReleveViewAdminComponent } from './unite-releve/view/unite-releve-view-admin.component';
import { UniteReleveListAdminComponent } from './unite-releve/list/unite-releve-list-admin.component';
import { ZoneAgenceReleveCreateAdminComponent } from './zone-agence-releve/create/zone-agence-releve-create-admin.component';
import { ZoneAgenceReleveEditAdminComponent } from './zone-agence-releve/edit/zone-agence-releve-edit-admin.component';
import { ZoneAgenceReleveViewAdminComponent } from './zone-agence-releve/view/zone-agence-releve-view-admin.component';
import { ZoneAgenceReleveListAdminComponent } from './zone-agence-releve/list/zone-agence-releve-list-admin.component';
import { ZoneVilleReleveCreateAdminComponent } from './zone-ville-releve/create/zone-ville-releve-create-admin.component';
import { ZoneVilleReleveEditAdminComponent } from './zone-ville-releve/edit/zone-ville-releve-edit-admin.component';
import { ZoneVilleReleveViewAdminComponent } from './zone-ville-releve/view/zone-ville-releve-view-admin.component';
import { ZoneVilleReleveListAdminComponent } from './zone-ville-releve/list/zone-ville-releve-list-admin.component';
import { ZoneVilleRegionReleveCreateAdminComponent } from './zone-ville-region-releve/create/zone-ville-region-releve-create-admin.component';
import { ZoneVilleRegionReleveEditAdminComponent } from './zone-ville-region-releve/edit/zone-ville-region-releve-edit-admin.component';
import { ZoneVilleRegionReleveViewAdminComponent } from './zone-ville-region-releve/view/zone-ville-region-releve-view-admin.component';
import { ZoneVilleRegionReleveListAdminComponent } from './zone-ville-region-releve/list/zone-ville-region-releve-list-admin.component';

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

    LotReleveCreateAdminComponent,
    LotReleveListAdminComponent,
    LotReleveListAdminV2Component,
    LotReleveViewAdminComponent,
    LotReleveEditAdminComponent,
    NewReleveCreateAdminComponent,
    NewReleveListAdminComponent,
    NewReleveViewAdminComponent,
    NewReleveEditAdminComponent,
    TourneeReleveCompteurCreateAdminComponent,
    TourneeReleveCompteurListAdminComponent,
    TourneeReleveCompteurViewAdminComponent,
    TourneeReleveCompteurEditAdminComponent,
    TourneeLotReleveCreateAdminComponent,
    TourneeLotReleveListAdminComponent,
    TourneeLotReleveViewAdminComponent,
    TourneeLotReleveEditAdminComponent,
    TourneeReleveDetailCreateAdminComponent,
    TourneeReleveDetailListAdminComponent,
    TourneeReleveDetailViewAdminComponent,
    TourneeReleveDetailEditAdminComponent,
    UniteReleveCreateAdminComponent,
    UniteReleveListAdminComponent,
    UniteReleveViewAdminComponent,
    UniteReleveEditAdminComponent,
    ZoneAgenceReleveCreateAdminComponent,
    ZoneAgenceReleveListAdminComponent,
    ZoneAgenceReleveViewAdminComponent,
    ZoneAgenceReleveEditAdminComponent,
    ZoneVilleReleveCreateAdminComponent,
    ZoneVilleReleveListAdminComponent,
    ZoneVilleReleveViewAdminComponent,
    ZoneVilleReleveEditAdminComponent,
    ZoneVilleRegionReleveCreateAdminComponent,
    ZoneVilleRegionReleveListAdminComponent,
    ZoneVilleRegionReleveViewAdminComponent,
    ZoneVilleRegionReleveEditAdminComponent,
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
    InputIcon,
    ServerDataTableComponent

  ],
  exports: [
  LotReleveCreateAdminComponent,
  LotReleveListAdminComponent,
  LotReleveListAdminV2Component,
  LotReleveViewAdminComponent,
  LotReleveEditAdminComponent,
  NewReleveCreateAdminComponent,
  NewReleveListAdminComponent,
  NewReleveViewAdminComponent,
  NewReleveEditAdminComponent,
  TourneeReleveCompteurCreateAdminComponent,
  TourneeReleveCompteurListAdminComponent,
  TourneeReleveCompteurViewAdminComponent,
  TourneeReleveCompteurEditAdminComponent,
  TourneeLotReleveCreateAdminComponent,
  TourneeLotReleveListAdminComponent,
  TourneeLotReleveViewAdminComponent,
  TourneeLotReleveEditAdminComponent,
  TourneeReleveDetailCreateAdminComponent,
  TourneeReleveDetailListAdminComponent,
  TourneeReleveDetailViewAdminComponent,
  TourneeReleveDetailEditAdminComponent,
  UniteReleveCreateAdminComponent,
  UniteReleveListAdminComponent,
  UniteReleveViewAdminComponent,
  UniteReleveEditAdminComponent,
  ZoneAgenceReleveCreateAdminComponent,
  ZoneAgenceReleveListAdminComponent,
  ZoneAgenceReleveViewAdminComponent,
  ZoneAgenceReleveEditAdminComponent,
  ZoneVilleReleveCreateAdminComponent,
  ZoneVilleReleveListAdminComponent,
  ZoneVilleReleveViewAdminComponent,
  ZoneVilleReleveEditAdminComponent,
  ZoneVilleRegionReleveCreateAdminComponent,
  ZoneVilleRegionReleveListAdminComponent,
  ZoneVilleRegionReleveViewAdminComponent,
  ZoneVilleRegionReleveEditAdminComponent,
  ],
})
export class ReleveAdminModule { }

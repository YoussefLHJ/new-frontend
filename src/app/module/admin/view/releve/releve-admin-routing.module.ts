
// const root = environment.rootAppUrl;



import {UserListComponent} from 'src/app/module/security/user/list/user-list.component';
import {ModelPermissionListComponent} from 'src/app/module/security/model-permission/list/model-permission-list.component';
import {ActionPermissionListComponent} from 'src/app/module/security/action-permission/list/action-permission-list.component';
import {ModelPermissionUserListComponent} from 'src/app/module/security/model-permission-utilisateur/list/model-permission-user-list.component';
import {RoleListComponent} from 'src/app/module/security/role/list/role-list.component';



import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {AuthGuard} from 'src/app/zynerator/security/guards/auth.guard';



import { LotReleveListAdminComponent } from './lot-releve/list/lot-releve-list-admin.component';
import { TourneeReleveCompteurListAdminComponent } from './tournee-releve-compteur/list/tournee-releve-compteur-list-admin.component';
import { TourneeLotReleveListAdminComponent } from './tournee-lot-releve/list/tournee-lot-releve-list-admin.component';
import { TourneeReleveDetailListAdminComponent } from './tournee-releve-detail/list/tournee-releve-detail-list-admin.component';
import { UniteReleveListAdminComponent } from './unite-releve/list/unite-releve-list-admin.component';
import { ZoneAgenceReleveListAdminComponent } from './zone-agence-releve/list/zone-agence-releve-list-admin.component';
import { ZoneVilleReleveListAdminComponent } from './zone-ville-releve/list/zone-ville-releve-list-admin.component';
import { ZoneVilleRegionReleveListAdminComponent } from './zone-ville-region-releve/list/zone-ville-region-releve-list-admin.component';
@NgModule({
    imports: [
        RouterModule.forChild(
            [
                {
                    path: '',
                    children: [
                        {

                            path: 'action-permission',
                            children: [
                                {
                                    path: 'list',
                                    component: ActionPermissionListComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'model-permission-user',
                            children: [
                                {
                                    path: 'list',
                                    component: ModelPermissionUserListComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'role',
                            children: [
                                {
                                    path: 'list',
                                    component: RoleListComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'user',
                            children: [
                                {
                                    path: 'list',
                                    component: UserListComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'model-permission',
                            children: [
                                {
                                    path: 'list',
                                    component: ModelPermissionListComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },


                        {

                            path: 'lot-releve',
                            children: [
                                {
                                    path: 'list',
                                    component: LotReleveListAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'tournee-releve-compteur',
                            children: [
                                {
                                    path: 'list',
                                    component: TourneeReleveCompteurListAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'tournee-lot-releve',
                            children: [
                                {
                                    path: 'list',
                                    component: TourneeLotReleveListAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'tournee-releve-detail',
                            children: [
                                {
                                    path: 'list',
                                    component: TourneeReleveDetailListAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'unite-releve',
                            children: [
                                {
                                    path: 'list',
                                    component: UniteReleveListAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'zone-agence-releve',
                            children: [
                                {
                                    path: 'list',
                                    component: ZoneAgenceReleveListAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'zone-ville-releve',
                            children: [
                                {
                                    path: 'list',
                                    component: ZoneVilleReleveListAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'zone-ville-region-releve',
                            children: [
                                {
                                    path: 'list',
                                    component: ZoneVilleRegionReleveListAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                    ]
                },
            ]
        ),
    ],
    exports: [RouterModule],
})
export class ReleveAdminRoutingModule { }

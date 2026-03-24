import {Component, OnInit} from '@angular/core';


import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {Inject, Injectable, PLATFORM_ID} from '@angular/core';


import {environment} from 'src/environments/environment';

import {RoleService} from 'src/app/zynerator/security/shared/service/Role.service';
import {AbstractService} from 'src/app/zynerator/service/AbstractService';
import {BaseDto} from 'src/app/zynerator/dto/BaseDto.model';
import {BaseCriteria} from 'src/app/zynerator/criteria/BaseCriteria.model';
import {StringUtilService} from 'src/app/zynerator/util/StringUtil.service';
import {ServiceLocator} from 'src/app/zynerator/service/ServiceLocator';
import {ConfirmationService, MessageService,MenuItem} from 'primeng/api';
import {FileTempDto} from 'src/app/zynerator/dto/FileTempDto.model';


import {TourneeReleveCompteurAdminService} from 'src/app/shared/service/admin/releve/TourneeReleveCompteurAdmin.service';
import {TourneeReleveCompteurDto} from 'src/app/shared/model/releve/TourneeReleveCompteur.model';
import {TourneeReleveCompteurCriteria} from 'src/app/shared/criteria/releve/TourneeReleveCompteurCriteria.model';

import {AppareilDto} from 'src/app/shared/model/config/Appareil.model';
import {AppareilAdminService} from 'src/app/shared/service/admin/config/AppareilAdmin.service';
import {TourneeReleveDetailDto} from 'src/app/shared/model/releve/TourneeReleveDetail.model';
import {TourneeReleveDetailAdminService} from 'src/app/shared/service/admin/releve/TourneeReleveDetailAdmin.service';
@Component({
  selector: 'app-tournee-releve-compteur-view-admin',
  standalone: false,
  templateUrl: './tournee-releve-compteur-view-admin.component.html'
})
export class TourneeReleveCompteurViewAdminComponent implements OnInit {


	protected _submitted = false;
    protected _errorMessages = new Array<string>();

    protected datePipe: DatePipe;
    protected messageService: MessageService;
    protected confirmationService: ConfirmationService;
    protected roleService: RoleService;
    protected router: Router;
    protected stringUtilService: StringUtilService;



    constructor(private service: TourneeReleveCompteurAdminService, private appareilService: AppareilAdminService, private tourneeReleveDetailService: TourneeReleveDetailAdminService){
		this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
	}

    ngOnInit(): void {
    }


    get tourneeReleveDetail(): TourneeReleveDetailDto {
        return this.tourneeReleveDetailService.item;
    }
    set tourneeReleveDetail(value: TourneeReleveDetailDto) {
        this.tourneeReleveDetailService.item = value;
    }
    get tourneeReleveDetails(): Array<TourneeReleveDetailDto> {
        return this.tourneeReleveDetailService.items;
    }
    set tourneeReleveDetails(value: Array<TourneeReleveDetailDto>) {
        this.tourneeReleveDetailService.items = value;
    }
    get appareil(): AppareilDto {
        return this.appareilService.item;
    }
    set appareil(value: AppareilDto) {
        this.appareilService.item = value;
    }
    get appareils(): Array<AppareilDto> {
        return this.appareilService.items;
    }
    set appareils(value: Array<AppareilDto>) {
        this.appareilService.items = value;
    }

    public hideViewDialog() {
        this.viewDialog = false;
    }

    get items(): Array<TourneeReleveCompteurDto> {
        return this.service.items;
    }

    set items(value: Array<TourneeReleveCompteurDto>) {
        this.service.items = value;
    }

    get item(): TourneeReleveCompteurDto {
        return this.service.item;
    }

    set item(value: TourneeReleveCompteurDto) {
        this.service.item = value;
    }

    get viewDialog(): boolean {
        return this.service.viewDialog;
    }

    set viewDialog(value: boolean) {
        this.service.viewDialog = value;
    }

    get criteria(): TourneeReleveCompteurCriteria {
        return this.service.criteria;
    }

    set criteria(value: TourneeReleveCompteurCriteria) {
        this.service.criteria = value;
    }

    get dateFormat(){
        return environment.dateFormatView;
    }

    get dateFormatColumn(){
        return environment.dateFormatList;
    }


}

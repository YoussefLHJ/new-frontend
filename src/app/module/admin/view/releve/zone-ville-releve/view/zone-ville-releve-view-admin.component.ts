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


import {ZoneVilleReleveAdminService} from 'src/app/shared/service/admin/releve/ZoneVilleReleveAdmin.service';
import {ZoneVilleReleveDto} from 'src/app/shared/model/releve/ZoneVilleReleve.model';
import {ZoneVilleReleveCriteria} from 'src/app/shared/criteria/releve/ZoneVilleReleveCriteria.model';

import {ZoneAgenceReleveDto} from 'src/app/shared/model/releve/ZoneAgenceReleve.model';
import {ZoneAgenceReleveAdminService} from 'src/app/shared/service/admin/releve/ZoneAgenceReleveAdmin.service';
import {ZoneVilleRegionReleveDto} from 'src/app/shared/model/releve/ZoneVilleRegionReleve.model';
import {ZoneVilleRegionReleveAdminService} from 'src/app/shared/service/admin/releve/ZoneVilleRegionReleveAdmin.service';
@Component({
  selector: 'app-zone-ville-releve-view-admin',
  standalone: false,
  templateUrl: './zone-ville-releve-view-admin.component.html'
})
export class ZoneVilleReleveViewAdminComponent implements OnInit {


	protected _submitted = false;
    protected _errorMessages = new Array<string>();

    protected datePipe: DatePipe;
    protected messageService: MessageService;
    protected confirmationService: ConfirmationService;
    protected roleService: RoleService;
    protected router: Router;
    protected stringUtilService: StringUtilService;


    zoneVilleRegionReleves = new ZoneVilleRegionReleveDto();
    zoneVilleRegionRelevess: Array<ZoneVilleRegionReleveDto> = [];

    constructor(private service: ZoneVilleReleveAdminService, private zoneVilleRegionReleveService: ZoneVilleRegionReleveAdminService){
		this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
	}

    ngOnInit(): void {
    }



    public hideViewDialog() {
        this.viewDialog = false;
    }

    get items(): Array<ZoneVilleReleveDto> {
        return this.service.items;
    }

    set items(value: Array<ZoneVilleReleveDto>) {
        this.service.items = value;
    }

    get item(): ZoneVilleReleveDto {
        return this.service.item;
    }

    set item(value: ZoneVilleReleveDto) {
        this.service.item = value;
    }

    get viewDialog(): boolean {
        return this.service.viewDialog;
    }

    set viewDialog(value: boolean) {
        this.service.viewDialog = value;
    }

    get criteria(): ZoneVilleReleveCriteria {
        return this.service.criteria;
    }

    set criteria(value: ZoneVilleReleveCriteria) {
        this.service.criteria = value;
    }

    get dateFormat(){
        return environment.dateFormatView;
    }

    get dateFormatColumn(){
        return environment.dateFormatList;
    }


}

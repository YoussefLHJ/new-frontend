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


import {ZoneVilleRegionReleveAdminService} from 'src/app/shared/service/admin/releve/ZoneVilleRegionReleveAdmin.service';
import {ZoneVilleRegionReleveDto} from 'src/app/shared/model/releve/ZoneVilleRegionReleve.model';
import {ZoneVilleRegionReleveCriteria} from 'src/app/shared/criteria/releve/ZoneVilleRegionReleveCriteria.model';

import {ZoneAgenceReleveDto} from 'src/app/shared/model/releve/ZoneAgenceReleve.model';
import {ZoneAgenceReleveAdminService} from 'src/app/shared/service/admin/releve/ZoneAgenceReleveAdmin.service';
import {ZoneVilleReleveDto} from 'src/app/shared/model/releve/ZoneVilleReleve.model';
import {ZoneVilleReleveAdminService} from 'src/app/shared/service/admin/releve/ZoneVilleReleveAdmin.service';
import {UniteReleveDto} from 'src/app/shared/model/releve/UniteReleve.model';
import {UniteReleveAdminService} from 'src/app/shared/service/admin/releve/UniteReleveAdmin.service';
@Component({
  selector: 'app-zone-ville-region-releve-view-admin',
  standalone: false,
  templateUrl: './zone-ville-region-releve-view-admin.component.html'
})
export class ZoneVilleRegionReleveViewAdminComponent implements OnInit {


	protected _submitted = false;
    protected _errorMessages = new Array<string>();

    protected datePipe: DatePipe;
    protected messageService: MessageService;
    protected confirmationService: ConfirmationService;
    protected roleService: RoleService;
    protected router: Router;
    protected stringUtilService: StringUtilService;


    zoneAgenceReleves = new ZoneAgenceReleveDto();
    zoneAgenceRelevess: Array<ZoneAgenceReleveDto> = [];

    constructor(private service: ZoneVilleRegionReleveAdminService, private zoneAgenceReleveService: ZoneAgenceReleveAdminService, private zoneVilleReleveService: ZoneVilleReleveAdminService){
		this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
	}

    ngOnInit(): void {
    }


    get zoneVilleReleve(): ZoneVilleReleveDto {
        return this.zoneVilleReleveService.item;
    }
    set zoneVilleReleve(value: ZoneVilleReleveDto) {
        this.zoneVilleReleveService.item = value;
    }
    get zoneVilleReleves(): Array<ZoneVilleReleveDto> {
        return this.zoneVilleReleveService.items;
    }
    set zoneVilleReleves(value: Array<ZoneVilleReleveDto>) {
        this.zoneVilleReleveService.items = value;
    }

    public hideViewDialog() {
        this.viewDialog = false;
    }

    get items(): Array<ZoneVilleRegionReleveDto> {
        return this.service.items;
    }

    set items(value: Array<ZoneVilleRegionReleveDto>) {
        this.service.items = value;
    }

    get item(): ZoneVilleRegionReleveDto {
        return this.service.item;
    }

    set item(value: ZoneVilleRegionReleveDto) {
        this.service.item = value;
    }

    get viewDialog(): boolean {
        return this.service.viewDialog;
    }

    set viewDialog(value: boolean) {
        this.service.viewDialog = value;
    }

    get criteria(): ZoneVilleRegionReleveCriteria {
        return this.service.criteria;
    }

    set criteria(value: ZoneVilleRegionReleveCriteria) {
        this.service.criteria = value;
    }

    get dateFormat(){
        return environment.dateFormatView;
    }

    get dateFormatColumn(){
        return environment.dateFormatList;
    }


}

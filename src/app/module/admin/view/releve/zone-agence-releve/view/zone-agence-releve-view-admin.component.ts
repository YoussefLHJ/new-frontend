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


import {ZoneAgenceReleveAdminService} from 'src/app/shared/service/admin/releve/ZoneAgenceReleveAdmin.service';
import {ZoneAgenceReleveDto} from 'src/app/shared/model/releve/ZoneAgenceReleve.model';
import {ZoneAgenceReleveCriteria} from 'src/app/shared/criteria/releve/ZoneAgenceReleveCriteria.model';

import {UniteReleveDto} from 'src/app/shared/model/releve/UniteReleve.model';
import {UniteReleveAdminService} from 'src/app/shared/service/admin/releve/UniteReleveAdmin.service';
import {ZoneVilleRegionReleveDto} from 'src/app/shared/model/releve/ZoneVilleRegionReleve.model';
import {ZoneVilleRegionReleveAdminService} from 'src/app/shared/service/admin/releve/ZoneVilleRegionReleveAdmin.service';
import {LotReleveDto} from 'src/app/shared/model/releve/LotReleve.model';
import {LotReleveAdminService} from 'src/app/shared/service/admin/releve/LotReleveAdmin.service';
@Component({
  selector: 'app-zone-agence-releve-view-admin',
  standalone: false,
  templateUrl: './zone-agence-releve-view-admin.component.html'
})
export class ZoneAgenceReleveViewAdminComponent implements OnInit {


	protected _submitted = false;
    protected _errorMessages = new Array<string>();

    protected datePipe: DatePipe;
    protected messageService: MessageService;
    protected confirmationService: ConfirmationService;
    protected roleService: RoleService;
    protected router: Router;
    protected stringUtilService: StringUtilService;


    uniteReleves = new UniteReleveDto();
    uniteRelevess: Array<UniteReleveDto> = [];

    constructor(private service: ZoneAgenceReleveAdminService, private uniteReleveService: UniteReleveAdminService, private zoneVilleRegionReleveService: ZoneVilleRegionReleveAdminService){
		this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
	}

    ngOnInit(): void {
    }


    get zoneVilleRegionReleve(): ZoneVilleRegionReleveDto {
        return this.zoneVilleRegionReleveService.item;
    }
    set zoneVilleRegionReleve(value: ZoneVilleRegionReleveDto) {
        this.zoneVilleRegionReleveService.item = value;
    }
    get zoneVilleRegionReleves(): Array<ZoneVilleRegionReleveDto> {
        return this.zoneVilleRegionReleveService.items;
    }
    set zoneVilleRegionReleves(value: Array<ZoneVilleRegionReleveDto>) {
        this.zoneVilleRegionReleveService.items = value;
    }

    public hideViewDialog() {
        this.viewDialog = false;
    }

    get items(): Array<ZoneAgenceReleveDto> {
        return this.service.items;
    }

    set items(value: Array<ZoneAgenceReleveDto>) {
        this.service.items = value;
    }

    get item(): ZoneAgenceReleveDto {
        return this.service.item;
    }

    set item(value: ZoneAgenceReleveDto) {
        this.service.item = value;
    }

    get viewDialog(): boolean {
        return this.service.viewDialog;
    }

    set viewDialog(value: boolean) {
        this.service.viewDialog = value;
    }

    get criteria(): ZoneAgenceReleveCriteria {
        return this.service.criteria;
    }

    set criteria(value: ZoneAgenceReleveCriteria) {
        this.service.criteria = value;
    }

    get dateFormat(){
        return environment.dateFormatView;
    }

    get dateFormatColumn(){
        return environment.dateFormatList;
    }


}

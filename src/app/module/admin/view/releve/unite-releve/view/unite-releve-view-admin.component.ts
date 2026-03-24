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


import {UniteReleveAdminService} from 'src/app/shared/service/admin/releve/UniteReleveAdmin.service';
import {UniteReleveDto} from 'src/app/shared/model/releve/UniteReleve.model';
import {UniteReleveCriteria} from 'src/app/shared/criteria/releve/UniteReleveCriteria.model';

import {ZoneAgenceReleveDto} from 'src/app/shared/model/releve/ZoneAgenceReleve.model';
import {ZoneAgenceReleveAdminService} from 'src/app/shared/service/admin/releve/ZoneAgenceReleveAdmin.service';
import {BatimentDto} from 'src/app/shared/model/config/Batiment.model';
import {BatimentAdminService} from 'src/app/shared/service/admin/config/BatimentAdmin.service';
import {LotReleveDto} from 'src/app/shared/model/releve/LotReleve.model';
import {LotReleveAdminService} from 'src/app/shared/service/admin/releve/LotReleveAdmin.service';
@Component({
  selector: 'app-unite-releve-view-admin',
  standalone: false,
  templateUrl: './unite-releve-view-admin.component.html'
})
export class UniteReleveViewAdminComponent implements OnInit {


	protected _submitted = false;
    protected _errorMessages = new Array<string>();

    protected datePipe: DatePipe;
    protected messageService: MessageService;
    protected confirmationService: ConfirmationService;
    protected roleService: RoleService;
    protected router: Router;
    protected stringUtilService: StringUtilService;


    lotReleves = new LotReleveDto();
    lotRelevess: Array<LotReleveDto> = [];

    constructor(private service: UniteReleveAdminService, private zoneAgenceReleveService: ZoneAgenceReleveAdminService, private lotReleveService: LotReleveAdminService){
		this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
	}

    ngOnInit(): void {
    }


    get zoneAgenceReleve(): ZoneAgenceReleveDto {
        return this.zoneAgenceReleveService.item;
    }
    set zoneAgenceReleve(value: ZoneAgenceReleveDto) {
        this.zoneAgenceReleveService.item = value;
    }
    get zoneAgenceReleves(): Array<ZoneAgenceReleveDto> {
        return this.zoneAgenceReleveService.items;
    }
    set zoneAgenceReleves(value: Array<ZoneAgenceReleveDto>) {
        this.zoneAgenceReleveService.items = value;
    }

    public hideViewDialog() {
        this.viewDialog = false;
    }

    get items(): Array<UniteReleveDto> {
        return this.service.items;
    }

    set items(value: Array<UniteReleveDto>) {
        this.service.items = value;
    }

    get item(): UniteReleveDto {
        return this.service.item;
    }

    set item(value: UniteReleveDto) {
        this.service.item = value;
    }

    get viewDialog(): boolean {
        return this.service.viewDialog;
    }

    set viewDialog(value: boolean) {
        this.service.viewDialog = value;
    }

    get criteria(): UniteReleveCriteria {
        return this.service.criteria;
    }

    set criteria(value: UniteReleveCriteria) {
        this.service.criteria = value;
    }

    get dateFormat(){
        return environment.dateFormatView;
    }

    get dateFormatColumn(){
        return environment.dateFormatList;
    }


}

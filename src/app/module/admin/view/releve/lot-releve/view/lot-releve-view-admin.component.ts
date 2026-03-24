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


import {LotReleveAdminService} from 'src/app/shared/service/admin/releve/LotReleveAdmin.service';
import {LotReleveDto} from 'src/app/shared/model/releve/LotReleve.model';
import {LotReleveCriteria} from 'src/app/shared/criteria/releve/LotReleveCriteria.model';

import {CommuneDto} from 'src/app/shared/model/config/Commune.model';
import {CommuneAdminService} from 'src/app/shared/service/admin/config/CommuneAdmin.service';
import {AppareilDto} from 'src/app/shared/model/config/Appareil.model';
import {AppareilAdminService} from 'src/app/shared/service/admin/config/AppareilAdmin.service';
import {UniteReleveDto} from 'src/app/shared/model/releve/UniteReleve.model';
import {UniteReleveAdminService} from 'src/app/shared/service/admin/releve/UniteReleveAdmin.service';
import {BatimentDto} from 'src/app/shared/model/config/Batiment.model';
import {BatimentAdminService} from 'src/app/shared/service/admin/config/BatimentAdmin.service';
@Component({
  selector: 'app-lot-releve-view-admin',
  standalone: false,
  templateUrl: './lot-releve-view-admin.component.html'
})
export class LotReleveViewAdminComponent implements OnInit {


	protected _submitted = false;
    protected _errorMessages = new Array<string>();

    protected datePipe: DatePipe;
    protected messageService: MessageService;
    protected confirmationService: ConfirmationService;
    protected roleService: RoleService;
    protected router: Router;
    protected stringUtilService: StringUtilService;


    batiments = new BatimentDto();
    batimentss: Array<BatimentDto> = [];

    constructor(private service: LotReleveAdminService, private communeService: CommuneAdminService, private uniteReleveService: UniteReleveAdminService, private batimentService: BatimentAdminService){
		this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
	}

    ngOnInit(): void {
    }


    get uniteReleve(): UniteReleveDto {
        return this.uniteReleveService.item;
    }
    set uniteReleve(value: UniteReleveDto) {
        this.uniteReleveService.item = value;
    }
    get uniteReleves(): Array<UniteReleveDto> {
        return this.uniteReleveService.items;
    }
    set uniteReleves(value: Array<UniteReleveDto>) {
        this.uniteReleveService.items = value;
    }
    get commune(): CommuneDto {
        return this.communeService.item;
    }
    set commune(value: CommuneDto) {
        this.communeService.item = value;
    }
    get communes(): Array<CommuneDto> {
        return this.communeService.items;
    }
    set communes(value: Array<CommuneDto>) {
        this.communeService.items = value;
    }

    public hideViewDialog() {
        this.viewDialog = false;
    }

    get items(): Array<LotReleveDto> {
        return this.service.items;
    }

    set items(value: Array<LotReleveDto>) {
        this.service.items = value;
    }

    get item(): LotReleveDto {
        return this.service.item;
    }

    set item(value: LotReleveDto) {
        this.service.item = value;
    }

    get viewDialog(): boolean {
        return this.service.viewDialog;
    }

    set viewDialog(value: boolean) {
        this.service.viewDialog = value;
    }

    get criteria(): LotReleveCriteria {
        return this.service.criteria;
    }

    set criteria(value: LotReleveCriteria) {
        this.service.criteria = value;
    }

    get dateFormat(){
        return environment.dateFormatView;
    }

    get dateFormatColumn(){
        return environment.dateFormatList;
    }


}

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


import {BatimentAdminService} from 'src/app/shared/service/admin/core/BatimentAdmin.service';
import {BatimentDto} from 'src/app/shared/model/core/Batiment.model';
import {BatimentCriteria} from 'src/app/shared/criteria/core/BatimentCriteria.model';

import {CommuneDto} from 'src/app/shared/model/config/Commune.model';
import {CommuneAdminService} from 'src/app/shared/service/admin/config/CommuneAdmin.service';
import {AppareilDto} from 'src/app/shared/model/core/Appareil.model';
import {AppareilAdminService} from 'src/app/shared/service/admin/core/AppareilAdmin.service';
@Component({
  selector: 'app-batiment-view-admin',
  standalone: false,
  templateUrl: './batiment-view-admin.component.html'
})
export class BatimentViewAdminComponent implements OnInit {


	protected _submitted = false;
    protected _errorMessages = new Array<string>();

    protected datePipe: DatePipe;
    protected messageService: MessageService;
    protected confirmationService: ConfirmationService;
    protected roleService: RoleService;
    protected router: Router;
    protected stringUtilService: StringUtilService;


    appareils = new AppareilDto();
    appareilss: Array<AppareilDto> = [];

    constructor(private service: BatimentAdminService, private communeService: CommuneAdminService, private appareilService: AppareilAdminService){
		this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
	}

    ngOnInit(): void {
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

    get items(): Array<BatimentDto> {
        return this.service.items;
    }

    set items(value: Array<BatimentDto>) {
        this.service.items = value;
    }

    get item(): BatimentDto {
        return this.service.item;
    }

    set item(value: BatimentDto) {
        this.service.item = value;
    }

    get viewDialog(): boolean {
        return this.service.viewDialog;
    }

    set viewDialog(value: boolean) {
        this.service.viewDialog = value;
    }

    get criteria(): BatimentCriteria {
        return this.service.criteria;
    }

    set criteria(value: BatimentCriteria) {
        this.service.criteria = value;
    }

    get dateFormat(){
        return environment.dateFormatView;
    }

    get dateFormatColumn(){
        return environment.dateFormatList;
    }


}

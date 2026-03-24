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


import {AppareilAdminService} from 'src/app/shared/service/admin/config/AppareilAdmin.service';
import {AppareilDto} from 'src/app/shared/model/config/Appareil.model';
import {AppareilCriteria} from 'src/app/shared/criteria/config/AppareilCriteria.model';

import {BatimentDto} from 'src/app/shared/model/config/Batiment.model';
import {BatimentAdminService} from 'src/app/shared/service/admin/config/BatimentAdmin.service';
@Component({
  selector: 'app-appareil-view-admin',
  standalone: false,
  templateUrl: './appareil-view-admin.component.html'
})
export class AppareilViewAdminComponent implements OnInit {


	protected _submitted = false;
    protected _errorMessages = new Array<string>();

    protected datePipe: DatePipe;
    protected messageService: MessageService;
    protected confirmationService: ConfirmationService;
    protected roleService: RoleService;
    protected router: Router;
    protected stringUtilService: StringUtilService;



    constructor(private service: AppareilAdminService, private batimentService: BatimentAdminService){
		this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
	}

    ngOnInit(): void {
    }


    get batiment(): BatimentDto {
        return this.batimentService.item;
    }
    set batiment(value: BatimentDto) {
        this.batimentService.item = value;
    }
    get batiments(): Array<BatimentDto> {
        return this.batimentService.items;
    }
    set batiments(value: Array<BatimentDto>) {
        this.batimentService.items = value;
    }

    public hideViewDialog() {
        this.viewDialog = false;
    }

    get items(): Array<AppareilDto> {
        return this.service.items;
    }

    set items(value: Array<AppareilDto>) {
        this.service.items = value;
    }

    get item(): AppareilDto {
        return this.service.item;
    }

    set item(value: AppareilDto) {
        this.service.item = value;
    }

    get viewDialog(): boolean {
        return this.service.viewDialog;
    }

    set viewDialog(value: boolean) {
        this.service.viewDialog = value;
    }

    get criteria(): AppareilCriteria {
        return this.service.criteria;
    }

    set criteria(value: AppareilCriteria) {
        this.service.criteria = value;
    }

    get dateFormat(){
        return environment.dateFormatView;
    }

    get dateFormatColumn(){
        return environment.dateFormatList;
    }


}

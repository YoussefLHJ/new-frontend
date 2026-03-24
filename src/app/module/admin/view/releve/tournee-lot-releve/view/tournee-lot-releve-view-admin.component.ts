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


import {TourneeLotReleveAdminService} from 'src/app/shared/service/admin/releve/TourneeLotReleveAdmin.service';
import {TourneeLotReleveDto} from 'src/app/shared/model/releve/TourneeLotReleve.model';
import {TourneeLotReleveCriteria} from 'src/app/shared/criteria/releve/TourneeLotReleveCriteria.model';

import {TourneeReleveDetailDto} from 'src/app/shared/model/releve/TourneeReleveDetail.model';
import {TourneeReleveDetailAdminService} from 'src/app/shared/service/admin/releve/TourneeReleveDetailAdmin.service';
import {LotReleveDto} from 'src/app/shared/model/releve/LotReleve.model';
import {LotReleveAdminService} from 'src/app/shared/service/admin/releve/LotReleveAdmin.service';
import {TourneeReleveCompteurDto} from 'src/app/shared/model/releve/TourneeReleveCompteur.model';
import {TourneeReleveCompteurAdminService} from 'src/app/shared/service/admin/releve/TourneeReleveCompteurAdmin.service';
@Component({
  selector: 'app-tournee-lot-releve-view-admin',
  standalone: false,
  templateUrl: './tournee-lot-releve-view-admin.component.html'
})
export class TourneeLotReleveViewAdminComponent implements OnInit {


	protected _submitted = false;
    protected _errorMessages = new Array<string>();

    protected datePipe: DatePipe;
    protected messageService: MessageService;
    protected confirmationService: ConfirmationService;
    protected roleService: RoleService;
    protected router: Router;
    protected stringUtilService: StringUtilService;


    tourneeReleveDetails = new TourneeReleveDetailDto();
    tourneeReleveDetailss: Array<TourneeReleveDetailDto> = [];

    constructor(private service: TourneeLotReleveAdminService, private tourneeReleveDetailService: TourneeReleveDetailAdminService, private lotReleveService: LotReleveAdminService){
		this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
	}

    ngOnInit(): void {
    }


    get lotReleve(): LotReleveDto {
        return this.lotReleveService.item;
    }
    set lotReleve(value: LotReleveDto) {
        this.lotReleveService.item = value;
    }
    get lotReleves(): Array<LotReleveDto> {
        return this.lotReleveService.items;
    }
    set lotReleves(value: Array<LotReleveDto>) {
        this.lotReleveService.items = value;
    }

    public hideViewDialog() {
        this.viewDialog = false;
    }

    get items(): Array<TourneeLotReleveDto> {
        return this.service.items;
    }

    set items(value: Array<TourneeLotReleveDto>) {
        this.service.items = value;
    }

    get item(): TourneeLotReleveDto {
        return this.service.item;
    }

    set item(value: TourneeLotReleveDto) {
        this.service.item = value;
    }

    get viewDialog(): boolean {
        return this.service.viewDialog;
    }

    set viewDialog(value: boolean) {
        this.service.viewDialog = value;
    }

    get criteria(): TourneeLotReleveCriteria {
        return this.service.criteria;
    }

    set criteria(value: TourneeLotReleveCriteria) {
        this.service.criteria = value;
    }

    get dateFormat(){
        return environment.dateFormatView;
    }

    get dateFormatColumn(){
        return environment.dateFormatList;
    }


}

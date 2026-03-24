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


import {TourneeReleveDetailAdminService} from 'src/app/shared/service/admin/releve/TourneeReleveDetailAdmin.service';
import {TourneeReleveDetailDto} from 'src/app/shared/model/releve/TourneeReleveDetail.model';
import {TourneeReleveDetailCriteria} from 'src/app/shared/criteria/releve/TourneeReleveDetailCriteria.model';

import {TourneeLotReleveDto} from 'src/app/shared/model/releve/TourneeLotReleve.model';
import {TourneeLotReleveAdminService} from 'src/app/shared/service/admin/releve/TourneeLotReleveAdmin.service';
import {AppareilDto} from 'src/app/shared/model/config/Appareil.model';
import {AppareilAdminService} from 'src/app/shared/service/admin/config/AppareilAdmin.service';
import {LotReleveDto} from 'src/app/shared/model/releve/LotReleve.model';
import {LotReleveAdminService} from 'src/app/shared/service/admin/releve/LotReleveAdmin.service';
import {TourneeReleveCompteurDto} from 'src/app/shared/model/releve/TourneeReleveCompteur.model';
import {TourneeReleveCompteurAdminService} from 'src/app/shared/service/admin/releve/TourneeReleveCompteurAdmin.service';
@Component({
  selector: 'app-tournee-releve-detail-view-admin',
  standalone: false,
  templateUrl: './tournee-releve-detail-view-admin.component.html'
})
export class TourneeReleveDetailViewAdminComponent implements OnInit {


	protected _submitted = false;
    protected _errorMessages = new Array<string>();

    protected datePipe: DatePipe;
    protected messageService: MessageService;
    protected confirmationService: ConfirmationService;
    protected roleService: RoleService;
    protected router: Router;
    protected stringUtilService: StringUtilService;


    tourneeReleveCompteurs = new TourneeReleveCompteurDto();
    tourneeReleveCompteurss: Array<TourneeReleveCompteurDto> = [];

    constructor(private service: TourneeReleveDetailAdminService, private tourneeLotReleveService: TourneeLotReleveAdminService, private appareilService: AppareilAdminService, private lotReleveService: LotReleveAdminService, private tourneeReleveCompteurService: TourneeReleveCompteurAdminService){
		this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
	}

    ngOnInit(): void {
    }


    get tourneeLotReleve(): TourneeLotReleveDto {
        return this.tourneeLotReleveService.item;
    }
    set tourneeLotReleve(value: TourneeLotReleveDto) {
        this.tourneeLotReleveService.item = value;
    }
    get tourneeLotReleves(): Array<TourneeLotReleveDto> {
        return this.tourneeLotReleveService.items;
    }
    set tourneeLotReleves(value: Array<TourneeLotReleveDto>) {
        this.tourneeLotReleveService.items = value;
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

    get items(): Array<TourneeReleveDetailDto> {
        return this.service.items;
    }

    set items(value: Array<TourneeReleveDetailDto>) {
        this.service.items = value;
    }

    get item(): TourneeReleveDetailDto {
        return this.service.item;
    }

    set item(value: TourneeReleveDetailDto) {
        this.service.item = value;
    }

    get viewDialog(): boolean {
        return this.service.viewDialog;
    }

    set viewDialog(value: boolean) {
        this.service.viewDialog = value;
    }

    get criteria(): TourneeReleveDetailCriteria {
        return this.service.criteria;
    }

    set criteria(value: TourneeReleveDetailCriteria) {
        this.service.criteria = value;
    }

    get dateFormat(){
        return environment.dateFormatView;
    }

    get dateFormatColumn(){
        return environment.dateFormatList;
    }


}

import {Component, OnInit, Input} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import {FileTempDto} from 'src/app/zynerator/dto/FileTempDto.model';
import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {Inject, Injectable, PLATFORM_ID} from '@angular/core';

import {environment} from 'src/environments/environment';

import {RoleService} from 'src/app/zynerator/security/shared/service/Role.service';
import {StringUtilService} from 'src/app/zynerator/util/StringUtil.service';
import {ServiceLocator} from 'src/app/zynerator/service/ServiceLocator';




import {TourneeReleveCompteurAdminService} from 'src/app/shared/service/admin/releve/TourneeReleveCompteurAdmin.service';
import {TourneeReleveCompteurDto} from 'src/app/shared/model/releve/TourneeReleveCompteur.model';
import {TourneeReleveCompteurCriteria} from 'src/app/shared/criteria/releve/TourneeReleveCompteurCriteria.model';


import {AppareilDto} from 'src/app/shared/model/config/Appareil.model';
import {AppareilAdminService} from 'src/app/shared/service/admin/config/AppareilAdmin.service';
import {TourneeReleveDetailDto} from 'src/app/shared/model/releve/TourneeReleveDetail.model';
import {TourneeReleveDetailAdminService} from 'src/app/shared/service/admin/releve/TourneeReleveDetailAdmin.service';

@Component({
  selector: 'app-tournee-releve-compteur-edit-admin',
  standalone: false,
  templateUrl: './tournee-releve-compteur-edit-admin.component.html'
})
export class TourneeReleveCompteurEditAdminComponent implements OnInit {

	protected _submitted = false;
    protected _errorMessages = new Array<string>();


    protected datePipe: DatePipe;
    protected messageService: MessageService;
    protected confirmationService: ConfirmationService;
    protected roleService: RoleService;
    protected router: Router;
    protected stringUtilService: StringUtilService;
    private _activeTab = 0;
    private _file: any;
    private _files: any;




    private _validAppareilNumeroAppareil = true;



    constructor(private service: TourneeReleveCompteurAdminService , private appareilService: AppareilAdminService, private tourneeReleveDetailService: TourneeReleveDetailAdminService, @Inject(PLATFORM_ID) private platformId?) {
        this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
    }

    ngOnInit(): void {
        this.appareilService.findAll().subscribe((data) => this.appareils = data);
        this.tourneeReleveDetailService.findAll().subscribe((data) => this.tourneeReleveDetails = data);
    }

    public prepareEdit() {
    }



 public edit(): void {
        this.submitted = true;
        this.prepareEdit();
        this.validateForm();
        if (this.errorMessages.length === 0) {
            this.editWithShowOption(false);
        } else {
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs sur le formulaire'
            });
        }
    }

    public editWithShowOption(showList: boolean) {
        this.service.edit().subscribe(religion=>{
            const myIndex = this.items.findIndex(e => e.id === this.item.id);
            this.items[myIndex] = religion;
            this.editDialog = false;
            this.submitted = false;
            this.item = new TourneeReleveCompteurDto();
        } , error =>{
            console.log(error);
        });
    }

    public hideEditDialog() {
        this.editDialog = false;
        this.setValidation(true);
    }





    public setValidation(value: boolean){
    }


    public validateForm(): void{
        this.errorMessages = new Array<string>();
    }




   public async openCreateTourneeReleveDetail(tourneeReleveDetail: string) {
        const isPermistted = await this.roleService.isPermitted('TourneeReleveDetail', 'edit');
        if (isPermistted) {
             this.tourneeReleveDetail = new TourneeReleveDetailDto();
             this.createTourneeReleveDetailDialog = true;
        }else {
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
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
    get createTourneeReleveDetailDialog(): boolean {
        return this.tourneeReleveDetailService.createDialog;
    }
    set createTourneeReleveDetailDialog(value: boolean) {
        this.tourneeReleveDetailService.createDialog= value;
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
    get createAppareilDialog(): boolean {
        return this.appareilService.createDialog;
    }
    set createAppareilDialog(value: boolean) {
        this.appareilService.createDialog= value;
    }



    get validAppareilNumeroAppareil(): boolean {
        return this._validAppareilNumeroAppareil;
    }
    set validAppareilNumeroAppareil(value: boolean) {
        this._validAppareilNumeroAppareil = value;
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

    get editDialog(): boolean {
        return this.service.editDialog;
    }

    set editDialog(value: boolean) {
        this.service.editDialog = value;
    }

    get criteria(): TourneeReleveCompteurCriteria {
        return this.service.criteria;
    }

    set criteria(value: TourneeReleveCompteurCriteria) {
        this.service.criteria = value;
    }

    get dateFormat() {
        return environment.dateFormatCreate;
    }

    get dateFormatColumn() {
        return environment.dateFormatCreate;
    }

    get submitted(): boolean {
        return this._submitted;
    }

    set submitted(value: boolean) {
        this._submitted = value;
    }

    get errorMessages(): string[] {
        if (this._errorMessages == null) {
            this._errorMessages = new Array<string>();
        }
        return this._errorMessages;
    }

    set errorMessages(value: string[]) {
        this._errorMessages = value;
    }

    get validate(): boolean {
        return this.service.validate;
    }

    set validate(value: boolean) {
        this.service.validate = value;
    }


    get activeTab(): number {
        return this._activeTab;
    }

    set activeTab(value: number) {
        this._activeTab = value;
    }


}

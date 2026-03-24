import {Component, OnInit, Input} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';

import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {Inject, Injectable, PLATFORM_ID} from '@angular/core';


import {environment} from 'src/environments/environment';

import {RoleService} from 'src/app/zynerator/security/shared/service/Role.service';
import {StringUtilService} from 'src/app/zynerator/util/StringUtil.service';
import {ServiceLocator} from 'src/app/zynerator/service/ServiceLocator';




import {ZoneVilleReleveAdminService} from 'src/app/shared/service/admin/releve/ZoneVilleReleveAdmin.service';
import {ZoneVilleReleveDto} from 'src/app/shared/model/releve/ZoneVilleReleve.model';
import {ZoneVilleReleveCriteria} from 'src/app/shared/criteria/releve/ZoneVilleReleveCriteria.model';
import {ZoneAgenceReleveDto} from 'src/app/shared/model/releve/ZoneAgenceReleve.model';
import {ZoneAgenceReleveAdminService} from 'src/app/shared/service/admin/releve/ZoneAgenceReleveAdmin.service';
import {ZoneVilleRegionReleveDto} from 'src/app/shared/model/releve/ZoneVilleRegionReleve.model';
import {ZoneVilleRegionReleveAdminService} from 'src/app/shared/service/admin/releve/ZoneVilleRegionReleveAdmin.service';
@Component({
  selector: 'app-zone-ville-releve-create-admin',
  standalone: false,
  templateUrl: './zone-ville-releve-create-admin.component.html'
})
export class ZoneVilleReleveCreateAdminComponent  implements OnInit {

	protected _submitted = false;
    protected _errorMessages = new Array<string>();

    protected datePipe: DatePipe;
    protected messageService: MessageService;
    protected confirmationService: ConfirmationService;
    protected roleService: RoleService;
    protected router: Router;
    protected stringUtilService: StringUtilService;
    private _activeTab = 0;
    protected zoneVilleRegionRelevesIndex = -1;

    private _zoneVilleRegionRelevesElement = new ZoneVilleRegionReleveDto();


   private _validZoneVilleReleveNumero = true;
   private _validZoneVilleReleveLibelle = true;
    private _validZoneVilleRegionRelevesNumero = true;
    private _validZoneVilleRegionRelevesLibelle = true;

	constructor(private service: ZoneVilleReleveAdminService , private zoneVilleRegionReleveService: ZoneVilleRegionReleveAdminService, @Inject(PLATFORM_ID) private platformId? ) {
        this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
    }

    ngOnInit(): void {
    }



    public save(): void {
        this.submitted = true;
        this.validateForm();
        if (this.errorMessages.length === 0) {
            this.saveWithShowOption(false);
        } else {
            this.messageService.add({severity: 'error',summary: 'Erreurs',detail: 'Merci de corrigé les erreurs sur le formulaire'});
        }
    }

    public saveWithShowOption(showList: boolean) {
        this.service.save().subscribe(item => {
            if (item != null) {
                this.items.push({...item});
                this.createDialog = false;
                this.submitted = false;
                this.item = new ZoneVilleReleveDto();
            } else {
                this.messageService.add({severity: 'error', summary: 'Erreurs', detail: 'Element existant'});
            }

        }, error => {
            console.log(error);
        });
    }


    public hideCreateDialog() {
        this.createDialog = false;
        this.setValidation(true);
    }



    validateZoneVilleRegionReleves(){
        this.errorMessages = new Array();
        this.validateZoneVilleRegionRelevesNumero();
        this.validateZoneVilleRegionRelevesLibelle();
    }


    public  setValidation(value: boolean){
        this.validZoneVilleReleveNumero = value;
        this.validZoneVilleReleveLibelle = value;
        this.validZoneVilleRegionRelevesNumero = value;
        this.validZoneVilleRegionRelevesLibelle = value;
    }

    public addZoneVilleRegionReleves() {
        if( this.item.zoneVilleRegionReleves == null )
            this.item.zoneVilleRegionReleves = new Array<ZoneVilleRegionReleveDto>();

       this.validateZoneVilleRegionReleves();

       if (this.errorMessages.length === 0) {
            if (this.zoneVilleRegionRelevesIndex == -1){
                this.item.zoneVilleRegionReleves.push({... this.zoneVilleRegionRelevesElement});
            }else {
                this.item.zoneVilleRegionReleves[this.zoneVilleRegionRelevesIndex] =this.zoneVilleRegionRelevesElement;
            }
              this.zoneVilleRegionRelevesElement = new ZoneVilleRegionReleveDto();
              this.zoneVilleRegionRelevesIndex = -1;
       }else{
           this.messageService.add({severity: 'error',summary: 'Erreurs',detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages});
       }
    }

    public deleteZoneVilleRegionReleves(p: ZoneVilleRegionReleveDto, index: number) {
        this.item.zoneVilleRegionReleves.splice(index, 1);
    }

    public editZoneVilleRegionReleves(p: ZoneVilleRegionReleveDto, index: number) {
        this.zoneVilleRegionRelevesElement = {... p};
        this.zoneVilleRegionRelevesIndex = index;
        this.activeTab = 0;
    }


    public  validateForm(): void{
        this.errorMessages = new Array<string>();
        this.validateZoneVilleReleveNumero();
        this.validateZoneVilleReleveLibelle();
    }

    public validateZoneVilleReleveNumero(){
        if (this.stringUtilService.isEmpty(this.item.numero)) {
        this.errorMessages.push('Numero non valide');
        this.validZoneVilleReleveNumero = false;
        } else {
            this.validZoneVilleReleveNumero = true;
        }
    }
    public validateZoneVilleReleveLibelle(){
        if (this.stringUtilService.isEmpty(this.item.libelle)) {
        this.errorMessages.push('Libelle non valide');
        this.validZoneVilleReleveLibelle = false;
        } else {
            this.validZoneVilleReleveLibelle = true;
        }
    }

    public validateZoneVilleRegionRelevesNumero(){
        if (this.zoneVilleRegionRelevesElement.numero == null) {
            this.errorMessages.push('Numero de la zoneVilleRegionReleve est  invalide');
            this.validZoneVilleRegionRelevesNumero = false;
        } else {
            this.validZoneVilleRegionRelevesNumero = true;
        }
    }
    public validateZoneVilleRegionRelevesLibelle(){
        if (this.zoneVilleRegionRelevesElement.libelle == null) {
            this.errorMessages.push('Libelle de la zoneVilleRegionReleve est  invalide');
            this.validZoneVilleRegionRelevesLibelle = false;
        } else {
            this.validZoneVilleRegionRelevesLibelle = true;
        }
    }





    get validZoneVilleReleveNumero(): boolean {
        return this._validZoneVilleReleveNumero;
    }

    set validZoneVilleReleveNumero(value: boolean) {
         this._validZoneVilleReleveNumero = value;
    }
    get validZoneVilleReleveLibelle(): boolean {
        return this._validZoneVilleReleveLibelle;
    }

    set validZoneVilleReleveLibelle(value: boolean) {
         this._validZoneVilleReleveLibelle = value;
    }

    get validZoneVilleRegionRelevesNumero(): boolean {
        return this._validZoneVilleRegionRelevesNumero;
    }
    set validZoneVilleRegionRelevesNumero(value: boolean) {
        this._validZoneVilleRegionRelevesNumero = value;
    }
    get validZoneVilleRegionRelevesLibelle(): boolean {
        return this._validZoneVilleRegionRelevesLibelle;
    }
    set validZoneVilleRegionRelevesLibelle(value: boolean) {
        this._validZoneVilleRegionRelevesLibelle = value;
    }

    get zoneVilleRegionRelevesElement(): ZoneVilleRegionReleveDto {
        if( this._zoneVilleRegionRelevesElement == null )
            this._zoneVilleRegionRelevesElement = new ZoneVilleRegionReleveDto();
        return this._zoneVilleRegionRelevesElement;
    }

    set zoneVilleRegionRelevesElement(value: ZoneVilleRegionReleveDto) {
        this._zoneVilleRegionRelevesElement = value;
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

    get createDialog(): boolean {
        return this.service.createDialog;
    }

    set createDialog(value: boolean) {
        this.service.createDialog = value;
    }

    get criteria(): ZoneVilleReleveCriteria {
        return this.service.criteria;
    }

    set criteria(value: ZoneVilleReleveCriteria) {
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

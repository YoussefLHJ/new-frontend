import {Component, OnInit, Input} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';

import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {Inject, Injectable, PLATFORM_ID} from '@angular/core';


import {environment} from 'src/environments/environment';

import {RoleService} from 'src/app/zynerator/security/shared/service/Role.service';
import {StringUtilService} from 'src/app/zynerator/util/StringUtil.service';
import {ServiceLocator} from 'src/app/zynerator/service/ServiceLocator';




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
  selector: 'app-zone-ville-region-releve-create-admin',
  standalone: false,
  templateUrl: './zone-ville-region-releve-create-admin.component.html'
})
export class ZoneVilleRegionReleveCreateAdminComponent  implements OnInit {

	protected _submitted = false;
    protected _errorMessages = new Array<string>();

    protected datePipe: DatePipe;
    protected messageService: MessageService;
    protected confirmationService: ConfirmationService;
    protected roleService: RoleService;
    protected router: Router;
    protected stringUtilService: StringUtilService;
    private _activeTab = 0;
    protected zoneAgenceRelevesIndex = -1;

    private _zoneAgenceRelevesElement = new ZoneAgenceReleveDto();


   private _validZoneVilleRegionReleveNumero = true;
   private _validZoneVilleRegionReleveLibelle = true;
    private _validZoneVilleReleveNumero = true;
    private _validZoneVilleReleveLibelle = true;
    private _validZoneAgenceRelevesNumero = true;
    private _validZoneAgenceRelevesLibelle = true;

	constructor(private service: ZoneVilleRegionReleveAdminService , private zoneAgenceReleveService: ZoneAgenceReleveAdminService, private zoneVilleReleveService: ZoneVilleReleveAdminService, @Inject(PLATFORM_ID) private platformId?: Object ) {
        this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
    }

    ngOnInit(): void {
        this.zoneVilleReleveService.findAll().subscribe((data) => this.zoneVilleReleves = data);
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
                this.item = new ZoneVilleRegionReleveDto();
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



    validateZoneAgenceReleves(){
        this.errorMessages = new Array();
        this.validateZoneAgenceRelevesNumero();
        this.validateZoneAgenceRelevesLibelle();
    }


    public  setValidation(value: boolean){
        this.validZoneVilleRegionReleveNumero = value;
        this.validZoneVilleRegionReleveLibelle = value;
        this.validZoneAgenceRelevesNumero = value;
        this.validZoneAgenceRelevesLibelle = value;
    }

    public addZoneAgenceReleves() {
        if( this.item.zoneAgenceReleves == null )
            this.item.zoneAgenceReleves = new Array<ZoneAgenceReleveDto>();

       this.validateZoneAgenceReleves();

       if (this.errorMessages.length === 0) {
            if (this.zoneAgenceRelevesIndex == -1){
                this.item.zoneAgenceReleves.push({... this.zoneAgenceRelevesElement});
            }else {
                this.item.zoneAgenceReleves[this.zoneAgenceRelevesIndex] =this.zoneAgenceRelevesElement;
            }
              this.zoneAgenceRelevesElement = new ZoneAgenceReleveDto();
              this.zoneAgenceRelevesIndex = -1;
       }else{
           this.messageService.add({severity: 'error',summary: 'Erreurs',detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages});
       }
    }

    public deleteZoneAgenceReleves(p: ZoneAgenceReleveDto, index: number) {
        this.item.zoneAgenceReleves.splice(index, 1);
    }

    public editZoneAgenceReleves(p: ZoneAgenceReleveDto, index: number) {
        this.zoneAgenceRelevesElement = {... p};
        this.zoneAgenceRelevesIndex = index;
        this.activeTab = 0;
    }


    public  validateForm(): void{
        this.errorMessages = new Array<string>();
        this.validateZoneVilleRegionReleveNumero();
        this.validateZoneVilleRegionReleveLibelle();
    }

    public validateZoneVilleRegionReleveNumero(){
        if (this.stringUtilService.isEmpty(this.item.numero)) {
        this.errorMessages.push('Numero non valide');
        this.validZoneVilleRegionReleveNumero = false;
        } else {
            this.validZoneVilleRegionReleveNumero = true;
        }
    }
    public validateZoneVilleRegionReleveLibelle(){
        if (this.stringUtilService.isEmpty(this.item.libelle)) {
        this.errorMessages.push('Libelle non valide');
        this.validZoneVilleRegionReleveLibelle = false;
        } else {
            this.validZoneVilleRegionReleveLibelle = true;
        }
    }

    public validateZoneAgenceRelevesNumero(){
        if (this.zoneAgenceRelevesElement.numero == null) {
            this.errorMessages.push('Numero de la zoneAgenceReleve est  invalide');
            this.validZoneAgenceRelevesNumero = false;
        } else {
            this.validZoneAgenceRelevesNumero = true;
        }
    }
    public validateZoneAgenceRelevesLibelle(){
        if (this.zoneAgenceRelevesElement.libelle == null) {
            this.errorMessages.push('Libelle de la zoneAgenceReleve est  invalide');
            this.validZoneAgenceRelevesLibelle = false;
        } else {
            this.validZoneAgenceRelevesLibelle = true;
        }
    }

    public async openCreateZoneVilleReleve(zoneVilleReleve: string) {
    const isPermistted = await this.roleService.isPermitted('ZoneVilleReleve', 'add');
    if(isPermistted) {
         this.zoneVilleReleve = new ZoneVilleReleveDto();
         this.createZoneVilleReleveDialog = true;
    }else{
        this.messageService.add({
        severity: 'error', summary: 'erreur', detail: 'problème de permission'
        });
     }
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
    get createZoneVilleReleveDialog(): boolean {
        return this.zoneVilleReleveService.createDialog;
    }
    set createZoneVilleReleveDialog(value: boolean) {
        this.zoneVilleReleveService.createDialog= value;
    }



    get validZoneVilleRegionReleveNumero(): boolean {
        return this._validZoneVilleRegionReleveNumero;
    }

    set validZoneVilleRegionReleveNumero(value: boolean) {
         this._validZoneVilleRegionReleveNumero = value;
    }
    get validZoneVilleRegionReleveLibelle(): boolean {
        return this._validZoneVilleRegionReleveLibelle;
    }

    set validZoneVilleRegionReleveLibelle(value: boolean) {
         this._validZoneVilleRegionReleveLibelle = value;
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
    get validZoneAgenceRelevesNumero(): boolean {
        return this._validZoneAgenceRelevesNumero;
    }
    set validZoneAgenceRelevesNumero(value: boolean) {
        this._validZoneAgenceRelevesNumero = value;
    }
    get validZoneAgenceRelevesLibelle(): boolean {
        return this._validZoneAgenceRelevesLibelle;
    }
    set validZoneAgenceRelevesLibelle(value: boolean) {
        this._validZoneAgenceRelevesLibelle = value;
    }

    get zoneAgenceRelevesElement(): ZoneAgenceReleveDto {
        if( this._zoneAgenceRelevesElement == null )
            this._zoneAgenceRelevesElement = new ZoneAgenceReleveDto();
        return this._zoneAgenceRelevesElement;
    }

    set zoneAgenceRelevesElement(value: ZoneAgenceReleveDto) {
        this._zoneAgenceRelevesElement = value;
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

    get createDialog(): boolean {
        return this.service.createDialog;
    }

    set createDialog(value: boolean) {
        this.service.createDialog = value;
    }

    get criteria(): ZoneVilleRegionReleveCriteria {
        return this.service.criteria;
    }

    set criteria(value: ZoneVilleRegionReleveCriteria) {
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

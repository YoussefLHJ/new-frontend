import {Component, OnInit, Input} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';

import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {Inject, Injectable, PLATFORM_ID} from '@angular/core';


import {environment} from 'src/environments/environment';

import {RoleService} from 'src/app/zynerator/security/shared/service/Role.service';
import {StringUtilService} from 'src/app/zynerator/util/StringUtil.service';
import {ServiceLocator} from 'src/app/zynerator/service/ServiceLocator';




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
  selector: 'app-zone-agence-releve-create-admin',
  standalone: false,
  templateUrl: './zone-agence-releve-create-admin.component.html'
})
export class ZoneAgenceReleveCreateAdminComponent  implements OnInit {

	protected _submitted = false;
    protected _errorMessages = new Array<string>();

    protected datePipe: DatePipe;
    protected messageService: MessageService;
    protected confirmationService: ConfirmationService;
    protected roleService: RoleService;
    protected router: Router;
    protected stringUtilService: StringUtilService;
    private _activeTab = 0;
    protected uniteRelevesIndex = -1;

    private _uniteRelevesElement = new UniteReleveDto();


   private _validZoneAgenceReleveNumero = true;
   private _validZoneAgenceReleveLibelle = true;
    private _validZoneVilleRegionReleveNumero = true;
    private _validZoneVilleRegionReleveLibelle = true;
    private _validUniteRelevesNumero = true;
    private _validUniteRelevesLibelle = true;

	constructor(private service: ZoneAgenceReleveAdminService , private uniteReleveService: UniteReleveAdminService, private zoneVilleRegionReleveService: ZoneVilleRegionReleveAdminService, @Inject(PLATFORM_ID) private platformId? ) {
        this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
    }

    ngOnInit(): void {
        this.zoneVilleRegionReleveService.findAll().subscribe((data) => this.zoneVilleRegionReleves = data);
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
                this.item = new ZoneAgenceReleveDto();
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



    validateUniteReleves(){
        this.errorMessages = new Array();
        this.validateUniteRelevesNumero();
        this.validateUniteRelevesLibelle();
    }


    public  setValidation(value: boolean){
        this.validZoneAgenceReleveNumero = value;
        this.validZoneAgenceReleveLibelle = value;
        this.validUniteRelevesNumero = value;
        this.validUniteRelevesLibelle = value;
    }

    public addUniteReleves() {
        if( this.item.uniteReleves == null )
            this.item.uniteReleves = new Array<UniteReleveDto>();

       this.validateUniteReleves();

       if (this.errorMessages.length === 0) {
            if (this.uniteRelevesIndex == -1){
                this.item.uniteReleves.push({... this.uniteRelevesElement});
            }else {
                this.item.uniteReleves[this.uniteRelevesIndex] =this.uniteRelevesElement;
            }
              this.uniteRelevesElement = new UniteReleveDto();
              this.uniteRelevesIndex = -1;
       }else{
           this.messageService.add({severity: 'error',summary: 'Erreurs',detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages});
       }
    }

    public deleteUniteReleves(p: UniteReleveDto, index: number) {
        this.item.uniteReleves.splice(index, 1);
    }

    public editUniteReleves(p: UniteReleveDto, index: number) {
        this.uniteRelevesElement = {... p};
        this.uniteRelevesIndex = index;
        this.activeTab = 0;
    }


    public  validateForm(): void{
        this.errorMessages = new Array<string>();
        this.validateZoneAgenceReleveNumero();
        this.validateZoneAgenceReleveLibelle();
    }

    public validateZoneAgenceReleveNumero(){
        if (this.stringUtilService.isEmpty(this.item.numero)) {
        this.errorMessages.push('Numero non valide');
        this.validZoneAgenceReleveNumero = false;
        } else {
            this.validZoneAgenceReleveNumero = true;
        }
    }
    public validateZoneAgenceReleveLibelle(){
        if (this.stringUtilService.isEmpty(this.item.libelle)) {
        this.errorMessages.push('Libelle non valide');
        this.validZoneAgenceReleveLibelle = false;
        } else {
            this.validZoneAgenceReleveLibelle = true;
        }
    }

    public validateUniteRelevesNumero(){
        if (this.uniteRelevesElement.numero == null) {
            this.errorMessages.push('Numero de la uniteReleve est  invalide');
            this.validUniteRelevesNumero = false;
        } else {
            this.validUniteRelevesNumero = true;
        }
    }
    public validateUniteRelevesLibelle(){
        if (this.uniteRelevesElement.libelle == null) {
            this.errorMessages.push('Libelle de la uniteReleve est  invalide');
            this.validUniteRelevesLibelle = false;
        } else {
            this.validUniteRelevesLibelle = true;
        }
    }

    public async openCreateZoneVilleRegionReleve(zoneVilleRegionReleve: string) {
    const isPermistted = await this.roleService.isPermitted('ZoneVilleRegionReleve', 'add');
    if(isPermistted) {
         this.zoneVilleRegionReleve = new ZoneVilleRegionReleveDto();
         this.createZoneVilleRegionReleveDialog = true;
    }else{
        this.messageService.add({
        severity: 'error', summary: 'erreur', detail: 'problème de permission'
        });
     }
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
    get createZoneVilleRegionReleveDialog(): boolean {
        return this.zoneVilleRegionReleveService.createDialog;
    }
    set createZoneVilleRegionReleveDialog(value: boolean) {
        this.zoneVilleRegionReleveService.createDialog= value;
    }



    get validZoneAgenceReleveNumero(): boolean {
        return this._validZoneAgenceReleveNumero;
    }

    set validZoneAgenceReleveNumero(value: boolean) {
         this._validZoneAgenceReleveNumero = value;
    }
    get validZoneAgenceReleveLibelle(): boolean {
        return this._validZoneAgenceReleveLibelle;
    }

    set validZoneAgenceReleveLibelle(value: boolean) {
         this._validZoneAgenceReleveLibelle = value;
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
    get validUniteRelevesNumero(): boolean {
        return this._validUniteRelevesNumero;
    }
    set validUniteRelevesNumero(value: boolean) {
        this._validUniteRelevesNumero = value;
    }
    get validUniteRelevesLibelle(): boolean {
        return this._validUniteRelevesLibelle;
    }
    set validUniteRelevesLibelle(value: boolean) {
        this._validUniteRelevesLibelle = value;
    }

    get uniteRelevesElement(): UniteReleveDto {
        if( this._uniteRelevesElement == null )
            this._uniteRelevesElement = new UniteReleveDto();
        return this._uniteRelevesElement;
    }

    set uniteRelevesElement(value: UniteReleveDto) {
        this._uniteRelevesElement = value;
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

    get createDialog(): boolean {
        return this.service.createDialog;
    }

    set createDialog(value: boolean) {
        this.service.createDialog = value;
    }

    get criteria(): ZoneAgenceReleveCriteria {
        return this.service.criteria;
    }

    set criteria(value: ZoneAgenceReleveCriteria) {
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

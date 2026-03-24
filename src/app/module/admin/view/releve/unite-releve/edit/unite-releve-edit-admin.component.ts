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
  selector: 'app-unite-releve-edit-admin',
  standalone: false,
  templateUrl: './unite-releve-edit-admin.component.html'
})
export class UniteReleveEditAdminComponent implements OnInit {

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

    protected lotRelevesIndex = -1;

    private _lotRelevesElement = new LotReleveDto();

    private _validUniteReleveNumero = true;
    private _validUniteReleveLibelle = true;

    private _validZoneAgenceReleveNumero = true;
    private _validZoneAgenceReleveLibelle = true;
    private _validLotRelevesNumero = true;
    private _validLotRelevesCode = true;



    constructor(private service: UniteReleveAdminService , private zoneAgenceReleveService: ZoneAgenceReleveAdminService, private lotReleveService: LotReleveAdminService, @Inject(PLATFORM_ID) private platformId?) {
        this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
    }

    ngOnInit(): void {

        this.zoneAgenceReleveService.findAll().subscribe((data) => this.zoneAgenceReleves = data);
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
            this.item = new UniteReleveDto();
        } , error =>{
            console.log(error);
        });
    }

    public hideEditDialog() {
        this.editDialog = false;
        this.setValidation(true);
    }





    public validateLotReleves(){
        this.errorMessages = new Array();
        this.validateLotRelevesNumero();
        this.validateLotRelevesCode();
    }

    public setValidation(value: boolean){
        this.validUniteReleveNumero = value;
        this.validUniteReleveLibelle = value;
        this.validLotRelevesNumero = value;
        this.validLotRelevesCode = value;
    }

    public addLotReleves() {
        if( this.item.lotReleves == null )
            this.item.lotReleves = new Array<LotReleveDto>();

       this.validateLotReleves();

       if (this.errorMessages.length === 0) {
            if (this.lotRelevesIndex == -1){
                this.item.lotReleves.push({... this.lotRelevesElement});
            }else {
                this.item.lotReleves[this.lotRelevesIndex] =this.lotRelevesElement;
            }
              this.lotRelevesElement = new LotReleveDto();
              this.lotRelevesIndex = -1;
       }else{
           this.messageService.add({severity: 'error',summary: 'Erreurs',detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages});
       }
    }

    public deleteLotReleves(p: LotReleveDto, index: number) {
        this.item.lotReleves.splice(index, 1);
    }

    public editLotReleves(p: LotReleveDto, index: number) {
        this.lotRelevesElement = {... p};
        this.lotRelevesIndex = index;
        this.activeTab = 0;
    }

    public validateForm(): void{
        this.errorMessages = new Array<string>();
        this.validateUniteReleveNumero();
        this.validateUniteReleveLibelle();
    }

    public validateUniteReleveNumero(){
        if (this.stringUtilService.isEmpty(this.item.numero)) {
            this.errorMessages.push('Numero non valide');
            this.validUniteReleveNumero = false;
        } else {
            this.validUniteReleveNumero = true;
        }
    }

    public validateUniteReleveLibelle(){
        if (this.stringUtilService.isEmpty(this.item.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validUniteReleveLibelle = false;
        } else {
            this.validUniteReleveLibelle = true;
        }
    }



    private validateLotRelevesNumero(){
        if (this.lotRelevesElement.numero == null) {
        this.errorMessages.push('Numero de la lotReleve est  invalide');
            this.validLotRelevesNumero = false;
        } else {
            this.validLotRelevesNumero = true;
        }
    }
    private validateLotRelevesCode(){
        if (this.lotRelevesElement.code == null) {
        this.errorMessages.push('Code de la lotReleve est  invalide');
            this.validLotRelevesCode = false;
        } else {
            this.validLotRelevesCode = true;
        }
    }

   public async openCreateZoneAgenceReleve(zoneAgenceReleve: string) {
        const isPermistted = await this.roleService.isPermitted('ZoneAgenceReleve', 'edit');
        if (isPermistted) {
             this.zoneAgenceReleve = new ZoneAgenceReleveDto();
             this.createZoneAgenceReleveDialog = true;
        }else {
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
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
    get createZoneAgenceReleveDialog(): boolean {
        return this.zoneAgenceReleveService.createDialog;
    }
    set createZoneAgenceReleveDialog(value: boolean) {
        this.zoneAgenceReleveService.createDialog= value;
    }

    get lotRelevesElement(): LotReleveDto {
        if( this._lotRelevesElement == null )
            this._lotRelevesElement = new LotReleveDto();
         return this._lotRelevesElement;
    }

    set lotRelevesElement(value: LotReleveDto) {
        this._lotRelevesElement = value;
    }

    get validUniteReleveNumero(): boolean {
        return this._validUniteReleveNumero;
    }
    set validUniteReleveNumero(value: boolean) {
        this._validUniteReleveNumero = value;
    }
    get validUniteReleveLibelle(): boolean {
        return this._validUniteReleveLibelle;
    }
    set validUniteReleveLibelle(value: boolean) {
        this._validUniteReleveLibelle = value;
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
    get validLotRelevesNumero(): boolean {
        return this._validLotRelevesNumero;
    }
    set validLotRelevesNumero(value: boolean) {
        this._validLotRelevesNumero = value;
    }
    get validLotRelevesCode(): boolean {
        return this._validLotRelevesCode;
    }
    set validLotRelevesCode(value: boolean) {
        this._validLotRelevesCode = value;
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

    get editDialog(): boolean {
        return this.service.editDialog;
    }

    set editDialog(value: boolean) {
        this.service.editDialog = value;
    }

    get criteria(): UniteReleveCriteria {
        return this.service.criteria;
    }

    set criteria(value: UniteReleveCriteria) {
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

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
  selector: 'app-lot-releve-edit-admin',
  standalone: false,
  templateUrl: './lot-releve-edit-admin.component.html'
})
export class LotReleveEditAdminComponent implements OnInit {

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

    protected batimentsIndex = -1;

    private _batimentsElement = new BatimentDto();

    private _validLotReleveNumero = true;
    private _validLotReleveCode = true;

    private _validUniteReleveNumero = true;
    private _validUniteReleveLibelle = true;
    private _validBatimentsCodeBatiment = true;
    private _validBatimentsLibelle = true;



    constructor(private service: LotReleveAdminService , private communeService: CommuneAdminService, private uniteReleveService: UniteReleveAdminService, private batimentService: BatimentAdminService, @Inject(PLATFORM_ID) private platformId?) {
        this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
    }

    ngOnInit(): void {
        this.batimentsElement.commune = new CommuneDto();
        this.communeService.findAll().subscribe((data) => this.communes = data);

        this.uniteReleveService.findAll().subscribe((data) => this.uniteReleves = data);
    }

    public prepareEdit() {
        this.item.dateCreation = this.service.format(this.item.dateCreation);
        this.item.dateMiseAJour = this.service.format(this.item.dateMiseAJour);
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
            this.item = new LotReleveDto();
        } , error =>{
            console.log(error);
        });
    }

    public hideEditDialog() {
        this.editDialog = false;
        this.setValidation(true);
    }





    public validateBatiments(){
        this.errorMessages = new Array();
        this.validateBatimentsCodeBatiment();
        this.validateBatimentsLibelle();
    }

    public setValidation(value: boolean){
        this.validLotReleveNumero = value;
        this.validLotReleveCode = value;
        this.validBatimentsCodeBatiment = value;
        this.validBatimentsLibelle = value;
    }

    public addBatiments() {
        if( this.item.batiments == null )
            this.item.batiments = new Array<BatimentDto>();

       this.validateBatiments();

       if (this.errorMessages.length === 0) {
            if (this.batimentsIndex == -1){
                this.item.batiments.push({... this.batimentsElement});
            }else {
                this.item.batiments[this.batimentsIndex] =this.batimentsElement;
            }
              this.batimentsElement = new BatimentDto();
              this.batimentsIndex = -1;
       }else{
           this.messageService.add({severity: 'error',summary: 'Erreurs',detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages});
       }
    }

    public deleteBatiments(p: BatimentDto, index: number) {
        this.item.batiments.splice(index, 1);
    }

    public editBatiments(p: BatimentDto, index: number) {
        this.batimentsElement = {... p};
        this.batimentsIndex = index;
        this.activeTab = 0;
    }

    public validateForm(): void{
        this.errorMessages = new Array<string>();
        this.validateLotReleveNumero();
        this.validateLotReleveCode();
    }

    public validateLotReleveNumero(){
        if (this.stringUtilService.isEmpty(this.item.numero)) {
            this.errorMessages.push('Numero non valide');
            this.validLotReleveNumero = false;
        } else {
            this.validLotReleveNumero = true;
        }
    }

    public validateLotReleveCode(){
        if (this.stringUtilService.isEmpty(this.item.code)) {
            this.errorMessages.push('Code non valide');
            this.validLotReleveCode = false;
        } else {
            this.validLotReleveCode = true;
        }
    }



    private validateBatimentsCodeBatiment(){
        if (this.batimentsElement.codeBatiment == null) {
        this.errorMessages.push('CodeBatiment de la batiment est  invalide');
            this.validBatimentsCodeBatiment = false;
        } else {
            this.validBatimentsCodeBatiment = true;
        }
    }
    private validateBatimentsLibelle(){
        if (this.batimentsElement.libelle == null) {
        this.errorMessages.push('Libelle de la batiment est  invalide');
            this.validBatimentsLibelle = false;
        } else {
            this.validBatimentsLibelle = true;
        }
    }

   public async openCreateUniteReleve(uniteReleve: string) {
        const isPermistted = await this.roleService.isPermitted('UniteReleve', 'edit');
        if (isPermistted) {
             this.uniteReleve = new UniteReleveDto();
             this.createUniteReleveDialog = true;
        }else {
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
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
    get createUniteReleveDialog(): boolean {
        return this.uniteReleveService.createDialog;
    }
    set createUniteReleveDialog(value: boolean) {
        this.uniteReleveService.createDialog= value;
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
    get createCommuneDialog(): boolean {
        return this.communeService.createDialog;
    }
    set createCommuneDialog(value: boolean) {
        this.communeService.createDialog= value;
    }

    get batimentsElement(): BatimentDto {
        if( this._batimentsElement == null )
            this._batimentsElement = new BatimentDto();
         return this._batimentsElement;
    }

    set batimentsElement(value: BatimentDto) {
        this._batimentsElement = value;
    }

    get validLotReleveNumero(): boolean {
        return this._validLotReleveNumero;
    }
    set validLotReleveNumero(value: boolean) {
        this._validLotReleveNumero = value;
    }
    get validLotReleveCode(): boolean {
        return this._validLotReleveCode;
    }
    set validLotReleveCode(value: boolean) {
        this._validLotReleveCode = value;
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
    get validBatimentsCodeBatiment(): boolean {
        return this._validBatimentsCodeBatiment;
    }
    set validBatimentsCodeBatiment(value: boolean) {
        this._validBatimentsCodeBatiment = value;
    }
    get validBatimentsLibelle(): boolean {
        return this._validBatimentsLibelle;
    }
    set validBatimentsLibelle(value: boolean) {
        this._validBatimentsLibelle = value;
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

    get editDialog(): boolean {
        return this.service.editDialog;
    }

    set editDialog(value: boolean) {
        this.service.editDialog = value;
    }

    get criteria(): LotReleveCriteria {
        return this.service.criteria;
    }

    set criteria(value: LotReleveCriteria) {
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

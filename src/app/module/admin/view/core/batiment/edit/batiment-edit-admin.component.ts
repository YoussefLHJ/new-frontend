import { Component, inject, OnInit, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TabsModule } from 'primeng/tabs';
import { DataGridCreateComponent } from '@/app/pages/components/data-grid';


import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {Inject, Injectable, PLATFORM_ID} from '@angular/core';


import {environment} from 'src/environments/environment';

import {RoleService} from 'src/app/zynerator/security/shared/service/Role.service';
import {StringUtilService} from 'src/app/zynerator/util/StringUtil.service';
import {ServiceLocator} from 'src/app/zynerator/service/ServiceLocator';




import {BatimentAdminService} from 'src/app/shared/service/admin/core/BatimentAdmin.service';
import {BatimentDto} from 'src/app/shared/model/core/Batiment.model';
import {BatimentCriteria} from 'src/app/shared/criteria/core/BatimentCriteria.model';


import {CommuneDto} from 'src/app/shared/model/config/Commune.model';
import {CommuneAdminService} from 'src/app/shared/service/admin/config/CommuneAdmin.service';
import {AppareilDto} from 'src/app/shared/model/core/Appareil.model';
import {AppareilAdminService} from 'src/app/shared/service/admin/core/AppareilAdmin.service';

@Component({
  selector: 'app-batiment-edit-admin',
  standalone: true,
  imports: [
    CommonModule, FormsModule, TranslateModule,
    InputTextModule, InputNumberModule, SelectModule, ToggleSwitchModule,
    TableModule, ButtonModule, TabsModule, DataGridCreateComponent,
  ],
  templateUrl: './batiment-edit-admin.component.html'
})
export class BatimentEditAdminComponent implements OnInit {

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

    protected appareilsIndex = -1;

    private _appareilsElement = new AppareilDto();

    private _validBatimentCode = true;
    private _validBatimentLibelle = true;

    private _validAppareilsNumero = true;
    private _validCommuneCode = true;
    private _validCommuneLibelle = true;



    constructor(private service: BatimentAdminService , private communeService: CommuneAdminService, private appareilService: AppareilAdminService, @Inject(PLATFORM_ID) private platformId?) {
        this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
    }

    ngOnInit(): void {

        this.communeService.findAll().subscribe((data) => this.communes = data);
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
            this.item = new BatimentDto();
        } , error =>{
            console.log(error);
        });
    }

    public hideEditDialog() {
        this.editDialog = false;
        this.setValidation(true);
    }





    public validateAppareils(){
        this.errorMessages = new Array();
        this.validateAppareilsNumero();
    }

    public setValidation(value: boolean){
        this.validBatimentCode = value;
        this.validBatimentLibelle = value;
        this.validAppareilsNumero = value;
    }

    public addAppareils() {
        if( this.item.appareils == null )
            this.item.appareils = new Array<AppareilDto>();

       this.validateAppareils();

       if (this.errorMessages.length === 0) {
            if (this.appareilsIndex == -1){
                this.item.appareils.push({... this.appareilsElement});
            }else {
                this.item.appareils[this.appareilsIndex] =this.appareilsElement;
            }
              this.appareilsElement = new AppareilDto();
              this.appareilsIndex = -1;
       }else{
           this.messageService.add({severity: 'error',summary: 'Erreurs',detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages});
       }
    }

    public deleteAppareils(p: AppareilDto, index: number) {
        this.item.appareils.splice(index, 1);
    }

    public editAppareils(p: AppareilDto, index: number) {
        this.appareilsElement = {... p};
        this.appareilsIndex = index;
        this.activeTab = 0;
    }

    public validateForm(): void{
        this.errorMessages = new Array<string>();
        this.validateBatimentCode();
        this.validateBatimentLibelle();
    }

    public validateBatimentCode(){
        if (this.stringUtilService.isEmpty(this.item.code)) {
            this.errorMessages.push('Code non valide');
            this.validBatimentCode = false;
        } else {
            this.validBatimentCode = true;
        }
    }

    public validateBatimentLibelle(){
        if (this.stringUtilService.isEmpty(this.item.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validBatimentLibelle = false;
        } else {
            this.validBatimentLibelle = true;
        }
    }



    private validateAppareilsNumero(){
        if (this.appareilsElement.numero == null) {
        this.errorMessages.push('Numero de la appareil est  invalide');
            this.validAppareilsNumero = false;
        } else {
            this.validAppareilsNumero = true;
        }
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

    get appareilsElement(): AppareilDto {
        if( this._appareilsElement == null )
            this._appareilsElement = new AppareilDto();
         return this._appareilsElement;
    }

    set appareilsElement(value: AppareilDto) {
        this._appareilsElement = value;
    }

    get validBatimentCode(): boolean {
        return this._validBatimentCode;
    }
    set validBatimentCode(value: boolean) {
        this._validBatimentCode = value;
    }
    get validBatimentLibelle(): boolean {
        return this._validBatimentLibelle;
    }
    set validBatimentLibelle(value: boolean) {
        this._validBatimentLibelle = value;
    }

    get validAppareilsNumero(): boolean {
        return this._validAppareilsNumero;
    }
    set validAppareilsNumero(value: boolean) {
        this._validAppareilsNumero = value;
    }
    get validCommuneCode(): boolean {
        return this._validCommuneCode;
    }
    set validCommuneCode(value: boolean) {
        this._validCommuneCode = value;
    }
    get validCommuneLibelle(): boolean {
        return this._validCommuneLibelle;
    }
    set validCommuneLibelle(value: boolean) {
        this._validCommuneLibelle = value;
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

    get editDialog(): boolean {
        return this.service.editDialog;
    }

    set editDialog(value: boolean) {
        this.service.editDialog = value;
    }

    get criteria(): BatimentCriteria {
        return this.service.criteria;
    }

    set criteria(value: BatimentCriteria) {
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

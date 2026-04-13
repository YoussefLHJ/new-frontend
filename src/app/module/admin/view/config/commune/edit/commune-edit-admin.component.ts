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
import { FluidModule } from 'primeng/fluid';
import { FloatLabelModule } from 'primeng/floatlabel';
import { TextareaModule } from 'primeng/textarea';
import { DataGridEditComponent } from '@/app/pages/components/data-grid';


import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {Inject, Injectable, PLATFORM_ID} from '@angular/core';


import {environment} from 'src/environments/environment';

import {RoleService} from 'src/app/zynerator/security/shared/service/Role.service';
import {StringUtilService} from 'src/app/zynerator/util/StringUtil.service';
import {ServiceLocator} from 'src/app/zynerator/service/ServiceLocator';




import {CommuneAdminService} from 'src/app/shared/service/admin/config/CommuneAdmin.service';
import {CommuneDto} from 'src/app/shared/model/config/Commune.model';
import {CommuneCriteria} from 'src/app/shared/criteria/config/CommuneCriteria.model';



@Component({
  selector: 'app-commune-edit-admin',
  standalone: true,
  imports: [
    CommonModule, FormsModule, TranslateModule,
    InputTextModule, InputNumberModule, SelectModule, ToggleSwitchModule,
    TableModule, ButtonModule, TabsModule, FluidModule, FloatLabelModule, TextareaModule, DataGridEditComponent,
  ],
  templateUrl: './commune-edit-admin.component.html'
})
export class CommuneEditAdminComponent implements OnInit {

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



    private _validCommuneCode = true;
    private _validCommuneLibelle = true;

    public onUpdated = output<void>();


    constructor(private service: CommuneAdminService , @Inject(PLATFORM_ID) private platformId?: Object) {
        this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
    }

    ngOnInit(): void {
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
            this.onUpdated.emit();
            this.item = new CommuneDto();
        } , error =>{
            console.log(error);
        });
    }

    public hideEditDialog() {
        this.editDialog = false;
        this.setValidation(true);
    }





    public setValidation(value: boolean){
        this.validCommuneCode = value;
        this.validCommuneLibelle = value;
    }


    public validateForm(): void{
        this.errorMessages = new Array<string>();
        this.validateCommuneCode();
        this.validateCommuneLibelle();
    }

    public validateCommuneCode(){
        if (this.stringUtilService.isEmpty(this.item.code)) {
            this.errorMessages.push('Code non valide');
            this.validCommuneCode = false;
        } else {
            this.validCommuneCode = true;
        }
    }

    public validateCommuneLibelle(){
        if (this.stringUtilService.isEmpty(this.item.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validCommuneLibelle = false;
        } else {
            this.validCommuneLibelle = true;
        }
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


	get items(): Array<CommuneDto> {
        return this.service.items;
    }

    set items(value: Array<CommuneDto>) {
        this.service.items = value;
    }

    get item(): CommuneDto {
        return this.service.item;
    }

    set item(value: CommuneDto) {
        this.service.item = value;
    }

    get editDialog(): boolean {
        return this.service.editDialog;
    }

    set editDialog(value: boolean) {
        this.service.editDialog = value;
    }

    get criteria(): CommuneCriteria {
        return this.service.criteria;
    }

    set criteria(value: CommuneCriteria) {
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

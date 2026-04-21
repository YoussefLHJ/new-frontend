import { Component, inject, OnInit, output } from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';


import {CommunEdit} from '@/app/pages/uikit/commun-edit';

import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {Inject, Injectable, PLATFORM_ID} from '@angular/core';


import {environment} from 'src/environments/environment';

import {RoleService} from 'src/app/zynerator/security/shared/service/Role.service';
import {StringUtilService} from 'src/app/zynerator/util/StringUtil.service';
import {ServiceLocator} from 'src/app/zynerator/service/ServiceLocator';




import {CommandeAdminService} from 'src/app/shared/service/admin/core/CommandeAdmin.service';
import {CommandeDto} from 'src/app/shared/model/core/Commande.model';
import {CommandeCriteria} from 'src/app/shared/criteria/core/CommandeCriteria.model';


import {CommandeItemDto} from 'src/app/shared/model/core/CommandeItem.model';
import {CommandeItemAdminService} from 'src/app/shared/service/admin/core/CommandeItemAdmin.service';

@Component({
  selector: 'app-commande-edit-admin',
  standalone: true,
  imports: [
    ...CommunEdit
  ],
  templateUrl: './commande-edit-admin.component.html'
})
export class CommandeEditAdminComponent implements OnInit {

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

    public onUpdated = output<void>();

    protected commandeItemsIndex = -1;

    private _commandeItemsElement = new CommandeItemDto();

    private _validCommandeCode = true;




    constructor(private service: CommandeAdminService , private commandeItemService: CommandeItemAdminService, @Inject(PLATFORM_ID) private platformId?: Object) {
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
        this.item.dateCommande = this.service.format(this.item.dateCommande);
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
            this.item = new CommandeDto();
        } , error =>{
            console.log(error);
        });
    }

    public hideEditDialog() {
        this.editDialog = false;
        this.setValidation(true);
    }





    public validateCommandeItems(){
        this.errorMessages = new Array();
    }

    public setValidation(value: boolean){
        this.validCommandeCode = value;
    }

    public addCommandeItems() {
        if( this.item.commandeItems == null )
            this.item.commandeItems = new Array<CommandeItemDto>();

       this.validateCommandeItems();

       if (this.errorMessages.length === 0) {
            if (this.commandeItemsIndex == -1){
                this.item.commandeItems.push({... this.commandeItemsElement});
            }else {
                this.item.commandeItems[this.commandeItemsIndex] =this.commandeItemsElement;
            }
              this.commandeItemsElement = new CommandeItemDto();
              this.commandeItemsIndex = -1;
       }else{
           this.messageService.add({severity: 'error',summary: 'Erreurs',detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages});
       }
    }

    public deleteCommandeItems(p: CommandeItemDto, index: number) {
        this.item.commandeItems.splice(index, 1);
    }

    public editCommandeItems(p: CommandeItemDto, index: number) {
        this.commandeItemsElement = {... p};
        this.commandeItemsIndex = index;
        this.activeTab = 0;
    }

    public validateForm(): void{
        this.errorMessages = new Array<string>();
        this.validateCommandeCode();
    }

    public validateCommandeCode(){
        if (this.stringUtilService.isEmpty(this.item.code)) {
            this.errorMessages.push('Code non valide');
            this.validCommandeCode = false;
        } else {
            this.validCommandeCode = true;
        }
    }






    get commandeItemsElement(): CommandeItemDto {
        if( this._commandeItemsElement == null )
            this._commandeItemsElement = new CommandeItemDto();
         return this._commandeItemsElement;
    }

    set commandeItemsElement(value: CommandeItemDto) {
        this._commandeItemsElement = value;
    }

    get validCommandeCode(): boolean {
        return this._validCommandeCode;
    }
    set validCommandeCode(value: boolean) {
        this._validCommandeCode = value;
    }


	get items(): Array<CommandeDto> {
        return this.service.items;
    }

    set items(value: Array<CommandeDto>) {
        this.service.items = value;
    }

    get item(): CommandeDto {
        return this.service.item;
    }

    set item(value: CommandeDto) {
        this.service.item = value;
    }

    get editDialog(): boolean {
        return this.service.editDialog;
    }

    set editDialog(value: boolean) {
        this.service.editDialog = value;
    }

    get criteria(): CommandeCriteria {
        return this.service.criteria;
    }

    set criteria(value: CommandeCriteria) {
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

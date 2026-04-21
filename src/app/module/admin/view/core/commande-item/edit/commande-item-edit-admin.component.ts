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




import {CommandeItemAdminService} from 'src/app/shared/service/admin/core/CommandeItemAdmin.service';
import {CommandeItemDto} from 'src/app/shared/model/core/CommandeItem.model';
import {CommandeItemCriteria} from 'src/app/shared/criteria/core/CommandeItemCriteria.model';


import {CommandeDto} from 'src/app/shared/model/core/Commande.model';
import {CommandeAdminService} from 'src/app/shared/service/admin/core/CommandeAdmin.service';

@Component({
  selector: 'app-commande-item-edit-admin',
  standalone: true,
  imports: [
    ...CommunEdit
  ],
  templateUrl: './commande-item-edit-admin.component.html'
})
export class CommandeItemEditAdminComponent implements OnInit {

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




    private _validCommandeCode = true;



    constructor(private service: CommandeItemAdminService , private commandeService: CommandeAdminService, @Inject(PLATFORM_ID) private platformId?: Object) {
        this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
    }

    ngOnInit(): void {
        this.commandeService.findAll().subscribe((data) => this.commandes = data);
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
            this.item = new CommandeItemDto();
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




   public async openCreateCommande(commande: string) {
        const isPermistted = await this.roleService.isPermitted('Commande', 'edit');
        if (isPermistted) {
             this.commande = new CommandeDto();
             this.createCommandeDialog = true;
        }else {
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }

    get commande(): CommandeDto {
        return this.commandeService.item;
    }
    set commande(value: CommandeDto) {
        this.commandeService.item = value;
    }
    get commandes(): Array<CommandeDto> {
        return this.commandeService.items;
    }
    set commandes(value: Array<CommandeDto>) {
        this.commandeService.items = value;
    }
    get createCommandeDialog(): boolean {
        return this.commandeService.createDialog;
    }
    set createCommandeDialog(value: boolean) {
        this.commandeService.createDialog= value;
    }



    get validCommandeCode(): boolean {
        return this._validCommandeCode;
    }
    set validCommandeCode(value: boolean) {
        this._validCommandeCode = value;
    }

	get items(): Array<CommandeItemDto> {
        return this.service.items;
    }

    set items(value: Array<CommandeItemDto>) {
        this.service.items = value;
    }

    get item(): CommandeItemDto {
        return this.service.item;
    }

    set item(value: CommandeItemDto) {
        this.service.item = value;
    }

    get editDialog(): boolean {
        return this.service.editDialog;
    }

    set editDialog(value: boolean) {
        this.service.editDialog = value;
    }

    get criteria(): CommandeItemCriteria {
        return this.service.criteria;
    }

    set criteria(value: CommandeItemCriteria) {
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

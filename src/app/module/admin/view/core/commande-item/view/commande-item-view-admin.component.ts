import {Component, OnInit} from '@angular/core';


import { CommunView } from '@/app/pages/uikit/commun-view';
import { DatePipe } from '@angular/common';




import {Router} from '@angular/router';


import {environment} from 'src/environments/environment';

import {RoleService} from 'src/app/zynerator/security/shared/service/Role.service';
import {StringUtilService} from 'src/app/zynerator/util/StringUtil.service';
import {ServiceLocator} from 'src/app/zynerator/service/ServiceLocator';
import {ConfirmationService, MessageService,MenuItem} from 'primeng/api';
import { DialogModule } from 'primeng/dialog';

import {CommandeItemAdminService} from 'src/app/shared/service/admin/core/CommandeItemAdmin.service';
import {CommandeItemDto} from 'src/app/shared/model/core/CommandeItem.model';
import {CommandeItemCriteria} from 'src/app/shared/criteria/core/CommandeItemCriteria.model';

import {CommandeDto} from 'src/app/shared/model/core/Commande.model';
import {CommandeAdminService} from 'src/app/shared/service/admin/core/CommandeAdmin.service';
@Component({
  selector: 'app-commande-item-view-admin',
  standalone: true,
  imports: [
    ...CommunView, DialogModule
    ],
  templateUrl: './commande-item-view-admin.component.html'
})
export class CommandeItemViewAdminComponent implements OnInit {


	protected _submitted = false;
    protected _errorMessages = new Array<string>();

    protected datePipe: DatePipe;
    protected messageService: MessageService;
    protected confirmationService: ConfirmationService;
    protected roleService: RoleService;
    protected router: Router;
    protected stringUtilService: StringUtilService;



    constructor(private service: CommandeItemAdminService, private commandeService: CommandeAdminService){
		this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
	}

    ngOnInit(): void {
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

    public hideViewDialog() {
        this.viewDialog = false;
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

    get viewDialog(): boolean {
        return this.service.viewDialog;
    }

    set viewDialog(value: boolean) {
        this.service.viewDialog = value;
    }

    get criteria(): CommandeItemCriteria {
        return this.service.criteria;
    }

    set criteria(value: CommandeItemCriteria) {
        this.service.criteria = value;
    }

    get dateFormat(){
        return environment.dateFormatView;
    }

    get dateFormatColumn(){
        return environment.dateFormatList;
    }


}

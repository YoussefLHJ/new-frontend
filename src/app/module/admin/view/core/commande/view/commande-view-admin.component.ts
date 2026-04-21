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

import {CommandeAdminService} from 'src/app/shared/service/admin/core/CommandeAdmin.service';
import {CommandeDto} from 'src/app/shared/model/core/Commande.model';
import {CommandeCriteria} from 'src/app/shared/criteria/core/CommandeCriteria.model';

import {CommandeItemDto} from 'src/app/shared/model/core/CommandeItem.model';
import {CommandeItemAdminService} from 'src/app/shared/service/admin/core/CommandeItemAdmin.service';
@Component({
  selector: 'app-commande-view-admin',
  standalone: true,
  imports: [
    ...CommunView, DialogModule
    ],
  templateUrl: './commande-view-admin.component.html'
})
export class CommandeViewAdminComponent implements OnInit {


	protected _submitted = false;
    protected _errorMessages = new Array<string>();

    protected datePipe: DatePipe;
    protected messageService: MessageService;
    protected confirmationService: ConfirmationService;
    protected roleService: RoleService;
    protected router: Router;
    protected stringUtilService: StringUtilService;


    commandeItems = new CommandeItemDto();
    commandeItemss: Array<CommandeItemDto> = [];

    constructor(private service: CommandeAdminService, private commandeItemService: CommandeItemAdminService){
		this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
	}

    ngOnInit(): void {
    }



    public hideViewDialog() {
        this.viewDialog = false;
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

    get viewDialog(): boolean {
        return this.service.viewDialog;
    }

    set viewDialog(value: boolean) {
        this.service.viewDialog = value;
    }

    get criteria(): CommandeCriteria {
        return this.service.criteria;
    }

    set criteria(value: CommandeCriteria) {
        this.service.criteria = value;
    }

    get dateFormat(){
        return environment.dateFormatView;
    }

    get dateFormatColumn(){
        return environment.dateFormatList;
    }


}

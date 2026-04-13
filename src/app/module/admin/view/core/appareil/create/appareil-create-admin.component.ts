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
import { DataGridCreateComponent } from '@/app/pages/components/data-grid';


import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {Inject, Injectable, PLATFORM_ID} from '@angular/core';


import {environment} from 'src/environments/environment';

import {RoleService} from 'src/app/zynerator/security/shared/service/Role.service';
import {StringUtilService} from 'src/app/zynerator/util/StringUtil.service';
import {ServiceLocator} from 'src/app/zynerator/service/ServiceLocator';




import {AppareilAdminService} from 'src/app/shared/service/admin/core/AppareilAdmin.service';
import {AppareilDto} from 'src/app/shared/model/core/Appareil.model';
import {AppareilCriteria} from 'src/app/shared/criteria/core/AppareilCriteria.model';
import {BatimentDto} from 'src/app/shared/model/core/Batiment.model';
import {BatimentAdminService} from 'src/app/shared/service/admin/core/BatimentAdmin.service';
@Component({
  selector: 'app-appareil-create-admin',
  standalone: true,
  imports: [
    CommonModule, FormsModule, TranslateModule,
    InputTextModule, InputNumberModule, SelectModule, ToggleSwitchModule,
    TableModule, ButtonModule, TabsModule, FluidModule, FloatLabelModule, DataGridCreateComponent,
  ],
  templateUrl: './appareil-create-admin.component.html'
})
export class AppareilCreateAdminComponent  implements OnInit {

	protected _submitted = false;
    protected _errorMessages = new Array<string>();

    protected datePipe: DatePipe;
    protected messageService: MessageService;
    protected confirmationService: ConfirmationService;
    protected roleService: RoleService;
    protected router: Router;
    protected stringUtilService: StringUtilService;
    private _activeTab = 0;



   private _validAppareilNumero = true;
    private _validBatimentCode = true;
    private _validBatimentLibelle = true;

    public onSaved = output<void>();

	constructor(private service: AppareilAdminService , private batimentService: BatimentAdminService, @Inject(PLATFORM_ID) private platformId?: Object ) {
        this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
    }

    ngOnInit(): void {
        this.batimentService.findAll().subscribe((data) => this.batiments = data);
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
                this.onSaved.emit();
                this.item = new AppareilDto();
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





    public  setValidation(value: boolean){
        this.validAppareilNumero = value;
    }



    public  validateForm(): void{
        this.errorMessages = new Array<string>();
        this.validateAppareilNumero();
    }

    public validateAppareilNumero(){
        if (this.stringUtilService.isEmpty(this.item.numero)) {
        this.errorMessages.push('Numero non valide');
        this.validAppareilNumero = false;
        } else {
            this.validAppareilNumero = true;
        }
    }


    public async openCreateBatiment(batiment: string) {
    const isPermistted = await this.roleService.isPermitted('Batiment', 'add');
    if(isPermistted) {
         this.batiment = new BatimentDto();
         this.createBatimentDialog = true;
    }else{
        this.messageService.add({
        severity: 'error', summary: 'erreur', detail: 'problème de permission'
        });
     }
    }

    get batiment(): BatimentDto {
        return this.batimentService.item;
    }
    set batiment(value: BatimentDto) {
        this.batimentService.item = value;
    }
    get batiments(): Array<BatimentDto> {
        return this.batimentService.items;
    }
    set batiments(value: Array<BatimentDto>) {
        this.batimentService.items = value;
    }
    get createBatimentDialog(): boolean {
        return this.batimentService.createDialog;
    }
    set createBatimentDialog(value: boolean) {
        this.batimentService.createDialog= value;
    }



    get validAppareilNumero(): boolean {
        return this._validAppareilNumero;
    }

    set validAppareilNumero(value: boolean) {
         this._validAppareilNumero = value;
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


    get items(): Array<AppareilDto> {
        return this.service.items;
    }

    set items(value: Array<AppareilDto>) {
        this.service.items = value;
    }

    get item(): AppareilDto {
        return this.service.item;
    }

    set item(value: AppareilDto) {
        this.service.item = value;
    }

    get createDialog(): boolean {
        return this.service.createDialog;
    }

    set createDialog(value: boolean) {
        this.service.createDialog = value;
    }

    get criteria(): AppareilCriteria {
        return this.service.criteria;
    }

    set criteria(value: AppareilCriteria) {
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

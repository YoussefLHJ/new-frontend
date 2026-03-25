import {Component, OnInit, Input} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';

import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {Inject, Injectable, PLATFORM_ID} from '@angular/core';


import {environment} from 'src/environments/environment';

import {RoleService} from 'src/app/zynerator/security/shared/service/Role.service';
import {StringUtilService} from 'src/app/zynerator/util/StringUtil.service';
import {ServiceLocator} from 'src/app/zynerator/service/ServiceLocator';




import {BatimentAdminService} from 'src/app/shared/service/admin/config/BatimentAdmin.service';
import {BatimentDto} from 'src/app/shared/model/config/Batiment.model';
import {BatimentCriteria} from 'src/app/shared/criteria/config/BatimentCriteria.model';
import {CommuneDto} from 'src/app/shared/model/config/Commune.model';
import {CommuneAdminService} from 'src/app/shared/service/admin/config/CommuneAdmin.service';
import {AppareilDto} from 'src/app/shared/model/config/Appareil.model';
import {AppareilAdminService} from 'src/app/shared/service/admin/config/AppareilAdmin.service';
import {LotReleveDto} from 'src/app/shared/model/releve/LotReleve.model';
import {LotReleveAdminService} from 'src/app/shared/service/admin/releve/LotReleveAdmin.service';
@Component({
  selector: 'app-batiment-create-admin',
  standalone: false,
  templateUrl: './batiment-create-admin.component.html'
})
export class BatimentCreateAdminComponent  implements OnInit {

	protected _submitted = false;
    protected _errorMessages = new Array<string>();

    protected datePipe: DatePipe;
    protected messageService: MessageService;
    protected confirmationService: ConfirmationService;
    protected roleService: RoleService;
    protected router: Router;
    protected stringUtilService: StringUtilService;
    private _activeTab = 0;
    protected appareilIndex = -1;

    private _appareilElement = new AppareilDto();


   private _validBatimentCodeBatiment = true;
   private _validBatimentLibelle = true;
    private _validAppareilNumeroAppareil = true;
    private _validCommuneCode = true;
    private _validCommuneLibelle = true;
    private _validLotReleveNumero = true;
    private _validLotReleveCode = true;

	constructor(private service: BatimentAdminService , private communeService: CommuneAdminService, private appareilService: AppareilAdminService, private lotReleveService: LotReleveAdminService, @Inject(PLATFORM_ID) private platformId?: Object ) {
        this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
    }

    ngOnInit(): void {
        this.communeService.findAll().subscribe((data) => this.communes = data);
        this.lotReleveService.findAll().subscribe((data) => this.lotReleves = data);
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
                this.item = new BatimentDto();
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



    validateAppareil(){
        this.errorMessages = new Array();
        this.validateAppareilNumeroAppareil();
    }


    public  setValidation(value: boolean){
        this.validBatimentCodeBatiment = value;
        this.validBatimentLibelle = value;
        this.validAppareilNumeroAppareil = value;
    }

    public addAppareil() {
        if( this.item.appareil == null )
            this.item.appareil = new Array<AppareilDto>();

       this.validateAppareil();

       if (this.errorMessages.length === 0) {
            if (this.appareilIndex == -1){
                this.item.appareil.push({... this.appareilElement});
            }else {
                this.item.appareil[this.appareilIndex] =this.appareilElement;
            }
              this.appareilElement = new AppareilDto();
              this.appareilIndex = -1;
       }else{
           this.messageService.add({severity: 'error',summary: 'Erreurs',detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages});
       }
    }

    public deleteAppareil(p: AppareilDto, index: number) {
        this.item.appareil.splice(index, 1);
    }

    public editAppareil(p: AppareilDto, index: number) {
        this.appareilElement = {... p};
        this.appareilIndex = index;
        this.activeTab = 0;
    }


    public  validateForm(): void{
        this.errorMessages = new Array<string>();
        this.validateBatimentCodeBatiment();
        this.validateBatimentLibelle();
    }

    public validateBatimentCodeBatiment(){
        if (this.stringUtilService.isEmpty(this.item.codeBatiment)) {
        this.errorMessages.push('Code batiment non valide');
        this.validBatimentCodeBatiment = false;
        } else {
            this.validBatimentCodeBatiment = true;
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

    public validateAppareilNumeroAppareil(){
        if (this.appareilElement.numeroAppareil == null) {
            this.errorMessages.push('NumeroAppareil de la appareil est  invalide');
            this.validAppareilNumeroAppareil = false;
        } else {
            this.validAppareilNumeroAppareil = true;
        }
    }

    public async openCreateCommune(commune: string) {
    const isPermistted = await this.roleService.isPermitted('Commune', 'add');
    if(isPermistted) {
         this.commune = new CommuneDto();
         this.createCommuneDialog = true;
    }else{
        this.messageService.add({
        severity: 'error', summary: 'erreur', detail: 'problème de permission'
        });
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
    get lotReleve(): LotReleveDto {
        return this.lotReleveService.item;
    }
    set lotReleve(value: LotReleveDto) {
        this.lotReleveService.item = value;
    }
    get lotReleves(): Array<LotReleveDto> {
        return this.lotReleveService.items;
    }
    set lotReleves(value: Array<LotReleveDto>) {
        this.lotReleveService.items = value;
    }
    get createLotReleveDialog(): boolean {
        return this.lotReleveService.createDialog;
    }
    set createLotReleveDialog(value: boolean) {
        this.lotReleveService.createDialog= value;
    }



    get validBatimentCodeBatiment(): boolean {
        return this._validBatimentCodeBatiment;
    }

    set validBatimentCodeBatiment(value: boolean) {
         this._validBatimentCodeBatiment = value;
    }
    get validBatimentLibelle(): boolean {
        return this._validBatimentLibelle;
    }

    set validBatimentLibelle(value: boolean) {
         this._validBatimentLibelle = value;
    }

    get validAppareilNumeroAppareil(): boolean {
        return this._validAppareilNumeroAppareil;
    }
    set validAppareilNumeroAppareil(value: boolean) {
        this._validAppareilNumeroAppareil = value;
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

    get appareilElement(): AppareilDto {
        if( this._appareilElement == null )
            this._appareilElement = new AppareilDto();
        return this._appareilElement;
    }

    set appareilElement(value: AppareilDto) {
        this._appareilElement = value;
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

    get createDialog(): boolean {
        return this.service.createDialog;
    }

    set createDialog(value: boolean) {
        this.service.createDialog = value;
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

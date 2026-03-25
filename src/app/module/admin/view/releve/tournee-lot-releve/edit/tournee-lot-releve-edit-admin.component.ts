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




import {TourneeLotReleveAdminService} from 'src/app/shared/service/admin/releve/TourneeLotReleveAdmin.service';
import {TourneeLotReleveDto} from 'src/app/shared/model/releve/TourneeLotReleve.model';
import {TourneeLotReleveCriteria} from 'src/app/shared/criteria/releve/TourneeLotReleveCriteria.model';


import {TourneeReleveDetailDto} from 'src/app/shared/model/releve/TourneeReleveDetail.model';
import {TourneeReleveDetailAdminService} from 'src/app/shared/service/admin/releve/TourneeReleveDetailAdmin.service';
import {LotReleveDto} from 'src/app/shared/model/releve/LotReleve.model';
import {LotReleveAdminService} from 'src/app/shared/service/admin/releve/LotReleveAdmin.service';
import {TourneeReleveCompteurDto} from 'src/app/shared/model/releve/TourneeReleveCompteur.model';
import {TourneeReleveCompteurAdminService} from 'src/app/shared/service/admin/releve/TourneeReleveCompteurAdmin.service';

@Component({
  selector: 'app-tournee-lot-releve-edit-admin',
  standalone: false,
  templateUrl: './tournee-lot-releve-edit-admin.component.html'
})
export class TourneeLotReleveEditAdminComponent implements OnInit {

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

    protected tourneeReleveDetailsIndex = -1;

    private _tourneeReleveDetailsElement = new TourneeReleveDetailDto();

    private _validTourneeLotReleveNumero = true;
    private _validTourneeLotReleveLibelle = true;
    private _validTourneeLotReleveAnnee = true;
    private _validTourneeLotRelevePeriod = true;

    private _validLotReleveNumero = true;
    private _validLotReleveCode = true;



    constructor(private service: TourneeLotReleveAdminService , private tourneeReleveDetailService: TourneeReleveDetailAdminService, private lotReleveService: LotReleveAdminService, @Inject(PLATFORM_ID) private platformId?: Object) {
        this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
    }

    ngOnInit(): void {
        this.tourneeReleveDetailsElement.lotReleve = new LotReleveDto();
        this.lotReleveService.findAll().subscribe((data) => this.lotReleves = data);

        this.lotReleveService.findAll().subscribe((data) => this.lotReleves = data);
    }

    public prepareEdit() {
        this.item.dateCreation = this.service.format(this.item.dateCreation!);
        this.item.dateMiseAJour = this.service.format(this.item.dateMiseAJour!);
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
            this.item = new TourneeLotReleveDto();
        } , error =>{
            console.log(error);
        });
    }

    public hideEditDialog() {
        this.editDialog = false;
        this.setValidation(true);
    }





    public validateTourneeReleveDetails(){
        this.errorMessages = new Array();
    }

    public setValidation(value: boolean){
        this.validTourneeLotReleveNumero = value;
        this.validTourneeLotReleveLibelle = value;
        this.validTourneeLotReleveAnnee = value;
        this.validTourneeLotRelevePeriod = value;
    }

    public addTourneeReleveDetails() {
        if( this.item.tourneeReleveDetails == null )
            this.item.tourneeReleveDetails = new Array<TourneeReleveDetailDto>();

       this.validateTourneeReleveDetails();

       if (this.errorMessages.length === 0) {
            if (this.tourneeReleveDetailsIndex == -1){
                this.item.tourneeReleveDetails.push({... this.tourneeReleveDetailsElement});
            }else {
                this.item.tourneeReleveDetails[this.tourneeReleveDetailsIndex] =this.tourneeReleveDetailsElement;
            }
              this.tourneeReleveDetailsElement = new TourneeReleveDetailDto();
              this.tourneeReleveDetailsIndex = -1;
       }else{
           this.messageService.add({severity: 'error',summary: 'Erreurs',detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages});
       }
    }

    public deleteTourneeReleveDetails(p: TourneeReleveDetailDto, index: number) {
        this.item.tourneeReleveDetails.splice(index, 1);
    }

    public editTourneeReleveDetails(p: TourneeReleveDetailDto, index: number) {
        this.tourneeReleveDetailsElement = {... p};
        this.tourneeReleveDetailsIndex = index;
        this.activeTab = 0;
    }

    public validateForm(): void{
        this.errorMessages = new Array<string>();
        this.validateTourneeLotReleveNumero();
        this.validateTourneeLotReleveLibelle();
        this.validateTourneeLotReleveAnnee();
        this.validateTourneeLotRelevePeriod();
    }

    public validateTourneeLotReleveNumero(){
        if (this.stringUtilService.isEmpty(this.item.numero)) {
            this.errorMessages.push('Numero non valide');
            this.validTourneeLotReleveNumero = false;
        } else {
            this.validTourneeLotReleveNumero = true;
        }
    }

    public validateTourneeLotReleveLibelle(){
        if (this.stringUtilService.isEmpty(this.item.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validTourneeLotReleveLibelle = false;
        } else {
            this.validTourneeLotReleveLibelle = true;
        }
    }

    public validateTourneeLotReleveAnnee(){
        if (this.stringUtilService.isEmpty(this.item.annee)) {
            this.errorMessages.push('Annee non valide');
            this.validTourneeLotReleveAnnee = false;
        } else {
            this.validTourneeLotReleveAnnee = true;
        }
    }

    public validateTourneeLotRelevePeriod(){
        if (this.stringUtilService.isEmpty(this.item.period)) {
            this.errorMessages.push('Period non valide');
            this.validTourneeLotRelevePeriod = false;
        } else {
            this.validTourneeLotRelevePeriod = true;
        }
    }




   public async openCreateLotReleve(lotReleve: string) {
        const isPermistted = await this.roleService.isPermitted('LotReleve', 'edit');
        if (isPermistted) {
             this.lotReleve = new LotReleveDto();
             this.createLotReleveDialog = true;
        }else {
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
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

    get tourneeReleveDetailsElement(): TourneeReleveDetailDto {
        if( this._tourneeReleveDetailsElement == null )
            this._tourneeReleveDetailsElement = new TourneeReleveDetailDto();
         return this._tourneeReleveDetailsElement;
    }

    set tourneeReleveDetailsElement(value: TourneeReleveDetailDto) {
        this._tourneeReleveDetailsElement = value;
    }

    get validTourneeLotReleveNumero(): boolean {
        return this._validTourneeLotReleveNumero;
    }
    set validTourneeLotReleveNumero(value: boolean) {
        this._validTourneeLotReleveNumero = value;
    }
    get validTourneeLotReleveLibelle(): boolean {
        return this._validTourneeLotReleveLibelle;
    }
    set validTourneeLotReleveLibelle(value: boolean) {
        this._validTourneeLotReleveLibelle = value;
    }
    get validTourneeLotReleveAnnee(): boolean {
        return this._validTourneeLotReleveAnnee;
    }
    set validTourneeLotReleveAnnee(value: boolean) {
        this._validTourneeLotReleveAnnee = value;
    }
    get validTourneeLotRelevePeriod(): boolean {
        return this._validTourneeLotRelevePeriod;
    }
    set validTourneeLotRelevePeriod(value: boolean) {
        this._validTourneeLotRelevePeriod = value;
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

	get items(): Array<TourneeLotReleveDto> {
        return this.service.items;
    }

    set items(value: Array<TourneeLotReleveDto>) {
        this.service.items = value;
    }

    get item(): TourneeLotReleveDto {
        return this.service.item;
    }

    set item(value: TourneeLotReleveDto) {
        this.service.item = value;
    }

    get editDialog(): boolean {
        return this.service.editDialog;
    }

    set editDialog(value: boolean) {
        this.service.editDialog = value;
    }

    get criteria(): TourneeLotReleveCriteria {
        return this.service.criteria;
    }

    set criteria(value: TourneeLotReleveCriteria) {
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

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




import {TourneeReleveDetailAdminService} from 'src/app/shared/service/admin/releve/TourneeReleveDetailAdmin.service';
import {TourneeReleveDetailDto} from 'src/app/shared/model/releve/TourneeReleveDetail.model';
import {TourneeReleveDetailCriteria} from 'src/app/shared/criteria/releve/TourneeReleveDetailCriteria.model';


import {TourneeLotReleveDto} from 'src/app/shared/model/releve/TourneeLotReleve.model';
import {TourneeLotReleveAdminService} from 'src/app/shared/service/admin/releve/TourneeLotReleveAdmin.service';
import {AppareilDto} from 'src/app/shared/model/config/Appareil.model';
import {AppareilAdminService} from 'src/app/shared/service/admin/config/AppareilAdmin.service';
import {LotReleveDto} from 'src/app/shared/model/releve/LotReleve.model';
import {LotReleveAdminService} from 'src/app/shared/service/admin/releve/LotReleveAdmin.service';
import {TourneeReleveCompteurDto} from 'src/app/shared/model/releve/TourneeReleveCompteur.model';
import {TourneeReleveCompteurAdminService} from 'src/app/shared/service/admin/releve/TourneeReleveCompteurAdmin.service';

@Component({
  selector: 'app-tournee-releve-detail-edit-admin',
  standalone: false,
  templateUrl: './tournee-releve-detail-edit-admin.component.html'
})
export class TourneeReleveDetailEditAdminComponent implements OnInit {

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

    protected tourneeReleveCompteursIndex = -1;

    private _tourneeReleveCompteursElement = new TourneeReleveCompteurDto();


    private _validTourneeLotReleveNumero = true;
    private _validTourneeLotReleveLibelle = true;
    private _validTourneeLotReleveAnnee = true;
    private _validTourneeLotRelevePeriod = true;
    private _validLotReleveNumero = true;
    private _validLotReleveCode = true;



    constructor(private service: TourneeReleveDetailAdminService , private tourneeLotReleveService: TourneeLotReleveAdminService, private appareilService: AppareilAdminService, private lotReleveService: LotReleveAdminService, private tourneeReleveCompteurService: TourneeReleveCompteurAdminService, @Inject(PLATFORM_ID) private platformId?) {
        this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
    }

    ngOnInit(): void {
        this.tourneeReleveCompteursElement.appareil = new AppareilDto();
        this.appareilService.findAll().subscribe((data) => this.appareils = data);

        this.tourneeLotReleveService.findAll().subscribe((data) => this.tourneeLotReleves = data);
        this.lotReleveService.findAll().subscribe((data) => this.lotReleves = data);
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
            this.item = new TourneeReleveDetailDto();
        } , error =>{
            console.log(error);
        });
    }

    public hideEditDialog() {
        this.editDialog = false;
        this.setValidation(true);
    }





    public validateTourneeReleveCompteurs(){
        this.errorMessages = new Array();
    }

    public setValidation(value: boolean){
    }

    public addTourneeReleveCompteurs() {
        if( this.item.tourneeReleveCompteurs == null )
            this.item.tourneeReleveCompteurs = new Array<TourneeReleveCompteurDto>();

       this.validateTourneeReleveCompteurs();

       if (this.errorMessages.length === 0) {
            if (this.tourneeReleveCompteursIndex == -1){
                this.item.tourneeReleveCompteurs.push({... this.tourneeReleveCompteursElement});
            }else {
                this.item.tourneeReleveCompteurs[this.tourneeReleveCompteursIndex] =this.tourneeReleveCompteursElement;
            }
              this.tourneeReleveCompteursElement = new TourneeReleveCompteurDto();
              this.tourneeReleveCompteursIndex = -1;
       }else{
           this.messageService.add({severity: 'error',summary: 'Erreurs',detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages});
       }
    }

    public deleteTourneeReleveCompteurs(p: TourneeReleveCompteurDto, index: number) {
        this.item.tourneeReleveCompteurs.splice(index, 1);
    }

    public editTourneeReleveCompteurs(p: TourneeReleveCompteurDto, index: number) {
        this.tourneeReleveCompteursElement = {... p};
        this.tourneeReleveCompteursIndex = index;
        this.activeTab = 0;
    }

    public validateForm(): void{
        this.errorMessages = new Array<string>();
    }




   public async openCreateTourneeLotReleve(tourneeLotReleve: string) {
        const isPermistted = await this.roleService.isPermitted('TourneeLotReleve', 'edit');
        if (isPermistted) {
             this.tourneeLotReleve = new TourneeLotReleveDto();
             this.createTourneeLotReleveDialog = true;
        }else {
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
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

    get tourneeLotReleve(): TourneeLotReleveDto {
        return this.tourneeLotReleveService.item;
    }
    set tourneeLotReleve(value: TourneeLotReleveDto) {
        this.tourneeLotReleveService.item = value;
    }
    get tourneeLotReleves(): Array<TourneeLotReleveDto> {
        return this.tourneeLotReleveService.items;
    }
    set tourneeLotReleves(value: Array<TourneeLotReleveDto>) {
        this.tourneeLotReleveService.items = value;
    }
    get createTourneeLotReleveDialog(): boolean {
        return this.tourneeLotReleveService.createDialog;
    }
    set createTourneeLotReleveDialog(value: boolean) {
        this.tourneeLotReleveService.createDialog= value;
    }
    get appareil(): AppareilDto {
        return this.appareilService.item;
    }
    set appareil(value: AppareilDto) {
        this.appareilService.item = value;
    }
    get appareils(): Array<AppareilDto> {
        return this.appareilService.items;
    }
    set appareils(value: Array<AppareilDto>) {
        this.appareilService.items = value;
    }
    get createAppareilDialog(): boolean {
        return this.appareilService.createDialog;
    }
    set createAppareilDialog(value: boolean) {
        this.appareilService.createDialog= value;
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

    get tourneeReleveCompteursElement(): TourneeReleveCompteurDto {
        if( this._tourneeReleveCompteursElement == null )
            this._tourneeReleveCompteursElement = new TourneeReleveCompteurDto();
         return this._tourneeReleveCompteursElement;
    }

    set tourneeReleveCompteursElement(value: TourneeReleveCompteurDto) {
        this._tourneeReleveCompteursElement = value;
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

	get items(): Array<TourneeReleveDetailDto> {
        return this.service.items;
    }

    set items(value: Array<TourneeReleveDetailDto>) {
        this.service.items = value;
    }

    get item(): TourneeReleveDetailDto {
        return this.service.item;
    }

    set item(value: TourneeReleveDetailDto) {
        this.service.item = value;
    }

    get editDialog(): boolean {
        return this.service.editDialog;
    }

    set editDialog(value: boolean) {
        this.service.editDialog = value;
    }

    get criteria(): TourneeReleveDetailCriteria {
        return this.service.criteria;
    }

    set criteria(value: TourneeReleveDetailCriteria) {
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

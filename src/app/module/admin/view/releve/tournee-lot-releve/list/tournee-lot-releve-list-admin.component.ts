import {Component, OnInit} from '@angular/core';
import {TourneeLotReleveAdminService} from 'src/app/shared/service/admin/releve/TourneeLotReleveAdmin.service';
import {TourneeLotReleveDto} from 'src/app/shared/model/releve/TourneeLotReleve.model';
import {TourneeLotReleveCriteria} from 'src/app/shared/criteria/releve/TourneeLotReleveCriteria.model';


import {ConfirmationService, MessageService,MenuItem} from 'primeng/api';
import {FileTempDto} from 'src/app/zynerator/dto/FileTempDto.model';
import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {Inject, Injectable, PLATFORM_ID} from '@angular/core';

import {environment} from 'src/environments/environment';

import {RoleService} from 'src/app/zynerator/security/shared/service/Role.service';
import {AbstractService} from 'src/app/zynerator/service/AbstractService';
import {BaseDto} from 'src/app/zynerator/dto/BaseDto.model';
import {BaseCriteria} from 'src/app/zynerator/criteria/BaseCriteria.model';
import {StringUtilService} from 'src/app/zynerator/util/StringUtil.service';
import {ServiceLocator} from 'src/app/zynerator/service/ServiceLocator';

import {AuthService} from 'src/app/zynerator/security/shared/service/Auth.service';
import {ExportService} from 'src/app/zynerator/util/Export.service';


import {TourneeReleveDetailDto} from 'src/app/shared/model/releve/TourneeReleveDetail.model';
import {TourneeReleveDetailAdminService} from 'src/app/shared/service/admin/releve/TourneeReleveDetailAdmin.service';
import {LotReleveDto} from 'src/app/shared/model/releve/LotReleve.model';
import {LotReleveAdminService} from 'src/app/shared/service/admin/releve/LotReleveAdmin.service';
import {TourneeReleveCompteurDto} from 'src/app/shared/model/releve/TourneeReleveCompteur.model';
import {TourneeReleveCompteurAdminService} from 'src/app/shared/service/admin/releve/TourneeReleveCompteurAdmin.service';


@Component({
  selector: 'app-tournee-lot-releve-list-admin',
  standalone: false,
  templateUrl: './tournee-lot-releve-list-admin.component.html'
})
export class TourneeLotReleveListAdminComponent implements OnInit {

    protected fileName = 'TourneeLotReleve';

    protected findByCriteriaShow = false;
    protected cols: any[] = [];
    protected excelPdfButons: MenuItem[];
    protected exportData: any[] = [];
    protected criteriaData: any[] = [];
    protected _totalRecords = 0;
    private _pdfName: string;


    protected datePipe: DatePipe;
    protected messageService: MessageService;
    protected confirmationService: ConfirmationService;
    protected roleService: RoleService;
    protected router: Router;
    protected stringUtilService: StringUtilService;
    protected authService: AuthService;
    protected exportService: ExportService;
    protected excelFile: File | undefined;
    protected enableSecurity = false;


     yesOrNoActif: any[] = [];
    lotReleves: Array<LotReleveDto>;


    constructor( private service: TourneeLotReleveAdminService  , private tourneeReleveDetailService: TourneeReleveDetailAdminService, private lotReleveService: LotReleveAdminService, @Inject(PLATFORM_ID) private platformId?) {
        this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.authService = ServiceLocator.injector.get(AuthService);
        this.exportService = ServiceLocator.injector.get(ExportService);
        this.pdfName = 'TourneeLotReleve.pdf';
    }

    ngOnInit(): void {
        this.findPaginatedByCriteria();
        this.initExport();
        this.initCol();
        this.loadLotReleve();
        this.yesOrNoActif =  [{label: 'Actif', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];

    }




    public onExcelFileSelected(event: any): void {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            this.excelFile = input.files[0];
        }
    }

    public importExcel(): void {
        if (this.excelFile) {
            this.service.importExcel(this.excelFile).subscribe(
                response => {
                    this.items = response;
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'File uploaded successfully!',
                        life: 3000
                    });
                },
                error => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'File uploaded with Error!',
                        life: 3000
                    });
                }
            );
        }
    }

    public findPaginatedByCriteria() {
        this.service.findPaginatedByCriteria(this.criteria).subscribe(paginatedItems => {
            this.items = paginatedItems.list;
            this.totalRecords = paginatedItems.dataSize;
            this.selections = new Array<TourneeLotReleveDto>();
        }, error => console.log(error));
    }

    public onPage(event: any) {
        this.criteria.page = event.page;
        this.criteria.maxResults = event.rows;
        this.findPaginatedByCriteria();
    }

    public async edit(dto: TourneeLotReleveDto) {
        this.service.findByIdWithAssociatedList(dto).subscribe(res => {
            this.item = res;
            console.log(res);
            this.editDialog = true;
        });

    }

    public async view(dto: TourneeLotReleveDto) {
        this.service.findByIdWithAssociatedList(dto).subscribe(res => {
            this.item = res;
            this.viewDialog = true;
        });
    }

    public async openCreate() {
        this.item = new TourneeLotReleveDto();
        this.createDialog = true;
    }

    public async deleteMultiple() {
        this.confirmationService.confirm({
            message: 'Voulez-vous supprimer ces éléments ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
			rejectButtonProps: {
                label: 'Cancel',
                severity: 'secondary',
                outlined: true,
            },
            acceptButtonProps: {
                label: 'Ok',
            },
            accept: () => {
                this.service.deleteMultiple().subscribe(() => {
                    for (let selection of this.selections) {
                        let index = this.items.findIndex(element => element.id === selection.id);
                        this.items.splice(index,1);
                    }
                    this.selections = new Array<TourneeLotReleveDto>();
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Les éléments sélectionnés ont été supprimés',
                        life: 3000
                    });

                }, error => console.log(error));
            }
        });
    }


    public isSelectionDisabled(): boolean {
        return this.selections == null || this.selections.length == 0;
    }


    public async delete(dto: TourneeLotReleveDto) {

        this.confirmationService.confirm({
            message: 'Voulez-vous supprimer cet élément ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
			rejectButtonProps: {
                label: 'Cancel',
                severity: 'secondary',
                outlined: true,
            },
            acceptButtonProps: {
                label: 'Ok',
            },
            accept: () => {
                this.service.delete(dto).subscribe(status => {
                    if (status > 0) {
                        const position = this.items.indexOf(dto);
                        position > -1 ? this.items.splice(position, 1) : false;
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Succès',
                            detail: 'Element Supprimé',
                            life: 3000
                        });
                    }

                }, error => console.log(error));
            }
        });

    }

    public async duplicate(dto: TourneeLotReleveDto) {
        this.service.findByIdWithAssociatedList(dto).subscribe(
            res => {
                this.initDuplicate(res);
                this.item = res;
                this.item.id = null;
                this.createDialog = true;
            });
    }

    // TODO : check if correct
    public initExport(): void {
        this.excelPdfButons = [
            {
                label: 'CSV', icon: 'pi pi-file', command: () => {
                    this.prepareColumnExport();
                    this.exportService.exporterCSV(this.criteriaData, this.exportData, this.fileName);
                }
            },
            {
                label: 'XLS', icon: 'pi pi-file-excel', command: () => {
                    this.prepareColumnExport();
                    this.exportService.exporterExcel(this.criteriaData, this.exportData, this.fileName);
                }
            },
            {
                label: 'PDF', icon: 'pi pi-file-pdf', command: () => {
                    this.prepareColumnExport();
                    this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName);
                }
            }
        ];
    }

    public exportPdf(dto: TourneeLotReleveDto): void {
        this.service.exportPdf(dto).subscribe((data: ArrayBuffer) => {
            const blob = new Blob([data], {type: 'application/pdf'});
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = this.pdfName;
            link.setAttribute('target', '_blank'); // open link in new tab
            link.click();
            window.URL.revokeObjectURL(url);
        }, (error) => {
            console.error(error); // handle any errors that occur
        });
    }

    public showSearch(): void {
        this.findByCriteriaShow = !this.findByCriteriaShow;
    }


    update() {
        this.service.edit().subscribe(data => {
            const myIndex = this.items.findIndex(e => e.id === this.item.id);
            this.items[myIndex] = data;
            this.editDialog = false;
            this.item = new TourneeLotReleveDto();
        } , error => {
            console.log(error);
        });
    }

    public save() {
        this.service.save().subscribe(item => {
            if (item != null) {
                this.items.push({...item});
                this.createDialog = false;


                this.item = new TourneeLotReleveDto();
            } else {
                this.messageService.add({severity: 'error', summary: 'Erreurs', detail: 'Element existant'});
            }
        }, error => {
            console.log(error);
        });
    }

// add


    public initCol() {
        this.cols = [
            {field: 'numero', header: 'Numero'},
            {field: 'libelle', header: 'Libelle'},
            {field: 'annee', header: 'Annee'},
            {field: 'period', header: 'Period'},
            {field: 'jourDebutReleve', header: 'Jour debut releve'},
            {field: 'moisDebutReleve', header: 'Mois debut releve'},
            {field: 'nbLots', header: 'Nb lots'},
            {field: 'nbBatiments', header: 'Nb batiments'},
            {field: 'nbCompteurs', header: 'Nb compteurs'},
            {field: 'nbCompteursBatiment', header: 'Nb compteurs batiment'},
            {field: 'lotReleve?.numero', header: 'Lot releve'},
            {field: 'actif', header: 'Actif'},
            {field: 'dateCreation', header: 'Date creation'},
            {field: 'dateMiseAJour', header: 'Date mise a jour'},
        ];
    }


    public async loadLotReleve(){
        this.lotReleveService.findAllOptimized().subscribe(lotReleves => this.lotReleves = lotReleves, error => console.log(error))
    }


	public initDuplicate(res: TourneeLotReleveDto) {
        if (res.tourneeReleveDetails != null) {
             res.tourneeReleveDetails.forEach(d => { d.tourneeLotReleve = null; d.id = null; });
        }
	}


    public prepareColumnExport(): void {
        this.service.findByCriteria(this.criteria).subscribe(
            (allItems) =>{
                this.exportData = allItems.map(e => {
					return {
						'Numero': e.numero ,
						'Libelle': e.libelle ,
						'Annee': e.annee ,
						'Period': e.period ,
						'Jour debut releve': e.jourDebutReleve ,
						'Mois debut releve': e.moisDebutReleve ,
						'Nb lots': e.nbLots ,
						'Nb batiments': e.nbBatiments ,
						'Nb compteurs': e.nbCompteurs ,
						'Nb compteurs batiment': e.nbCompteursBatiment ,
						'Lot releve': e.lotReleve?.numero ,
						'Actif': e.actif? 'Vrai' : 'Faux' ,
						'Date creation': this.datePipe.transform(e.dateCreation , 'dd/MM/yyyy hh:mm'),
						'Date mise a jour': this.datePipe.transform(e.dateMiseAJour , 'dd/MM/yyyy hh:mm'),
					}
				});

            this.criteriaData = [{
                'Numero': this.criteria.numero ? this.criteria.numero : environment.emptyForExport ,
                'Libelle': this.criteria.libelle ? this.criteria.libelle : environment.emptyForExport ,
                'Annee Min': this.criteria.anneeMin ? this.criteria.anneeMin : environment.emptyForExport ,
                'Annee Max': this.criteria.anneeMax ? this.criteria.anneeMax : environment.emptyForExport ,
                'Period Min': this.criteria.periodMin ? this.criteria.periodMin : environment.emptyForExport ,
                'Period Max': this.criteria.periodMax ? this.criteria.periodMax : environment.emptyForExport ,
                'Jour debut releve Min': this.criteria.jourDebutReleveMin ? this.criteria.jourDebutReleveMin : environment.emptyForExport ,
                'Jour debut releve Max': this.criteria.jourDebutReleveMax ? this.criteria.jourDebutReleveMax : environment.emptyForExport ,
                'Mois debut releve Min': this.criteria.moisDebutReleveMin ? this.criteria.moisDebutReleveMin : environment.emptyForExport ,
                'Mois debut releve Max': this.criteria.moisDebutReleveMax ? this.criteria.moisDebutReleveMax : environment.emptyForExport ,
                'Nb lots Min': this.criteria.nbLotsMin ? this.criteria.nbLotsMin : environment.emptyForExport ,
                'Nb lots Max': this.criteria.nbLotsMax ? this.criteria.nbLotsMax : environment.emptyForExport ,
                'Nb batiments Min': this.criteria.nbBatimentsMin ? this.criteria.nbBatimentsMin : environment.emptyForExport ,
                'Nb batiments Max': this.criteria.nbBatimentsMax ? this.criteria.nbBatimentsMax : environment.emptyForExport ,
                'Nb compteurs Min': this.criteria.nbCompteursMin ? this.criteria.nbCompteursMin : environment.emptyForExport ,
                'Nb compteurs Max': this.criteria.nbCompteursMax ? this.criteria.nbCompteursMax : environment.emptyForExport ,
                'Nb compteurs batiment Min': this.criteria.nbCompteursBatimentMin ? this.criteria.nbCompteursBatimentMin : environment.emptyForExport ,
                'Nb compteurs batiment Max': this.criteria.nbCompteursBatimentMax ? this.criteria.nbCompteursBatimentMax : environment.emptyForExport ,
            //'Lot releve': this.criteria.lotReleve?.numero ? this.criteria.lotReleve?.numero : environment.emptyForExport ,
                'Actif': this.criteria.actif ? (this.criteria.actif ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
                'Date creation Min': this.criteria.dateCreationFrom ? this.datePipe.transform(this.criteria.dateCreationFrom , this.dateFormat) : environment.emptyForExport ,
                'Date creation Max': this.criteria.dateCreationTo ? this.datePipe.transform(this.criteria.dateCreationTo , this.dateFormat) : environment.emptyForExport ,
                'Date mise a jour Min': this.criteria.dateMiseAJourFrom ? this.datePipe.transform(this.criteria.dateMiseAJourFrom , this.dateFormat) : environment.emptyForExport ,
                'Date mise a jour Max': this.criteria.dateMiseAJourTo ? this.datePipe.transform(this.criteria.dateMiseAJourTo , this.dateFormat) : environment.emptyForExport ,
            }];
			}

        )
    }


    get items(): Array<TourneeLotReleveDto> {
        return this.service.items;
    }

    set items(value: Array<TourneeLotReleveDto>) {
        this.service.items = value;
    }

    get selections(): Array<TourneeLotReleveDto> {
        return this.service.selections;
    }

    set selections(value: Array<TourneeLotReleveDto>) {
        this.service.selections = value;
    }

    get item(): TourneeLotReleveDto {
        return this.service.item;
    }

    set item(value: TourneeLotReleveDto) {
        this.service.item = value;
    }

    get createDialog(): boolean {
        return this.service.createDialog;
    }

    set createDialog(value: boolean) {
        this.service.createDialog = value;
    }

    get editDialog(): boolean {
        return this.service.editDialog;
    }

    set editDialog(value: boolean) {
        this.service.editDialog = value;
    }

    get viewDialog(): boolean {
        return this.service.viewDialog;
    }

    set viewDialog(value: boolean) {
        this.service.viewDialog = value;
    }

    get criteria(): TourneeLotReleveCriteria {
        return this.service.criteria;
    }

    set criteria(value: TourneeLotReleveCriteria) {
        this.service.criteria = value;
    }

    get dateFormat() {
        return environment.dateFormatList;
    }


    get totalRecords(): number {
        return this._totalRecords;
    }

    set totalRecords(value: number) {
        this._totalRecords = value;
    }

    get pdfName(): string {
        return this._pdfName;
    }

    set pdfName(value: string) {
        this._pdfName = value;
    }

    get createActionIsValid(): boolean {
        return this.service.createActionIsValid;
    }

    set createActionIsValid(value: boolean) {
        this.service.createActionIsValid = value;
    }


    get editActionIsValid(): boolean {
        return this.service.editActionIsValid;
    }

    set editActionIsValid(value: boolean) {
        this.service.editActionIsValid = value;
    }

    get listActionIsValid(): boolean {
        return this.service.listActionIsValid;
    }

    set listActionIsValid(value: boolean) {
        this.service.listActionIsValid = value;
    }

    get deleteActionIsValid(): boolean {
        return this.service.deleteActionIsValid;
    }

    set deleteActionIsValid(value: boolean) {
        this.service.deleteActionIsValid = value;
    }


    get viewActionIsValid(): boolean {
        return this.service.viewActionIsValid;
    }

    set viewActionIsValid(value: boolean) {
        this.service.viewActionIsValid = value;
    }

    get duplicateActionIsValid(): boolean {
        return this.service.duplicateActionIsValid;
    }

    set duplicateActionIsValid(value: boolean) {
        this.service.duplicateActionIsValid = value;
    }

    get createAction(): string {
        return this.service.createAction;
    }

    set createAction(value: string) {
        this.service.createAction = value;
    }

    get listAction(): string {
        return this.service.listAction;
    }

    set listAction(value: string) {
        this.service.listAction = value;
    }

    get editAction(): string {
        return this.service.editAction;
    }

    set editAction(value: string) {
        this.service.editAction = value;
    }

    get deleteAction(): string {
        return this.service.deleteAction;
    }

    set deleteAction(value: string) {
        this.service.deleteAction = value;
    }

    get viewAction(): string {
        return this.service.viewAction;
    }

    set viewAction(value: string) {
        this.service.viewAction = value;
    }

    get duplicateAction(): string {
        return this.service.duplicateAction;
    }

    set duplicateAction(value: string) {
        this.service.duplicateAction = value;
    }

    get entityName(): string {
        return this.service.entityName;
    }

    set entityName(value: string) {
        this.service.entityName = value;
    }
}

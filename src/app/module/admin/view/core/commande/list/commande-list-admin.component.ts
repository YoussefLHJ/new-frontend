import {Component, viewChild, OnInit} from '@angular/core';
import {CommandeAdminService} from 'src/app/shared/service/admin/core/CommandeAdmin.service';
import {CommandeDto} from 'src/app/shared/model/core/Commande.model';
import {CommandeCriteria} from 'src/app/shared/criteria/core/CommandeCriteria.model';
import {AppNotificationService} from 'src/app/shared/service/AppNotification.service';

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

import {CommandeItemDto} from 'src/app/shared/model/core/CommandeItem.model';
import {CommandeItemAdminService} from 'src/app/shared/service/admin/core/CommandeItemAdmin.service';


import {ServerColumnConfig ,GroupingConfig ,DataGridListComponent, DataGridCreateComponent, DataGridEditComponent, DataGridViewComponent } from '@/app/pages/components/data-grid';

@Component({
  selector: 'app-commande-list-admin',
  standalone: false,
  templateUrl: './commande-list-admin.component.html'
})
export class CommandeListAdminComponent implements OnInit {


    protected filterColumns: string[] = ['code','total','totalPayer','dateCommande','etatComande',];
    groupingConfig: GroupingConfig = { enabled: true };

    protected columns: ServerColumnConfig[] = [



        {
            field: 'code',
            header: 'commande.code',
            visible:  true,
            groupable: true,
            type: 'text',
            criteriaMapping: {
              contains: 'codeLike',
              equals: 'code'
            }
        },




        {
            field: 'total',
            header: 'commande.total',
            visible:  true,

            type: 'numeric',
            criteriaMapping: {
              greaterThan: 'totalMin',
              lessThan: 'totalMax'
            }
        },




        {
            field: 'totalPayer',
            header: 'commande.totalPayer',
            visible:  true,

            type: 'numeric',
            criteriaMapping: {
              greaterThan: 'totalPayerMin',
              lessThan: 'totalPayerMax'
            }
        },




        {
            field: 'dateCommande',
            header: 'commande.dateCommande',
            visible:  true,
            groupable: true,
            type: 'date',
            dateFormat : 'dd/MM/yyyy',
            criteriaMapping: {
              greaterThan: 'dateCommandeMin',
              lessThan: 'dateCommandeMax'
            }
        },



        {
            field: 'etatComande',
            header: 'commande.etatComande',
            visible:  true,
            groupable: true,
            type: 'text',
            criteriaMapping: {
              contains: 'etatComandeLike',
              equals: 'etatComande'
            }
        },






    ];
    protected fileName = 'Commande';

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
    protected notificationService: AppNotificationService;
    protected excelFile: File | undefined;
    protected enableSecurity = false;

    public dataLoader = (criteria: CommandeCriteria) => this.service.findPaginatedByCriteria(criteria);
    public criteriaFactory = () => new CommandeCriteria();
    public exportDataLoader = (criteria: CommandeCriteria) => this.service.findByCriteria(criteria);
	dataGridList = viewChild(DataGridListComponent);

    /** Exposes the domain service to the template for the data-grid [service] binding. */
    get gridService() { return this.service; }





    constructor( private service: CommandeAdminService  , private commandeItemService: CommandeItemAdminService, @Inject(PLATFORM_ID) private platformId?: Object) {
        this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.authService = ServiceLocator.injector.get(AuthService);
        this.exportService = ServiceLocator.injector.get(ExportService);
        this.notificationService = ServiceLocator.injector.get(AppNotificationService);
    }

    ngOnInit(): void {
        this.findPaginatedByCriteria();
        this.initExport();
        this.initCol();
    }

    public onSaved(): void {
        this.dataGridList()?.refresh();
    }

    public onUpdated(): void {
        this.dataGridList()?.refresh();
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
                    this.notificationService.success('Import réussi', 'Fichier importé avec succès');
                },
                (error: any) => {
                    console.error(error);
                    this.notificationService.error('Erreur import', 'Une erreur est survenue lors de l\'importation');
                }
            );
        }
    }

    public findPaginatedByCriteria() {
        this.service.findPaginatedByCriteria(this.criteria).subscribe(paginatedItems => {
            this.items = paginatedItems.list;
            this.totalRecords = paginatedItems.dataSize;
            this.selections = new Array<CommandeDto>();
        }, (error: any) => console.log(error));
    }

    public onPage(event: any) {
        this.criteria.page = event.page;
        this.criteria.maxResults = event.rows;
        this.findPaginatedByCriteria();
    }

    public async edit(dto: CommandeDto) {
        this.service.findByIdWithAssociatedList(dto).subscribe(res => {
            this.item = res;
            if (!this.item.commandeItems) {
                this.item.commandeItems = [];
            }
            this.editDialog = true;
        });
    }


    public async view(dto: CommandeDto) {
        this.service.findByIdWithAssociatedList(dto).subscribe(res => {
            this.item = res;
            this.viewDialog = true;
        });
    }

    public async openCreate() {
        this.item = new CommandeDto();
        this.createDialog = true;
    }
	public async openEdit(dto: CommandeDto) {
        this.service.findByIdWithAssociatedList(dto).subscribe(res => {
            if (!res.commandeItems) {
                res.commandeItems = [];
            }
            this.service.item = res;
            this.service.editDialog = true;
        });
    }

	public deleteSelected(dtos: CommandeDto[]) {
        this.confirmationService.confirm({
            message: 'Voulez-vous supprimer ces éléments ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            rejectButtonProps: { label: 'Cancel', severity: 'secondary', outlined: true },
            acceptButtonProps: { label: 'Ok' },
            accept: () => {
                this.service.selections = dtos;
                this.service.deleteMultiple().subscribe(() => {
                    this.notificationService.success('Suppression réussie', 'Les éléments sélectionnés ont été supprimés');
                    this.dataGridList()?.refresh();
                }, (error: any) => {
                    console.error(error);
                    this.notificationService.error('Erreur suppression', 'Une erreur est survenue lors de la suppression');
                });
            }
        });
    }


    public isSelectionDisabled(): boolean {
        return this.selections == null || this.selections.length == 0;
    }

    public delete(dto: CommandeDto) {
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
                        this.notificationService.success('Suppression réussie', 'La commande a été supprimée');
                        this.dataGridList()?.refresh();
                    }
                }, (error: any) => {
                    console.error(error);
                    this.notificationService.error('Erreur suppression', 'Une erreur est survenue lors de la suppression');
                });
            }
        });
    }

    public async duplicate(dto: CommandeDto) {
        this.service.findByIdWithAssociatedList(dto).subscribe(
            (res: CommandeDto) => {
                this.initDuplicate(res);
                this.item = res;
                this.item.id = null as any;
                this.createDialog = true;
            });
    }

    // TODO : check if correct
    public initExport(): void {
        this.excelPdfButons = [
            {
                label: 'CSV', icon: 'pi pi-file', command: () => {
                    this.prepareColumnExport();
                    this.exportService.exportCsv(this.fileName, this.criteriaData, this.exportData, this.fileName);
                }
            },
            {
                label: 'XLS', icon: 'pi pi-file-excel', command: () => {
                    this.prepareColumnExport();
                    this.exportService.exportExcel(this.fileName, this.criteriaData, this.exportData, this.fileName);
                }
            },
            {
                label: 'PDF', icon: 'pi pi-file-pdf', command: () => {
                    this.prepareColumnExport();
                    this.exportService.exportPdf(this.fileName, this.criteriaData, this.exportData, this.fileName);
                }
            }
        ];
    }

    public exportPdf(dto: CommandeDto): void {
        this.service.exportPdf(dto).subscribe((data: ArrayBuffer) => {
            const blob = new Blob([data], {type: 'application/pdf'});
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = this.pdfName;
            link.setAttribute('target', '_blank'); // open link in new tab
            link.click();
            window.URL.revokeObjectURL(url);
        }, (error: any) => {
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
            this.item = new CommandeDto();
        } , (error: any) => {
            console.log(error);
        });
    }

    public save() {
        this.service.save().subscribe(item => {
            if (item != null) {
                this.items.push({...item});
                this.createDialog = false;
                this.item = new CommandeDto();
                this.notificationService.success('Succès', 'Commande créée avec succès');
            } else {
                this.notificationService.error('Erreur', 'Cet élément existe déjà');
            }
        }, (error: any) => {
            console.error(error);
            this.notificationService.error('Erreur', 'Une erreur est survenue lors de la sauvegarde');
        });
    }

// add


    public initCol() {
        this.cols = [
            {field: 'code', header: 'Code'},
            {field: 'total', header: 'Total'},
            {field: 'totalPayer', header: 'Total payer'},
            {field: 'dateCommande', header: 'Date commande'},
            {field: 'etatComande', header: 'Etat comande'},
        ];
    }




	public initDuplicate(res: CommandeDto) {
        if (res.commandeItems != null) {
             res.commandeItems.forEach(d => { d.commande = null as any; d.id = null as any; });
        }
	}


    public prepareColumnExport(): void {
        this.service.findByCriteria(this.criteria).subscribe(
            (allItems) =>{
                this.exportData = allItems.map(e => {
					return {
						'Code': e.code ,
						'Total': e.total ,
						'Total payer': e.totalPayer ,
						'Date commande': this.datePipe.transform(e.dateCommande , 'dd/MM/yyyy hh:mm'),
						'Etat comande': e.etatComande ,
					}
				});

            this.criteriaData = [{
                'Code': this.criteria.code ? this.criteria.code : environment.emptyForExport ,
                'Total Min': this.criteria.totalMin ? this.criteria.totalMin : environment.emptyForExport ,
                'Total Max': this.criteria.totalMax ? this.criteria.totalMax : environment.emptyForExport ,
                'Total payer Min': this.criteria.totalPayerMin ? this.criteria.totalPayerMin : environment.emptyForExport ,
                'Total payer Max': this.criteria.totalPayerMax ? this.criteria.totalPayerMax : environment.emptyForExport ,
                'Date commande Min': this.criteria.dateCommandeFrom ? this.datePipe.transform(this.criteria.dateCommandeFrom , this.dateFormat) : environment.emptyForExport ,
                'Date commande Max': this.criteria.dateCommandeTo ? this.datePipe.transform(this.criteria.dateCommandeTo , this.dateFormat) : environment.emptyForExport ,
                'Etat comande': this.criteria.etatComande ? this.criteria.etatComande : environment.emptyForExport ,
            }];
			}

        )
    }


    get items(): Array<CommandeDto> {
        return this.service.items;
    }

    set items(value: Array<CommandeDto>) {
        this.service.items = value;
    }

    get selections(): Array<CommandeDto> {
        return this.service.selections;
    }

    set selections(value: Array<CommandeDto>) {
        this.service.selections = value;
    }

    get item(): CommandeDto {
        return this.service.item;
    }

    set item(value: CommandeDto) {
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

    get criteria(): CommandeCriteria {
        return this.service.criteria;
    }

    set criteria(value: CommandeCriteria) {
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

import {Component, viewChild, OnInit} from '@angular/core';
import {CommandeItemAdminService} from 'src/app/shared/service/admin/core/CommandeItemAdmin.service';
import {CommandeItemDto} from 'src/app/shared/model/core/CommandeItem.model';
import {CommandeItemCriteria} from 'src/app/shared/criteria/core/CommandeItemCriteria.model';


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

import {CommandeDto} from 'src/app/shared/model/core/Commande.model';
import {CommandeAdminService} from 'src/app/shared/service/admin/core/CommandeAdmin.service';


import {ServerColumnConfig ,GroupingConfig ,DataGridListComponent, DataGridCreateComponent, DataGridEditComponent, DataGridViewComponent } from '@/app/pages/components/data-grid';

@Component({
  selector: 'app-commande-item-list-admin',
  standalone: false,
  templateUrl: './commande-item-list-admin.component.html'
})
export class CommandeItemListAdminComponent implements OnInit {


    protected filterColumns: string[] = ['commande','produit','prix','quantite','description','commentaireClient','commentaireVendeur','code',];
    groupingConfig: GroupingConfig = {} ;

    protected columns: ServerColumnConfig[] = [


         {
            field: 'commande',
            header: 'commandeItem.commande',
            visible:  true,
            type: 'entity',
            entityLabelField: 'code',
            criteriaMapping: {
              equals: 'id'
            }
        },



        {
            field: 'produit',
            header: 'commandeItem.produit',
            visible:  true,

            type: 'text',
            criteriaMapping: {
              contains: 'produitLike',
              equals: 'produit'
            }
        },




        {
            field: 'prix',
            header: 'commandeItem.prix',
            visible:  true,

            type: 'numeric',
            criteriaMapping: {
              greaterThan: 'prixMin',
              lessThan: 'prixMax'
            }
        },




        {
            field: 'quantite',
            header: 'commandeItem.quantite',
            visible:  true,

            type: 'numeric',
            criteriaMapping: {
              greaterThan: 'quantiteMin',
              lessThan: 'quantiteMax'
            }
        },




        {
            field: 'description',
            header: 'commandeItem.description',
            visible:  true,

            type: 'text',
            criteriaMapping: {
              contains: 'descriptionLike',
              equals: 'description'
            }
        },




        {
            field: 'commentaireClient',
            header: 'commandeItem.commentaireClient',
            visible:  true,

            type: 'text',
            criteriaMapping: {
              contains: 'commentaireClientLike',
              equals: 'commentaireClient'
            }
        },




        {
            field: 'commentaireVendeur',
            header: 'commandeItem.commentaireVendeur',
            visible:  true,

            type: 'text',
            criteriaMapping: {
              contains: 'commentaireVendeurLike',
              equals: 'commentaireVendeur'
            }
        },




        {
            field: 'code',
            header: 'commandeItem.code',
            visible:  true,

            type: 'text',
            criteriaMapping: {
              contains: 'codeLike',
              equals: 'code'
            }
        },




    ];
    protected fileName = 'CommandeItem';

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

    public dataLoader = (criteria: CommandeItemCriteria) => this.service.findPaginatedByCriteria(criteria);
    public criteriaFactory = () => new CommandeItemCriteria();
    public exportDataLoader = (criteria: CommandeItemCriteria) => this.service.findByCriteria(criteria);
	dataGridList = viewChild(DataGridListComponent);

    /** Exposes the domain service to the template for the data-grid [service] binding. */
    get gridService() { return this.service; }



    commandes: Array<CommandeDto>;


    constructor( private service: CommandeItemAdminService  , private commandeService: CommandeAdminService, @Inject(PLATFORM_ID) private platformId?: Object) {
        this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.authService = ServiceLocator.injector.get(AuthService);
        this.exportService = ServiceLocator.injector.get(ExportService);
    }

    ngOnInit(): void {
        this.findPaginatedByCriteria();
        this.initExport();
        this.initCol();
        this.loadCommande();
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
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'File uploaded successfully!',
                        life: 3000
                    });
                },
                (error: any) => {
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
            this.selections = new Array<CommandeItemDto>();
        }, (error: any) => console.log(error));
    }

    public onPage(event: any) {
        this.criteria.page = event.page;
        this.criteria.maxResults = event.rows;
        this.findPaginatedByCriteria();
    }

    public async edit(dto: CommandeItemDto) {
        this.service.findByIdWithAssociatedList(dto).subscribe(res => {
            this.item = res;
            console.log(res);
            this.editDialog = true;
        });

    }


    public async view(dto: CommandeItemDto) {
        this.service.findByIdWithAssociatedList(dto).subscribe(res => {
            this.item = res;
            this.viewDialog = true;
        });
    }

    public async openCreate() {
        this.item = new CommandeItemDto();
        this.createDialog = true;
    }
	public async openEdit(dto: CommandeItemDto) {
        this.service.findByIdWithAssociatedList(dto).subscribe(res => {
            this.service.item = res;
            this.service.editDialog = true;
        });
    }

	public deleteSelected(dtos: CommandeItemDto[]) {
        this.confirmationService.confirm({
            message: 'Voulez-vous supprimer ces éléments ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            rejectButtonProps: { label: 'Cancel', severity: 'secondary', outlined: true },
            acceptButtonProps: { label: 'Ok' },
            accept: () => {
                this.service.selections = dtos;
                this.service.deleteMultiple().subscribe(() => {
                    this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Les éléments sélectionnés ont été supprimés', life: 3000 });
                    this.dataGridList()?.refresh();
                }, (error: any) => console.log(error));
            }
        });
    }


    public isSelectionDisabled(): boolean {
        return this.selections == null || this.selections.length == 0;
    }

    public delete(dto: CommandeItemDto) {
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

                }, (error: any) => console.log(error));
            }
        });
    }

    public async duplicate(dto: CommandeItemDto) {
        this.service.findByIdWithAssociatedList(dto).subscribe(
            (res: CommandeItemDto) => {
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

    public exportPdf(dto: CommandeItemDto): void {
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
            this.item = new CommandeItemDto();
        } , (error: any) => {
            console.log(error);
        });
    }

    public save() {
        this.service.save().subscribe(item => {
            if (item != null) {
                this.items.push({...item});
                this.createDialog = false;


                this.item = new CommandeItemDto();
            } else {
                this.messageService.add({severity: 'error', summary: 'Erreurs', detail: 'Element existant'});
            }
        }, (error: any) => {
            console.log(error);
        });
    }

// add


    public initCol() {
        this.cols = [
            {field: 'commande?.code', header: 'Commande'},
            {field: 'produit', header: 'Produit'},
            {field: 'prix', header: 'Prix'},
            {field: 'quantite', header: 'Quantite'},
            {field: 'code', header: 'Code'},
        ];
    }


    public async loadCommande(){
        this.commandeService.findAllOptimized().subscribe(commandes => this.commandes = commandes, error => console.log(error))
    }


	public initDuplicate(res: CommandeItemDto) {
	}


    public prepareColumnExport(): void {
        this.service.findByCriteria(this.criteria).subscribe(
            (allItems) =>{
                this.exportData = allItems.map(e => {
					return {
						'Commande': e.commande?.code ,
						'Produit': e.produit ,
						'Prix': e.prix ,
						'Quantite': e.quantite ,
						'Description': e.description ,
						'Commentaire client': e.commentaireClient ,
						'Commentaire vendeur': e.commentaireVendeur ,
						'Code': e.code ,
					}
				});

            this.criteriaData = [{
            //'Commande': this.criteria.commande?.code ? this.criteria.commande?.code : environment.emptyForExport ,
                'Produit': this.criteria.produit ? this.criteria.produit : environment.emptyForExport ,
                'Prix Min': this.criteria.prixMin ? this.criteria.prixMin : environment.emptyForExport ,
                'Prix Max': this.criteria.prixMax ? this.criteria.prixMax : environment.emptyForExport ,
                'Quantite Min': this.criteria.quantiteMin ? this.criteria.quantiteMin : environment.emptyForExport ,
                'Quantite Max': this.criteria.quantiteMax ? this.criteria.quantiteMax : environment.emptyForExport ,
                'Description': this.criteria.description ? this.criteria.description : environment.emptyForExport ,
                'Commentaire client': this.criteria.commentaireClient ? this.criteria.commentaireClient : environment.emptyForExport ,
                'Commentaire vendeur': this.criteria.commentaireVendeur ? this.criteria.commentaireVendeur : environment.emptyForExport ,
                'Code': this.criteria.code ? this.criteria.code : environment.emptyForExport ,
            }];
			}

        )
    }


    get items(): Array<CommandeItemDto> {
        return this.service.items;
    }

    set items(value: Array<CommandeItemDto>) {
        this.service.items = value;
    }

    get selections(): Array<CommandeItemDto> {
        return this.service.selections;
    }

    set selections(value: Array<CommandeItemDto>) {
        this.service.selections = value;
    }

    get item(): CommandeItemDto {
        return this.service.item;
    }

    set item(value: CommandeItemDto) {
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

    get criteria(): CommandeItemCriteria {
        return this.service.criteria;
    }

    set criteria(value: CommandeItemCriteria) {
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

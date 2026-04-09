import {Component, Inject, OnInit, PLATFORM_ID, viewChild} from '@angular/core';
import {BatimentAdminService} from 'src/app/shared/service/admin/core/BatimentAdmin.service';
import {BatimentDto} from 'src/app/shared/model/core/Batiment.model';
import {BatimentCriteria} from 'src/app/shared/criteria/core/BatimentCriteria.model';


import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';
import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';

import {environment} from 'src/environments/environment';

import {RoleService} from 'src/app/zynerator/security/shared/service/Role.service';
import {StringUtilService} from 'src/app/zynerator/util/StringUtil.service';
import {ServiceLocator} from 'src/app/zynerator/service/ServiceLocator';

import {AuthService} from 'src/app/zynerator/security/shared/service/Auth.service';
import {ExportService} from 'src/app/zynerator/util/Export.service';

import {CommuneDto} from 'src/app/shared/model/config/Commune.model';
import {CommuneAdminService} from 'src/app/shared/service/admin/config/CommuneAdmin.service';
import {AppareilAdminService} from 'src/app/shared/service/admin/core/AppareilAdmin.service';


import {DataGridListComponent, ServerColumnConfig} from '@/app/pages/components/data-grid';

@Component({
    selector: 'app-batiment-list-admin',
    standalone: false,
    templateUrl: './batiment-list-admin.component.html'
})
export class BatimentListAdminComponent implements OnInit {


    protected filterColumns: string[] = ['code', 'complementAdresse', 'libelle', 'nombreEtages', 'nombrePointsLivraison', 'nombreLieuxReleve', 'nombreLieuxConsommation', 'commune', 'actif',];


    protected columns: ServerColumnConfig[] = [


        {
            field: 'code',
            header: 'batiment.code',
            visible: true,

            type: 'text',
            criteriaMapping: {
                contains: 'codeLike',
                equals: 'code'
            }
        },


        {
            field: 'complementAdresse',
            header: 'batiment.complementAdresse',
            visible: true,

            type: 'text',
            criteriaMapping: {
                contains: 'complementAdresseLike',
                equals: 'complementAdresse'
            }
        },


        {
            field: 'libelle',
            header: 'batiment.libelle',
            visible: true,

            type: 'text',
            criteriaMapping: {
                contains: 'libelleLike',
                equals: 'libelle'
            }
        },


        {
            field: 'nombreEtages',
            header: 'batiment.nombreEtages',
            visible: true,

            type: 'numeric',
            criteriaMapping: {
                greaterThan: 'nombreEtagesMin',
                lessThan: 'nombreEtagesMax'
            }
        },


        {
            field: 'nombrePointsLivraison',
            header: 'batiment.nombrePointsLivraison',
            visible: true,

            type: 'numeric',
            criteriaMapping: {
                greaterThan: 'nombrePointsLivraisonMin',
                lessThan: 'nombrePointsLivraisonMax'
            }
        },


        {
            field: 'nombreLieuxReleve',
            header: 'batiment.nombreLieuxReleve',
            visible: true,

            type: 'numeric',
            criteriaMapping: {
                greaterThan: 'nombreLieuxReleveMin',
                lessThan: 'nombreLieuxReleveMax'
            }
        },


        {
            field: 'nombreLieuxConsommation',
            header: 'batiment.nombreLieuxConsommation',
            visible: true,

            type: 'numeric',
            criteriaMapping: {
                greaterThan: 'nombreLieuxConsommationMin',
                lessThan: 'nombreLieuxConsommationMax'
            }
        },


        {
            field: 'commune',
            header: 'batiment.commune',
            visible: true,
            type: 'entity',
            entityLabelField: 'libelle',
            criteriaMapping: {
                equals: 'id'
            }
        },


        {
            field: 'actif',
            header: 'batiment.actif',
            visible: true,

            type: 'boolean',
            criteriaMapping: {
                equals: 'actif'
            }
        },


    ];
    protected fileName = 'Batiment';

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

    public dataLoader = (criteria: BatimentCriteria) => this.service.findPaginatedByCriteria(criteria);
    public criteriaFactory = () => new BatimentCriteria();
    public exportDataLoader = (criteria: BatimentCriteria) => this.service.findByCriteria(criteria);
    dataGridList = viewChild(DataGridListComponent);


    yesOrNoActif: any[] = [];
    communes: Array<CommuneDto>;


    constructor(private service: BatimentAdminService, private communeService: CommuneAdminService, private appareilService: AppareilAdminService, @Inject(PLATFORM_ID) private platformId?) {
        this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.authService = ServiceLocator.injector.get(AuthService);
        this.exportService = ServiceLocator.injector.get(ExportService);
        this.pdfName = 'Batiment.pdf';
    }

    ngOnInit(): void {
        this.findPaginatedByCriteria();
        this.initExport();
        this.initCol();
        this.loadCommune();
        this.yesOrNoActif = [{label: 'Actif', value: null}, {label: 'Oui', value: 1}, {label: 'Non', value: 0}];
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
            this.selections = new Array<BatimentDto>();
        }, (error: any) => console.log(error));
    }

    public onPage(event: any) {
        this.criteria.page = event.page;
        this.criteria.maxResults = event.rows;
        this.findPaginatedByCriteria();
    }

    public async edit(dto: BatimentDto) {
        this.service.findByIdWithAssociatedList(dto).subscribe(res => {
            this.item = res;
            console.log(res);
            this.editDialog = true;
        });

    }


    public async view(dto: BatimentDto) {
        this.service.findByIdWithAssociatedList(dto).subscribe(res => {
            this.item = res;
            this.viewDialog = true;
        });
    }

    public async openCreate() {
        this.item = new BatimentDto();
        this.createDialog = true;
    }

    public async openEdit(dto: BatimentDto) {
        this.service.findByIdWithAssociatedList(dto).subscribe(res => {
            this.service.item = res;
            this.service.editDialog = true;
        });
    }

    public deleteSelected(dtos: BatimentDto[]) {
        this.confirmationService.confirm({
            message: 'Voulez-vous supprimer ces éléments ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            rejectButtonProps: {label: 'Cancel', severity: 'secondary', outlined: true},
            acceptButtonProps: {label: 'Ok'},
            accept: () => {
                this.service.selections = dtos;
                this.service.deleteMultiple().subscribe(() => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Les éléments sélectionnés ont été supprimés',
                        life: 3000
                    });
                    this.dataGridList()?.refresh();
                }, (error: any) => console.log(error));
            }
        });
    }


    public isSelectionDisabled(): boolean {
        return this.selections == null || this.selections.length == 0;
    }

    public delete(dto: BatimentDto) {
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

    public async duplicate(dto: BatimentDto) {
        this.service.findByIdWithAssociatedList(dto).subscribe(
            (res: BatimentDto) => {
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

    public exportPdf(dto: BatimentDto): void {
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
            this.item = new BatimentDto();
        }, (error: any) => {
            console.log(error);
        });
    }

    public save() {
        this.service.save().subscribe(item => {
            if (item != null) {
                this.items.push({...item});
                this.createDialog = false;


                this.item = new BatimentDto();
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
            {field: 'code', header: 'Code'},
            {field: 'complementAdresse', header: 'Complement adresse'},
            {field: 'libelle', header: 'Libelle'},
            {field: 'nombreEtages', header: 'Nombre etages'},
            {field: 'nombrePointsLivraison', header: 'Nombre points livraison'},
            {field: 'nombreLieuxReleve', header: 'Nombre lieux releve'},
            {field: 'nombreLieuxConsommation', header: 'Nombre lieux consommation'},
            {field: 'commune?.libelle', header: 'Commune'},
            {field: 'actif', header: 'Actif'},
        ];
    }


    public async loadCommune() {
        this.communeService.findAllOptimized().subscribe(communes => this.communes = communes, error => console.log(error))
    }


    public initDuplicate(res: BatimentDto) {
        if (res.appareils != null) {
            res.appareils.forEach(d => {
                d.batiment = null;
                d.id = null;
            });
        }
    }


    public prepareColumnExport(): void {
        this.service.findByCriteria(this.criteria).subscribe(
            (allItems) => {
                this.exportData = allItems.map(e => {
                    return {
                        'Code': e.code,
                        'Complement adresse': e.complementAdresse,
                        'Libelle': e.libelle,
                        'Nombre etages': e.nombreEtages,
                        'Nombre points livraison': e.nombrePointsLivraison,
                        'Nombre lieux releve': e.nombreLieuxReleve,
                        'Nombre lieux consommation': e.nombreLieuxConsommation,
                        'Commune': e.commune?.libelle,
                        'Actif': e.actif ? 'Vrai' : 'Faux',
                    }
                });

                this.criteriaData = [{
                    'Code': this.criteria.code ? this.criteria.code : environment.emptyForExport,
                    'Complement adresse': this.criteria.complementAdresse ? this.criteria.complementAdresse : environment.emptyForExport,
                    'Libelle': this.criteria.libelle ? this.criteria.libelle : environment.emptyForExport,
                    'Nombre etages Min': this.criteria.nombreEtagesMin ? this.criteria.nombreEtagesMin : environment.emptyForExport,
                    'Nombre etages Max': this.criteria.nombreEtagesMax ? this.criteria.nombreEtagesMax : environment.emptyForExport,
                    'Nombre points livraison Min': this.criteria.nombrePointsLivraisonMin ? this.criteria.nombrePointsLivraisonMin : environment.emptyForExport,
                    'Nombre points livraison Max': this.criteria.nombrePointsLivraisonMax ? this.criteria.nombrePointsLivraisonMax : environment.emptyForExport,
                    'Nombre lieux releve Min': this.criteria.nombreLieuxReleveMin ? this.criteria.nombreLieuxReleveMin : environment.emptyForExport,
                    'Nombre lieux releve Max': this.criteria.nombreLieuxReleveMax ? this.criteria.nombreLieuxReleveMax : environment.emptyForExport,
                    'Nombre lieux consommation Min': this.criteria.nombreLieuxConsommationMin ? this.criteria.nombreLieuxConsommationMin : environment.emptyForExport,
                    'Nombre lieux consommation Max': this.criteria.nombreLieuxConsommationMax ? this.criteria.nombreLieuxConsommationMax : environment.emptyForExport,
                    //'Commune': this.criteria.commune?.libelle ? this.criteria.commune?.libelle : environment.emptyForExport ,
                    'Actif': this.criteria.actif ? (this.criteria.actif ? environment.trueValue : environment.falseValue) : environment.emptyForExport,
                }];
            }
        )
    }


    get items(): Array<BatimentDto> {
        return this.service.items;
    }

    set items(value: Array<BatimentDto>) {
        this.service.items = value;
    }

    get selections(): Array<BatimentDto> {
        return this.service.selections;
    }

    set selections(value: Array<BatimentDto>) {
        this.service.selections = value;
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

    get criteria(): BatimentCriteria {
        return this.service.criteria;
    }

    set criteria(value: BatimentCriteria) {
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

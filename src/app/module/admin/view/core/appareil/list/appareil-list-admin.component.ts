import { Component, viewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AppareilAdminService } from 'src/app/shared/service/admin/core/AppareilAdmin.service';
import { AppareilDto } from 'src/app/shared/model/core/Appareil.model';
import { AppareilCriteria } from 'src/app/shared/criteria/core/AppareilCriteria.model';
import {
    DataGridListComponent,
    GroupingConfig,
    ServerColumnConfig
} from '@/app/pages/components/data-grid';

@Component({
    selector: 'app-appareil-list-admin',
    standalone: false,
    templateUrl: './appareil-list-admin.component.html'
})
export class AppareilListAdminComponent {
    groupingConfig: GroupingConfig = {};

    protected filterColumns: string[] = ['numero', 'dernierePeriodeIndex', 'derniereAnneeIndex', 'batiment'];

    protected columns: ServerColumnConfig[] = [
        {
            field: 'numero',
            header: 'appareil.numero',
            visible: true,
            sortable: true,
            groupable: true,
            type: 'text',
            criteriaMapping: {
                contains: 'numeroLike',
                equals: 'numero'
            }
        },
        {
            field: 'dernierePeriodeIndex',
            header: 'appareil.dernierePeriodeIndex',
            visible: true,
            sortable: true,
            groupable: true,
            type: 'numeric',
            criteriaMapping: {
                greaterThan: 'dernierePeriodeIndexMin',
                lessThan: 'dernierePeriodeIndexMax'
            }
        },
        {
            field: 'derniereAnneeIndex',
            header: 'appareil.derniereAnneeIndex',
            visible: true,
            sortable: true,
            groupable: true,
            type: 'numeric',
            criteriaMapping: {
                greaterThan: 'derniereAnneeIndexMin',
                lessThan: 'derniereAnneeIndexMax'
            }
        },
        {
            field: 'batiment',
            header: 'appareil.batiment',
            visible: true,
            sortable: true,
            groupable: true,
            type: 'entity',
            entityLabelField: 'libelle',
            criteriaMapping: {
                equals: 'id'
            }
        }
    ];

    public dataLoader = (criteria: AppareilCriteria) => this.service.findPaginatedByCriteria(criteria);
    public criteriaFactory = () => new AppareilCriteria();
    public exportDataLoader = (criteria: AppareilCriteria) => this.service.findByCriteria(criteria);
    dataGridList = viewChild(DataGridListComponent);

    constructor(
        private service: AppareilAdminService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    public openCreate() {
        this.service.item = new AppareilDto();
        this.service.createDialog = true;
    }

    public openEdit(dto: AppareilDto) {
        this.service.findByIdWithAssociatedList(dto).subscribe((res) => {
            this.service.item = res;
            this.service.editDialog = true;
        });
    }

    public deleteSelected(dtos: AppareilDto[]) {
        this.confirmationService.confirm({
            message: 'Voulez-vous supprimer ces elements ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            rejectButtonProps: { label: 'Cancel', severity: 'secondary', outlined: true },
            acceptButtonProps: { label: 'Ok' },
            accept: () => {
                this.service.selections = dtos;
                this.service.deleteMultiple().subscribe(() => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Succes',
                        detail: 'Les elements selectionnes ont ete supprimes',
                        life: 3000
                    });
                    this.dataGridList()?.refresh();
                });
            }
        });
    }

    public delete(dto: AppareilDto) {
        this.confirmationService.confirm({
            message: 'Voulez-vous supprimer cet element ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            rejectButtonProps: {
                label: 'Cancel',
                severity: 'secondary',
                outlined: true
            },
            acceptButtonProps: {
                label: 'Ok'
            },
            accept: () => {
                this.service.delete(dto).subscribe((status) => {
                    if (status > 0) {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Succes',
                            detail: 'Element supprime',
                            life: 3000
                        });
                        this.dataGridList()?.refresh();
                    }
                });
            }
        });
    }

    public onSaved() {
        this.dataGridList()?.refresh();
    }

    public onUpdated() {
        this.dataGridList()?.refresh();
    }

    get listActionIsValid(): boolean {
        return this.service.listActionIsValid;
    }
}

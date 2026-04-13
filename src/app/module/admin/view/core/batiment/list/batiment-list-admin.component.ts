import { Component, viewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BatimentAdminService } from 'src/app/shared/service/admin/core/BatimentAdmin.service';
import { BatimentDto } from 'src/app/shared/model/core/Batiment.model';
import { BatimentCriteria } from 'src/app/shared/criteria/core/BatimentCriteria.model';
import {
    DataGridListComponent,
    GroupingConfig,
    ServerColumnConfig
} from '@/app/pages/components/data-grid';

@Component({
    selector: 'app-batiment-list-admin',
    standalone: false,
    templateUrl: './batiment-list-admin.component.html'
})
export class BatimentListAdminComponent {
    groupingConfig: GroupingConfig = {};

    protected filterColumns: string[] = [
        'code',
        'complementAdresse',
        'libelle',
        'nombreEtages',
        'nombrePointsLivraison',
        'nombreLieuxReleve',
        'nombreLieuxConsommation',
        'commune',
        'actif'
    ];

    protected columns: ServerColumnConfig[] = [
        {
            field: 'code',
            header: 'batiment.code',
            visible: true,
            sortable: true,
            groupable: true,
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
            sortable: true,
            groupable: true,
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
            sortable: true,
            groupable: true,
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
            sortable: true,
            groupable: true,
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
            sortable: true,
            groupable: true,
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
            sortable: true,
            groupable: true,
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
            sortable: true,
            groupable: true,
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
            sortable: true,
            groupable: true,
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
            sortable: true,
            groupable: true,
            type: 'boolean',
            criteriaMapping: {
                equals: 'actif'
            }
        }
    ];

    public dataLoader = (criteria: BatimentCriteria) => this.service.findPaginatedByCriteria(criteria);
    public criteriaFactory = () => new BatimentCriteria();
    public exportDataLoader = (criteria: BatimentCriteria) => this.service.findByCriteria(criteria);
    dataGridList = viewChild(DataGridListComponent);

    constructor(
        private service: BatimentAdminService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    public openCreate() {
        this.service.item = new BatimentDto();
        this.service.createDialog = true;
    }

    public openEdit(dto: BatimentDto) {
        this.service.findByIdWithAssociatedList(dto).subscribe((res) => {
            this.service.item = res;
            this.service.editDialog = true;
        });
    }

    public deleteSelected(dtos: BatimentDto[]) {
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

    public delete(dto: BatimentDto) {
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

import { Component, viewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CommuneAdminService } from 'src/app/shared/service/admin/config/CommuneAdmin.service';
import { CommuneDto } from 'src/app/shared/model/config/Commune.model';
import { CommuneCriteria } from 'src/app/shared/criteria/config/CommuneCriteria.model';
import {
    DataGridListComponent,
    GroupingConfig,
    ServerColumnConfig
} from '@/app/pages/components/data-grid';

@Component({
    selector: 'app-commune-list-admin',
    standalone: false,
    templateUrl: './commune-list-admin.component.html'
})
export class CommuneListAdminComponent {
    groupingConfig: GroupingConfig = {};

    protected filterColumns: string[] = ['code', 'libelle', 'description', 'actif'];

    protected columns: ServerColumnConfig[] = [
        {
            field: 'code',
            header: 'commune.code',
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
            field: 'libelle',
            header: 'commune.libelle',
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
            field: 'description',
            header: 'commune.description',
            visible: true,
            sortable: true,
            groupable: true,
            type: 'text',
            criteriaMapping: {
                contains: 'descriptionLike',
                equals: 'description'
            }
        },
        {
            field: 'actif',
            header: 'commune.actif',
            visible: true,
            sortable: true,
            groupable: true,
            type: 'boolean',
            criteriaMapping: {
                equals: 'actif'
            }
        }
    ];

    public dataLoader = (criteria: CommuneCriteria) => this.service.findPaginatedByCriteria(criteria);
    public criteriaFactory = () => new CommuneCriteria();
    public exportDataLoader = (criteria: CommuneCriteria) => this.service.findByCriteria(criteria);
    dataGridList = viewChild(DataGridListComponent);

    constructor(
        private service: CommuneAdminService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    public openCreate() {
        this.service.item = new CommuneDto();
        this.service.createDialog = true;
    }

    public openEdit(dto: CommuneDto) {
        this.service.findByIdWithAssociatedList(dto).subscribe((res) => {
            this.service.item = res;
            this.service.editDialog = true;
        });
    }

    public deleteSelected(dtos: CommuneDto[]) {
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

    public delete(dto: CommuneDto) {
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

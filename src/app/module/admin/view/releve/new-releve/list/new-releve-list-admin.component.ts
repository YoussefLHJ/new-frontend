import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LotReleveAdminService } from 'src/app/shared/service/admin/releve/LotReleveAdmin.service';
import { LotReleveDto } from 'src/app/shared/model/releve/LotReleve.model';
import { LotReleveCriteria } from 'src/app/shared/criteria/releve/LotReleveCriteria.model';
import { ServerColumnConfig } from '@/app/shared/components/data-grid';
import { ServerDataTableComponent } from '@/app/shared/components/data-grid';

@Component({
    selector: 'app-new-releve-list-admin',
    standalone: false,
    templateUrl: './new-releve-list-admin.component.html'
})
export class NewReleveListAdminComponent implements OnInit {

    @ViewChild(ServerDataTableComponent) serverTable!: ServerDataTableComponent;

    private readonly service = inject(LotReleveAdminService);
    private readonly messageService = inject(MessageService);
    private readonly confirmationService = inject(ConfirmationService);

    columns: ServerColumnConfig[] = [
        {
            field: 'numero', header: 'lotReleve.numero', type: 'text',
            sortable: true, groupable: true,
            criteriaMapping: { contains: 'numeroLike', equals: 'numero' }
        },
        {
            field: 'code', header: 'lotReleve.code', type: 'text',
            sortable: true,
            criteriaMapping: { contains: 'codeLike', equals: 'code' }
        },
        {
            field: 'nbBatiments', header: 'lotReleve.nbBatiments', type: 'numeric',
            sortable: true, groupable: true,
            criteriaMapping: { equals: 'nbBatiments', greaterThan: 'nbBatimentsMin', lessThan: 'nbBatimentsMax' }
        },
        {
            field: 'nbCompteursALire', header: 'lotReleve.nbCompteursALire', type: 'numeric',
            sortable: true,
            criteriaMapping: { equals: 'nbCompteursALire', greaterThan: 'nbCompteursALireMin', lessThan: 'nbCompteursALireMax' }
        },
        {
            field: 'nbCompteursCharges', header: 'lotReleve.nbCompteursCharges', type: 'numeric',
            sortable: true,
            criteriaMapping: { equals: 'nbCompteursCharges', greaterThan: 'nbCompteursChargesMin', lessThan: 'nbCompteursChargesMax' }
        },
        {
            field: 'dateCreation', header: 'lotReleve.dateCreation', type: 'date',
            sortable: true, dateFormat: 'dd/MM/yyyy HH:mm',
            criteriaMapping: { equals: 'dateCreation', greaterThan: 'dateCreationFrom', lessThan: 'dateCreationTo' }
        },
        {
            field: 'dateMiseAJour', header: 'lotReleve.dateMiseAJour', type: 'date',
            sortable: true, dateFormat: 'dd/MM/yyyy HH:mm',
            criteriaMapping: { equals: 'dateMiseAJour', greaterThan: 'dateMiseAJourFrom', lessThan: 'dateMiseAJourTo' }
        },
        {
            field: 'uniteReleve', header: 'lotReleve.uniteReleve', type: 'entity',
            sortable: true, groupable: true, entityLabelField: 'libelle',
            criteriaMapping: { contains: 'uniteReleve.libelleLike', equals: 'uniteReleve.libelle' }
        },
        {
            field: 'actif', header: 'lotReleve.actif', type: 'boolean',
            sortable: true, groupable: true,
            criteriaMapping: { equals: 'actif' }
        },
    ];

    loadData = (criteria: LotReleveCriteria) =>
        this.service.findPaginatedByCriteria(criteria);

    createCriteria = () => new LotReleveCriteria();

    exportData = (criteria: LotReleveCriteria) =>
        this.service.findByCriteria(criteria);

    ngOnInit() {}

    openCreate() {
        this.service.item = new LotReleveDto();
        this.service.createDialog = true;
    }

    edit(dto: LotReleveDto) {
        this.service.findByIdWithAssociatedList(dto).subscribe(res => {
            this.service.item = res;
            this.service.editDialog = true;
        });
    }

    delete(dto: LotReleveDto) {
        this.confirmationService.confirm({
            message: 'Voulez-vous supprimer cet element ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            rejectButtonProps: { label: 'Cancel', severity: 'secondary', outlined: true },
            acceptButtonProps: { label: 'Ok' },
            accept: () => {
                this.service.delete(dto).subscribe(status => {
                    if (status > 0) {
                        this.messageService.add({
                            severity: 'success', summary: 'Succes',
                            detail: 'Element Supprime', life: 3000
                        });
                        this.serverTable.refresh();
                    }
                });
            }
        });
    }

    deleteMultiple(selections: LotReleveDto[]) {
        this.confirmationService.confirm({
            message: 'Voulez-vous supprimer ces elements ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            rejectButtonProps: { label: 'Cancel', severity: 'secondary', outlined: true },
            acceptButtonProps: { label: 'Ok' },
            accept: () => {
                this.service.selections = selections;
                this.service.deleteMultiple().subscribe(() => {
                    this.messageService.add({
                        severity: 'success', summary: 'Succes',
                        detail: 'Les elements selectionnes ont ete supprimes', life: 3000
                    });
                    this.serverTable.refresh();
                });
            }
        });
    }

    get createDialog(): boolean { return this.service.createDialog; }
    get editDialog(): boolean { return this.service.editDialog; }
    get viewDialog(): boolean { return this.service.viewDialog; }

    get createActionIsValid(): boolean { return this.service.createActionIsValid; }
    get editActionIsValid(): boolean { return this.service.editActionIsValid; }
    get listActionIsValid(): boolean { return this.service.listActionIsValid; }
    get viewActionIsValid(): boolean { return this.service.viewActionIsValid; }
}

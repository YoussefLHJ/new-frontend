import { Component, inject, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

import { environment } from 'src/environments/environment';
import { StringUtilService } from 'src/app/zynerator/util/StringUtil.service';

import { LotReleveAdminService } from 'src/app/shared/service/admin/releve/LotReleveAdmin.service';
import { LotReleveDto } from 'src/app/shared/model/releve/LotReleve.model';
import { CommuneDto } from 'src/app/shared/model/config/Commune.model';
import { CommuneAdminService } from 'src/app/shared/service/admin/config/CommuneAdmin.service';
import { UniteReleveDto } from 'src/app/shared/model/releve/UniteReleve.model';
import { UniteReleveAdminService } from 'src/app/shared/service/admin/releve/UniteReleveAdmin.service';
import { BatimentDto } from 'src/app/shared/model/config/Batiment.model';
import { RoleService } from 'src/app/zynerator/security/shared/service/Role.service';

@Component({
    selector: 'app-new-releve-create-admin',
    standalone: false,
    templateUrl: './new-releve-create-admin.component.html'
})
export class NewReleveCreateAdminComponent implements OnInit {

    private readonly service = inject(LotReleveAdminService);
    private readonly communeService = inject(CommuneAdminService);
    private readonly uniteReleveService = inject(UniteReleveAdminService);
    private readonly messageService = inject(MessageService);
    private readonly stringUtilService = inject(StringUtilService);
    private readonly roleService = inject(RoleService);

    submitted = false;
    errorMessages: string[] = [];
    activeTab = 0;
    batimentsIndex = -1;
    batimentsElement = new BatimentDto();

    validLotReleveNumero = true;
    validLotReleveCode = true;
    validBatimentsCodeBatiment = true;
    validBatimentsLibelle = true;

    communes: CommuneDto[] = [];
    uniteReleves: UniteReleveDto[] = [];

    ngOnInit(): void {
        this.batimentsElement.commune = new CommuneDto();
        this.communeService.findAll().subscribe(data => this.communes = data);
        this.uniteReleveService.findAll().subscribe(data => this.uniteReleves = data);
    }

    save(): void {
        this.submitted = true;
        this.validateForm();
        if (this.errorMessages.length === 0) {
            this.service.save().subscribe({
                next: item => {
                    if (item != null) {
                        this.service.items.push({ ...item });
                        this.createDialog = false;
                        this.submitted = false;
                        this.item = new LotReleveDto();
                    } else {
                        this.messageService.add({ severity: 'error', summary: 'Erreurs', detail: 'Element existant' });
                    }
                },
                error: err => console.log(err)
            });
        } else {
            this.messageService.add({ severity: 'error', summary: 'Erreurs', detail: 'Merci de corrigé les erreurs sur le formulaire' });
        }
    }

    hideCreateDialog() {
        this.createDialog = false;
        this.setValidation(true);
    }

    setValidation(value: boolean) {
        this.validLotReleveNumero = value;
        this.validLotReleveCode = value;
        this.validBatimentsCodeBatiment = value;
        this.validBatimentsLibelle = value;
    }

    addBatiments() {
        if (this.item.batiments == null) {
            this.item.batiments = [];
        }
        this.validateBatiments();
        if (this.errorMessages.length === 0) {
            if (this.batimentsIndex === -1) {
                this.item.batiments.push({ ...this.batimentsElement });
            } else {
                this.item.batiments[this.batimentsIndex] = this.batimentsElement;
            }
            this.batimentsElement = new BatimentDto();
            this.batimentsIndex = -1;
        } else {
            this.messageService.add({ severity: 'error', summary: 'Erreurs', detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages });
        }
    }

    deleteBatiments(p: BatimentDto, index: number) {
        this.item.batiments.splice(index, 1);
    }

    editBatiments(p: BatimentDto, index: number) {
        this.batimentsElement = { ...p };
        this.batimentsIndex = index;
        this.activeTab = 0;
    }

    validateForm(): void {
        this.errorMessages = [];
        this.validateLotReleveNumero();
        this.validateLotReleveCode();
    }

    validateBatiments() {
        this.errorMessages = [];
        if (this.batimentsElement.codeBatiment == null) {
            this.errorMessages.push('CodeBatiment de la batiment est invalide');
            this.validBatimentsCodeBatiment = false;
        } else {
            this.validBatimentsCodeBatiment = true;
        }
        if (this.batimentsElement.libelle == null) {
            this.errorMessages.push('Libelle de la batiment est invalide');
            this.validBatimentsLibelle = false;
        } else {
            this.validBatimentsLibelle = true;
        }
    }

    private validateLotReleveNumero() {
        if (this.stringUtilService.isEmpty(this.item.numero)) {
            this.errorMessages.push('Numero non valide');
            this.validLotReleveNumero = false;
        } else {
            this.validLotReleveNumero = true;
        }
    }

    private validateLotReleveCode() {
        if (this.stringUtilService.isEmpty(this.item.code)) {
            this.errorMessages.push('Code non valide');
            this.validLotReleveCode = false;
        } else {
            this.validLotReleveCode = true;
        }
    }

    async openCreateUniteReleve() {
        const isPermitted = await this.roleService.isPermitted('UniteReleve', 'add');
        if (isPermitted) {
            this.uniteReleveService.item = new UniteReleveDto();
            this.uniteReleveService.createDialog = true;
        } else {
            this.messageService.add({ severity: 'error', summary: 'erreur', detail: 'problème de permission' });
        }
    }

    get item(): LotReleveDto { return this.service.item; }
    set item(value: LotReleveDto) { this.service.item = value; }

    get createDialog(): boolean { return this.service.createDialog; }
    set createDialog(value: boolean) { this.service.createDialog = value; }

    get dateFormat() { return environment.dateFormatCreate; }
    get dateFormatColumn() { return environment.dateFormatCreate; }
}

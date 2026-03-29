import { Component, inject, OnInit } from '@angular/core';

import { environment } from 'src/environments/environment';

import { LotReleveAdminService } from 'src/app/shared/service/admin/releve/LotReleveAdmin.service';
import { LotReleveDto } from 'src/app/shared/model/releve/LotReleve.model';
import { LotReleveCriteria } from 'src/app/shared/criteria/releve/LotReleveCriteria.model';

@Component({
    selector: 'app-new-releve-view-admin',
    standalone: false,
    templateUrl: './new-releve-view-admin.component.html'
})
export class NewReleveViewAdminComponent implements OnInit {

    private readonly service = inject(LotReleveAdminService);

    ngOnInit(): void {}

    hideViewDialog() {
        this.viewDialog = false;
    }

    get item(): LotReleveDto { return this.service.item; }
    set item(value: LotReleveDto) { this.service.item = value; }

    get viewDialog(): boolean { return this.service.viewDialog; }
    set viewDialog(value: boolean) { this.service.viewDialog = value; }

    get dateFormat() { return environment.dateFormatView; }
    get dateFormatColumn() { return environment.dateFormatList; }
}

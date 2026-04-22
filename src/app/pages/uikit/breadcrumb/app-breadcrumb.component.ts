import {
    Component, ChangeDetectionStrategy, ViewEncapsulation, input, computed, inject
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { merge } from 'rxjs';
import { startWith } from 'rxjs/operators';

@Component({
    selector: 'app-breadcrumb',
    standalone: true,
    imports: [BreadcrumbModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styles: [`
        app-breadcrumb .p-breadcrumb {
            background: transparent !important;
            border-color: transparent !important;
            box-shadow: none !important;
            padding: 0.25rem 0 !important;
        }
    `],
    template: `
        <div class="mb-5">
            <p-breadcrumb [model]="items()" [home]="home" />
        </div>
    `
})
export class AppBreadcrumbComponent {
    private translateService = inject(TranslateService);

    /** i18n key for the current page label (e.g. "commande.header") */
    labelKey = input<string>('');

    /** Optional intermediate items inserted between Home and the current page */
    extraItems = input<MenuItem[]>([]);

    readonly home: MenuItem = { icon: 'pi pi-home', routerLink: '/app/admin' };

    private _langChange = toSignal(
        merge(
            this.translateService.onLangChange,
            this.translateService.onTranslationChange
        ).pipe(startWith(null)),
        { initialValue: null }
    );

    items = computed<MenuItem[]>(() => {
        this._langChange();
        const result: MenuItem[] = [...this.extraItems()];
        const key = this.labelKey();
        if (key) {
            result.push({ label: this.translateService.instant(key) });
        }
        return result;
    });
}

import { Component, output, ChangeDetectionStrategy } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PopoverModule } from 'primeng/popover';
import { TooltipModule } from 'primeng/tooltip';
import { SignalTranslatePipe } from '@/app/pages/pipe/signal-translate.pipe';

@Component({
    selector: 'app-export-menu',
    imports: [ButtonModule, PopoverModule, TooltipModule, SignalTranslatePipe],
    templateUrl: './export-menu.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExportMenuComponent {
    exportExcel = output<void>();
    exportCsv = output<void>();
    exportPdf = output<void>();
}

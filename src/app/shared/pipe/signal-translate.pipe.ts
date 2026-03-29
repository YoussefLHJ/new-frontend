import { Pipe, PipeTransform, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '@/app/layout/service/language.service';

/**
 * Signal-aware translate pipe for Angular zoneless change detection.
 *
 * ngx-translate's built-in TranslatePipe uses ChangeDetectorRef.markForCheck()
 * which does not schedule a CD cycle in Angular 21 zoneless mode.
 *
 * This pipe reads the `langLoaded` signal from LanguageService as a reactive
 * dependency. When the signal increments (after a language file finishes loading),
 * Angular's signal-based scheduler automatically re-evaluates all templates that
 * contain this pipe — no zone.js required.
 */
@Pipe({
    name: 'translate',
    standalone: true,
    pure: false
})
export class SignalTranslatePipe implements PipeTransform {
    private translate = inject(TranslateService);
    private languageService = inject(LanguageService);

    transform(key: string, params?: object): string {
        // Registering a reactive dependency on langLoaded ensures Angular re-runs
        // this pipe (and the whole template expression) whenever the language changes.
        this.languageService.langLoaded();
        return this.translate.instant(key, params ?? {});
    }
}

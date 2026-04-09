import { ChangeDetectorRef, inject, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

/**
 * Standalone replacement for ngx-translate's TranslatePipe.
 *
 * ngx-translate v14's TranslatePipe is not declared as standalone,
 * so standalone components cannot import it directly. This pipe
 * provides the same `| translate` functionality for standalone components.
 */
@Pipe({
    name: 'translate',
    standalone: true,
    pure: false
})
export class SignalTranslatePipe implements PipeTransform, OnDestroy {

    private readonly translate = inject(TranslateService);
    private readonly ref = inject(ChangeDetectorRef);

    private value = '';
    private lastKey: string | null = null;
    private lastParams: any = null;
    private onLangChange: Subscription | undefined;
    private onDefaultLangChange: Subscription | undefined;
    private onTranslationChange: Subscription | undefined;

    transform(key: string, ...args: any[]): string {
        if (!key) return key;

        const interpolateParams = args[0];

        if (key === this.lastKey && interpolateParams === this.lastParams) {
            return this.value;
        }

        this.lastKey = key;
        this.lastParams = interpolateParams;
        this.updateValue(key, interpolateParams);
        this.dispose();

        this.onTranslationChange = this.translate.onTranslationChange.subscribe(() => {
            this.updateValue(key, interpolateParams);
        });

        this.onLangChange = this.translate.onLangChange.subscribe(() => {
            this.updateValue(key, interpolateParams);
        });

        this.onDefaultLangChange = this.translate.onDefaultLangChange.subscribe(() => {
            this.updateValue(key, interpolateParams);
        });

        return this.value;
    }

    private updateValue(key: string, interpolateParams?: any): void {
        const result = this.translate.instant(key, interpolateParams);
        this.value = result !== undefined ? result : key;
        this.ref.markForCheck();
    }

    private dispose(): void {
        this.onTranslationChange?.unsubscribe();
        this.onLangChange?.unsubscribe();
        this.onDefaultLangChange?.unsubscribe();
    }

    ngOnDestroy(): void {
        this.dispose();
    }
}

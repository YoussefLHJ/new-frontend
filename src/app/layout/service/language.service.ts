import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LanguageService {
    /** Incremented after each language file finishes loading. */
    readonly langLoaded = signal(0);

    notifyLoaded() {
        this.langLoaded.update(v => v + 1);
    }
}

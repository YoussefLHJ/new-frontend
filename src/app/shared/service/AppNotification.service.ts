import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

export type MessageType = 'success' | 'error' | 'warn' | 'info';
export type MessagePosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'center';

@Injectable({ providedIn: 'root' })
export class AppNotificationService {

    constructor(private messageService: MessageService) {}

    success(title: string, description: string, position: MessagePosition = 'top-right', life = 3000): void {
        console.log(`%c✓ [SUCCESS] ${title}`, 'color: #22c55e; font-weight: bold;', description);
        this.messageService.add({ severity: 'success', summary: title, detail: description, life, key: position });
    }

    error(title: string, description: string, position: MessagePosition = 'top-right', life = 4000): void {
        console.error(`✗ [ERROR] ${title}:`, description);
        this.messageService.add({ severity: 'error', summary: title, detail: description, life, key: position });
    }

    warn(title: string, description: string, position: MessagePosition = 'top-right', life = 4000): void {
        console.warn(`⚠ [WARN] ${title}:`, description);
        this.messageService.add({ severity: 'warn', summary: title, detail: description, life, key: position });
    }

    info(title: string, description: string, position: MessagePosition = 'top-right', life = 3000): void {
        console.info(`ℹ [INFO] ${title}:`, description);
        this.messageService.add({ severity: 'info', summary: title, detail: description, life, key: position });
    }
}

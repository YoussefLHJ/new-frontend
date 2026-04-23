import { Component, Input } from '@angular/core';
import { ToastModule } from 'primeng/toast';

export type MessageType = 'success' | 'error' | 'warn' | 'info';
export type MessagePosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'center';

@Component({
    selector: 'app-message',
    standalone: true,
    imports: [ToastModule],
    templateUrl: './app-message.component.html'
})
export class AppMessageComponent {
    @Input() title: string = '';
    @Input() description: string = '';
    @Input() type: MessageType = 'info';
    @Input() position: MessagePosition = 'top-right';
    @Input() life: number = 3000;
}

import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TreeNode } from 'primeng/api';
import { TreeSelectModule } from 'primeng/treeselect';

@Component({
    selector: 'app-tree-select',
    standalone: true,
    imports: [CommonModule, FormsModule, TreeSelectModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => TreeSelectComponent), multi: true }],
    template: `
        <div class="flex flex-col gap-1 w-full">
            <label *ngIf="label" class="text-sm font-medium">{{ label }}</label>
            <p-treeselect
                [ngModel]="value"
                (ngModelChange)="update($event)"
                [options]="options"
                [placeholder]="placeholder"
                [disabled]="disabled"
            ></p-treeselect>
        </div>
    `
})
export class TreeSelectComponent implements ControlValueAccessor {
    @Input() label = '';
    @Input() placeholder = 'Select Item';
    @Input() options: TreeNode[] = [];

    @Output() valueChange = new EventEmitter<any>();

    value: any = null;
    disabled = false;

    private onChange: (v: any) => void = () => {};
    private onTouched: () => void = () => {};

    writeValue(v: any) { this.value = v; }
    registerOnChange(fn: any) { this.onChange = fn; }
    registerOnTouched(fn: any) { this.onTouched = fn; }
    setDisabledState(d: boolean) { this.disabled = d; }

    update(v: any) {
        this.value = v;
        this.onChange(v);
        this.valueChange.emit(v);
    }
}

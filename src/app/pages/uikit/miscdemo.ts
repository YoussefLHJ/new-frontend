import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { ProgressBarComponent } from './misc/progress-bar/progress-bar.component';
import { BadgeComponent } from './misc/badge/badge.component';
import { OverlayBadgeComponent } from './misc/overlay-badge/overlay-badge.component';
import { AvatarComponent } from './misc/avatar/avatar.component';
import { AvatarGroupComponent } from './misc/avatar-group/avatar-group.component';
import { SkeletonBlockComponent } from './misc/skeleton-block/skeleton-block.component';
import { TagComponent } from './misc/tag/tag.component';
import { ChipComponent } from './misc/chip/chip.component';
import { BaseButtonComponent } from './button/base-button/base-button.component';

@Component({
    selector: 'app-misc-demo',
    standalone: true,
    imports: [
        CommonModule,
        ProgressBarComponent,
        BadgeComponent,
        OverlayBadgeComponent,
        AvatarComponent,
        AvatarGroupComponent,
        SkeletonBlockComponent,
        TagComponent,
        ChipComponent,
        BaseButtonComponent
    ],
    template: `
        <div class="card">
            <div class="font-semibold text-xl mb-4">ProgressBar</div>
            <div class="flex flex-col md:flex-row gap-4">
                <div class="md:w-1/2">
                    <app-progress-bar [value]="value" [showValue]="true"></app-progress-bar>
                </div>
                <div class="md:w-1/2">
                    <app-progress-bar [value]="50" [showValue]="false"></app-progress-bar>
                </div>
            </div>
        </div>

        <div class="flex flex-col md:flex-row gap-8">
            <div class="md:w-1/2">
                <div class="card">
                    <div class="font-semibold text-xl mb-4">Badge</div>
                    <div class="flex gap-2">
                        <app-badge [value]="2"></app-badge>
                        <app-badge [value]="8" severity="success"></app-badge>
                        <app-badge [value]="4" severity="info"></app-badge>
                        <app-badge [value]="12" severity="warn"></app-badge>
                        <app-badge [value]="3" severity="danger"></app-badge>
                    </div>

                    <div class="font-semibold my-4">Overlay</div>
                    <div class="flex gap-6">
                        <app-overlay-badge [value]="2">
                            <i class="pi pi-bell" style="font-size: 2rem"></i>
                        </app-overlay-badge>
                        <app-overlay-badge [value]="4" severity="danger">
                            <i class="pi pi-calendar" style="font-size: 2rem"></i>
                        </app-overlay-badge>
                        <app-overlay-badge severity="danger">
                            <i class="pi pi-envelope" style="font-size: 2rem"></i>
                        </app-overlay-badge>
                    </div>

                    <div class="font-semibold my-4">Sizes</div>
                    <div class="flex items-start gap-2">
                        <app-badge [value]="2"></app-badge>
                        <app-badge [value]="4" badgeSize="large" severity="warn"></app-badge>
                        <app-badge [value]="6" badgeSize="xlarge" severity="success"></app-badge>
                    </div>
                </div>

                <div class="card">
                    <div class="font-semibold text-xl mb-4">Avatar</div>
                    <div class="font-semibold mb-4">Group</div>
                    <app-avatar-group styleClass="mb-4">
                        <app-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png" size="large"></app-avatar>
                        <app-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/asiyajavayant.png" size="large"></app-avatar>
                        <app-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/onyamalimba.png" size="large"></app-avatar>
                        <app-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/ionibowcher.png" size="large"></app-avatar>
                        <app-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/xuxuefeng.png" size="large"></app-avatar>
                        <app-avatar label="+2" size="large" [style]="{ 'background-color': '#9c27b0', color: '#ffffff' }"></app-avatar>
                    </app-avatar-group>

                    <div class="font-semibold my-4">Label - Circle</div>
                    <div class="flex gap-2">
                        <app-avatar label="P" size="xlarge"></app-avatar>
                        <app-avatar label="V" size="large" [style]="{ 'background-color': '#2196F3', color: '#ffffff' }"></app-avatar>
                        <app-avatar label="U" [style]="{ 'background-color': '#9c27b0', color: '#ffffff' }"></app-avatar>
                    </div>

                    <div class="font-semibold my-4">Icon - Badge</div>
                    <app-overlay-badge [value]="4" severity="danger" styleClass="inline-flex">
                        <app-avatar label="U" size="xlarge"></app-avatar>
                    </app-overlay-badge>
                </div>

                <div class="card">
                    <div class="font-semibold text-xl mb-4">Skeleton</div>
                    <div class="rounded-border border border-surface p-6">
                        <div class="flex mb-4">
                            <app-skeleton-block shape="circle" size="4rem" styleClass="mr-2"></app-skeleton-block>
                            <div>
                                <app-skeleton-block width="10rem" styleClass="mb-2"></app-skeleton-block>
                                <app-skeleton-block width="5rem" styleClass="mb-2"></app-skeleton-block>
                                <app-skeleton-block height=".5rem"></app-skeleton-block>
                            </div>
                        </div>
                        <app-skeleton-block width="100%" height="150px"></app-skeleton-block>
                        <div class="flex justify-between mt-4">
                            <app-skeleton-block width="4rem" height="2rem"></app-skeleton-block>
                            <app-skeleton-block width="4rem" height="2rem"></app-skeleton-block>
                        </div>
                    </div>
                </div>
            </div>

            <div class="md:w-1/2">
                <div class="card">
                    <div class="font-semibold text-xl mb-4">Tag</div>
                    <div class="font-semibold mb-4">Default</div>
                    <div class="flex gap-2">
                        <app-tag value="Primary"></app-tag>
                        <app-tag value="Success" severity="success"></app-tag>
                        <app-tag value="Info" severity="info"></app-tag>
                        <app-tag value="Warning" severity="warn"></app-tag>
                        <app-tag value="Danger" severity="danger"></app-tag>
                    </div>

                    <div class="font-semibold my-4">Pills</div>
                    <div class="flex gap-2">
                        <app-tag value="Primary" [rounded]="true"></app-tag>
                        <app-tag value="Success" severity="success" [rounded]="true"></app-tag>
                        <app-tag value="Info" severity="info" [rounded]="true"></app-tag>
                        <app-tag value="Warning" severity="warn" [rounded]="true"></app-tag>
                        <app-tag value="Danger" severity="danger" [rounded]="true"></app-tag>
                    </div>

                    <div class="font-semibold my-4">Icons</div>
                    <div class="flex gap-2">
                        <app-tag value="Primary" icon="pi pi-user"></app-tag>
                        <app-tag value="Success" severity="success" icon="pi pi-check"></app-tag>
                        <app-tag value="Info" severity="info" icon="pi pi-info-circle"></app-tag>
                        <app-tag value="Warning" severity="warn" icon="pi pi-exclamation-triangle"></app-tag>
                        <app-tag value="Danger" severity="danger" icon="pi pi-times"></app-tag>
                    </div>
                </div>

                <div class="card">
                    <div class="font-semibold text-xl mb-4">Chip</div>
                    <div class="font-semibold mb-4">Basic</div>
                    <div class="flex items-center flex-col sm:flex-row">
                        <app-chip label="Action" styleClass="m-1"></app-chip>
                        <app-chip label="Comedy" styleClass="m-1"></app-chip>
                        <app-chip label="Mystery" styleClass="m-1"></app-chip>
                        <app-chip label="Thriller" styleClass="m-1" [removable]="true"></app-chip>
                    </div>

                    <div class="font-semibold my-4">Icon</div>
                    <div class="flex items-center flex-col sm:flex-row">
                        <app-chip label="Apple" icon="pi pi-apple" styleClass="m-1"></app-chip>
                        <app-chip label="Facebook" icon="pi pi-facebook" styleClass="m-1"></app-chip>
                        <app-chip label="Google" icon="pi pi-google" styleClass="m-1"></app-chip>
                        <app-chip label="Microsoft" icon="pi pi-microsoft" styleClass="m-1" [removable]="true"></app-chip>
                    </div>

                    <div class="font-semibold my-4">Image</div>
                    <div class="flex items-center flex-col sm:flex-row">
                        <app-chip label="Amy Elsner" image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png" styleClass="m-1"></app-chip>
                        <app-chip label="Asiya Javayant" image="https://primefaces.org/cdn/primeng/images/demo/avatar/asiyajavayant.png" styleClass="m-1"></app-chip>
                        <app-chip label="Onyama Limba" image="https://primefaces.org/cdn/primeng/images/demo/avatar/onyamalimba.png" styleClass="m-1"></app-chip>
                        <app-chip label="Xuxue Feng" image="https://primefaces.org/cdn/primeng/images/demo/avatar/xuxuefeng.png" styleClass="m-1" [removable]="true"></app-chip>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class MiscDemo implements OnInit, OnDestroy {
    value = 0;
    interval: any;

    ngOnInit() {
        this.interval = setInterval(() => {
            this.value = this.value + Math.floor(Math.random() * 10) + 1;
            if (this.value >= 100) {
                this.value = 100;
                clearInterval(this.interval);
            }
        }, 2000);
    }

    ngOnDestroy() {
        clearInterval(this.interval);
    }
}

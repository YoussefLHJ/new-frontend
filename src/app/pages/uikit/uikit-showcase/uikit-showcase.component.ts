import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { ConfirmationService, MegaMenuItem, MenuItem, MessageService, TreeNode } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';

import {
    BaseButtonComponent,
    CancelButtonComponent,
    DeleteButtonComponent,
    ExportButtonComponent,
    ImportButtonComponent,
    SaveButtonComponent
} from '../button';
import { BaseChartComponent, BarChartComponent, LineChartComponent, PieChartComponent, PolarChartComponent, RadarChartComponent } from '../chart';
import { FileUploadAdvancedComponent, FileUploadBasicComponent } from '../file';
import {
    AutocompleteComponent,
    CheckboxGroupComponent,
    ColorPickerComponent,
    DatePickerComponent,
    KnobInputComponent,
    ListboxInputComponent,
    MultiSelectComponent,
    NumberInputComponent,
    RadioGroupComponent,
    RatingInputComponent,
    SelectButtonGroupComponent,
    SelectDropdownComponent,
    SliderInputComponent,
    TextInputComponent,
    TextareaInputComponent,
    ToggleButtonComponent,
    ToggleSwitchComponent,
    TreeSelectComponent
} from '../input';
import {
    AvatarComponent,
    AvatarGroupComponent,
    BadgeComponent,
    ChipComponent,
    OverlayBadgeComponent,
    ProgressBarComponent,
    SkeletonBlockComponent,
    TagComponent
} from '../misc';
import {
    BreadcrumbBarComponent,
    ContextMenuComponent,
    MegaMenuComponent,
    MenubarComponent,
    OverlayMenuComponent,
    PanelMenuComponent,
    PlainMenuComponent,
    StepListComponent,
    TabMenuComponent,
    TieredMenuComponent
} from '../menu';
import {
    ErrorMessageComponent,
    InfoMessageComponent,
    InlineMessageComponent,
    SuccessMessageComponent,
    ToastNotifierComponent,
    WarningMessageComponent
} from '../message';
import { ConfirmDialogComponent, ConfirmPopupComponent, DialogComponent, DrawerComponent, PopoverComponent, TooltipHostComponent } from '../overlay';
import {
    AccordionComponent,
    CardComponent,
    CollapsiblePanelComponent,
    DividerLineComponent,
    FieldsetPanelComponent,
    SplitterPanelComponent,
    TabsPanelComponent,
    ToolbarBarComponent
} from '../panel';
import { EventTimelineComponent } from '../timeline';

@Component({
    selector: 'app-uikit-showcase',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        TooltipModule,
        BaseButtonComponent,
        SaveButtonComponent,
        CancelButtonComponent,
        DeleteButtonComponent,
        ExportButtonComponent,
        ImportButtonComponent,
        TextInputComponent,
        NumberInputComponent,
        TextareaInputComponent,
        DatePickerComponent,
        AutocompleteComponent,
        SelectDropdownComponent,
        MultiSelectComponent,
        TreeSelectComponent,
        ListboxInputComponent,
        CheckboxGroupComponent,
        RadioGroupComponent,
        ToggleSwitchComponent,
        ToggleButtonComponent,
        SelectButtonGroupComponent,
        SliderInputComponent,
        RatingInputComponent,
        ColorPickerComponent,
        KnobInputComponent,
        CardComponent,
        CollapsiblePanelComponent,
        FieldsetPanelComponent,
        AccordionComponent,
        TabsPanelComponent,
        ToolbarBarComponent,
        DividerLineComponent,
        SplitterPanelComponent,
        InlineMessageComponent,
        SuccessMessageComponent,
        InfoMessageComponent,
        WarningMessageComponent,
        ErrorMessageComponent,
        ToastNotifierComponent,
        DialogComponent,
        DrawerComponent,
        PopoverComponent,
        ConfirmPopupComponent,
        ConfirmDialogComponent,
        TooltipHostComponent,
        BaseChartComponent,
        LineChartComponent,
        BarChartComponent,
        PieChartComponent,
        PolarChartComponent,
        RadarChartComponent,
        EventTimelineComponent,
        MenubarComponent,
        BreadcrumbBarComponent,
        StepListComponent,
        TabMenuComponent,
        TieredMenuComponent,
        PlainMenuComponent,
        OverlayMenuComponent,
        ContextMenuComponent,
        MegaMenuComponent,
        PanelMenuComponent,
        FileUploadBasicComponent,
        FileUploadAdvancedComponent,
        ProgressBarComponent,
        BadgeComponent,
        OverlayBadgeComponent,
        AvatarComponent,
        AvatarGroupComponent,
        SkeletonBlockComponent,
        TagComponent,
        ChipComponent
    ],
    templateUrl: './uikit-showcase.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [MessageService, ConfirmationService]
})
export class UIKitShowcaseComponent {
    @ViewChild('notesPopover') notesPopover?: PopoverComponent;

    private readonly messageService = inject(MessageService);
    private readonly confirmationService = inject(ConfirmationService);

    readonly nestedMenuItems: MenuItem[] = [
        {
            label: 'Workspace',
            icon: 'pi pi-briefcase',
            items: [
                { label: 'Overview', icon: 'pi pi-home' },
                { label: 'Reports', icon: 'pi pi-chart-bar' },
                {
                    label: 'Settings',
                    icon: 'pi pi-cog',
                    items: [
                        { label: 'Profile', icon: 'pi pi-user' },
                        { label: 'Notifications', icon: 'pi pi-bell' }
                    ]
                }
            ]
        },
        {
            label: 'Team',
            icon: 'pi pi-users',
            items: [{ label: 'Members', icon: 'pi pi-user-plus' }, { label: 'Permissions', icon: 'pi pi-shield' }]
        }
    ];

    readonly breadcrumbItems: MenuItem[] = [{ label: 'Admin' }, { label: 'Design System' }, { label: 'UI Kit' }];
    readonly breadcrumbHome: MenuItem = { icon: 'pi pi-home', routerLink: ['/app/admin'] };
    readonly simpleMenuItems: MenuItem[] = [
        { label: 'Create', icon: 'pi pi-plus' },
        { label: 'Duplicate', icon: 'pi pi-copy' },
        { label: 'Archive', icon: 'pi pi-folder' }
    ];
    readonly contextMenuItems: MenuItem[] = [
        { label: 'Open', icon: 'pi pi-folder-open' },
        { label: 'Share', icon: 'pi pi-share-alt' },
        { label: 'Delete', icon: 'pi pi-trash' }
    ];
    readonly megaMenuItems: MegaMenuItem[] = [
        {
            label: 'Library',
            icon: 'pi pi-box',
            items: [
                [
                    {
                        label: 'Components',
                        items: [{ label: 'Buttons' }, { label: 'Inputs' }, { label: 'Panels' }]
                    }
                ],
                [
                    {
                        label: 'Documentation',
                        items: [{ label: 'Usage' }, { label: 'Theming' }, { label: 'Accessibility' }]
                    }
                ]
            ]
        },
        {
            label: 'Resources',
            icon: 'pi pi-book',
            items: [
                [
                    {
                        label: 'Developer',
                        items: [{ label: 'Examples' }, { label: 'Changelog' }]
                    }
                ]
            ]
        }
    ];
    readonly stepItems = [
        { value: 1, label: 'Draft' },
        { value: 2, label: 'Review' },
        { value: 3, label: 'Publish' }
    ];
    readonly tabItems = [
        { value: 0, label: 'Overview' },
        { value: 1, label: 'Tokens' },
        { value: 2, label: 'Patterns' }
    ];
    readonly accordionItems = [
        { value: 0, header: 'Usage', content: 'Compose the reusable wrapper directly in a feature screen.' },
        { value: 1, header: 'Inputs', content: 'Keep configuration data-driven and pass only supported inputs.' },
        { value: 2, header: 'Outputs', content: 'Forward interaction events to page-level handlers.' }
    ];
    readonly tabPanelItems = [
        { value: 0, header: 'Overview', content: 'Reusable wrappers centralize PrimeNG usage across the app.' },
        { value: 1, header: 'States', content: 'Variants stay consistent because inputs are normalized.' },
        { value: 2, header: 'Adoption', content: 'Feature screens can compose these components without restyling.' }
    ];
    readonly autocompleteOptions = [
        { name: 'Casablanca' },
        { name: 'Rabat' },
        { name: 'Marrakech' },
        { name: 'Tangier' },
        { name: 'Agadir' }
    ];
    filteredAutocompleteOptions = [...this.autocompleteOptions];
    readonly selectOptions = [
        { name: 'Draft', code: 'draft' },
        { name: 'Review', code: 'review' },
        { name: 'Published', code: 'published' }
    ];
    readonly multiSelectOptions = [
        { name: 'Buttons' },
        { name: 'Inputs' },
        { name: 'Messages' },
        { name: 'Charts' }
    ];
    readonly treeNodes: TreeNode[] = [
        {
            key: 'design-system',
            label: 'Design System',
            children: [
                { key: 'components', label: 'Components' },
                { key: 'tokens', label: 'Tokens' },
                { key: 'patterns', label: 'Patterns' }
            ]
        }
    ];
    readonly listboxOptions = [
        { name: 'Primary' },
        { name: 'Secondary' },
        { name: 'Success' }
    ];
    readonly checkboxOptions = [
        { label: 'Searchable', value: 'searchable' },
        { label: 'Clearable', value: 'clearable' },
        { label: 'Disabled state', value: 'disabled' }
    ];
    readonly radioOptions = [
        { label: 'Compact', value: 'compact' },
        { label: 'Comfortable', value: 'comfortable' },
        { label: 'Spacious', value: 'spacious' }
    ];
    readonly selectButtonOptions = [
        { name: 'Light' },
        { name: 'Dark' },
        { name: 'System' }
    ];
    readonly timelineEvents = [
        { status: 'Base wrappers created', date: 'Step 1', icon: 'pi pi-cog', color: 'var(--p-primary-500)' },
        { status: 'Reusable inputs added', date: 'Step 2', icon: 'pi pi-pencil', color: 'var(--p-green-500)' },
        { status: 'Showcase page published', date: 'Step 3', icon: 'pi pi-check', color: 'var(--p-orange-500)' }
    ];
    readonly chartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
    readonly comparisonDatasets = [
        { label: 'Adoption', data: [12, 19, 14, 24, 28], colorKey: 'primary500' as const, fill: false },
        { label: 'Coverage', data: [8, 13, 18, 20, 25], colorKey: 'teal500' as const, fill: false }
    ];
    readonly radarDatasets = [{ label: 'Coverage', data: [80, 70, 85, 90, 75], colorKey: 'indigo500' as const }];
    readonly pieValues = [42, 28, 18, 12];
    readonly polarValues = [15, 25, 30, 20];
    readonly genericChartData = {
        labels: ['Foundation', 'Inputs', 'Navigation'],
        datasets: [
            {
                data: [35, 40, 25],
                backgroundColor: ['var(--p-primary-500)', 'var(--p-green-500)', 'var(--p-orange-500)']
            }
        ]
    };
    readonly genericChartOptions = {
        plugins: {
            legend: {
                labels: {
                    color: 'var(--text-color)'
                }
            }
        }
    };

    textValue = 'UI kit input';
    emailValue = 'team@example.com';
    numberValue = 12;
    textareaValue = 'This page acts like a mini Storybook inside the application.';
    dateValue = new Date();
    autocompleteValue = this.autocompleteOptions[0];
    dropdownValue = this.selectOptions[1];
    multiSelectValue = [this.multiSelectOptions[0], this.multiSelectOptions[2]];
    treeValue = 'components';
    listboxValue = this.listboxOptions[1];
    checkboxValue = ['searchable', 'clearable'];
    radioValue = 'comfortable';
    switchValue = true;
    toggleButtonValue = true;
    selectButtonValue = this.selectButtonOptions[0];
    sliderValue = 55;
    ratingValue = 4;
    colorValue = '#16a34a';
    knobValue = 68;
    collapsibleCollapsed = false;
    activeStep = 2;
    activeTab = 1;
    activeAccordion: number | number[] = 0;
    activePanelTab = 0;
    dialogVisible = false;
    drawerVisible = false;
    confirmDialogVisible = false;

    filterAutocomplete(event: AutoCompleteCompleteEvent): void {
        const query = (event.query ?? '').toLowerCase();
        this.filteredAutocompleteOptions = this.autocompleteOptions.filter((option) => option.name.toLowerCase().includes(query));
    }

    showToast(severity: 'success' | 'info' | 'warn' | 'error'): void {
        const messages = {
            success: { summary: 'Success', detail: 'Reusable component action completed.' },
            info: { summary: 'Info', detail: 'This toast is rendered through the UI kit wrapper.' },
            warn: { summary: 'Warning', detail: 'This is a non-blocking demo warning.' },
            error: { summary: 'Error', detail: 'This is a demo validation error.' }
        };

        this.messageService.add({ severity, ...messages[severity] });
    }

    openConfirmPopup(event: Event): void {
        this.confirmationService.confirm({
            key: 'uikit-showcase-confirm',
            target: event.target || new EventTarget(),
            message: 'Confirm the reusable confirm popup behavior?',
            icon: 'pi pi-exclamation-triangle',
            rejectButtonProps: { label: 'Cancel', severity: 'secondary', outlined: true },
            acceptButtonProps: { label: 'Confirm' },
            accept: () => this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Confirm popup accepted.' }),
            reject: () => this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'Confirm popup rejected.' })
        });
    }

    onConfirmDialogAccepted(): void {
        this.messageService.add({ severity: 'success', summary: 'Accepted', detail: 'Confirm dialog accepted.' });
    }

    onConfirmDialogRejected(): void {
        this.messageService.add({ severity: 'info', summary: 'Rejected', detail: 'Confirm dialog dismissed.' });
    }

    onExport(format: string): void {
        this.messageService.add({ severity: 'info', summary: 'Export Requested', detail: `Format: ${format}` });
    }

    onImport(files: File[]): void {
        this.messageService.add({ severity: 'success', summary: 'Files Selected', detail: `${files.length} file(s) chosen.` });
    }

    onAdvancedUpload(event: any): void {
        const files = event?.files ?? [];
        this.messageService.add({ severity: 'success', summary: 'Custom Upload', detail: `${files.length} file(s) ready for processing.` });
    }
}

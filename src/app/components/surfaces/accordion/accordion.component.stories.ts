import type { Meta, StoryObj } from "@storybook/angular";
import { moduleMetadata } from "@storybook/angular";
import { AccordionComponent } from "./accordion.component";
import { AccordionSummaryComponent } from "./accordion-summary.component";
import { AccordionDetailsComponent } from "./accordion-details.component";
import { LucideAngularModule, icons } from "lucide-angular";
import { action } from "@storybook/addon-actions";

// main template
const getAccordionRender = (
  args: any, // eslint-disable-line @typescript-eslint/no-explicit-any
) => ({
  props: {
    ...args,
    accordionList: [1, 2, 3],
  },
  trackByIndex(item: number): number {
    return item;
  },
  template: `
    <div *ngFor="let index of accordionList ; trackBy: trackByIndex">
      <app-accordion
        [defaultExpanded]="defaultExpanded ? index === 1 : false"
        [expanded]="expanded"
        [disabled]="disabled ? index === 3 : false"
        [square]="square"
        [disableGutters]="disableGutters"
        [slots]="slots"
        [index]="index"
        [classes]="classes"
        [expandIcon]="expandIcon !== undefined && index === 1 ? expandIcon : undefined"
        (changed)="changed($event)"
      >
        <app-accordion-summary
        [aria-controls]="('panel' + index)-content"
        [id]="('panel' + index)-summary"
        >
          Accordion {{index}}
        </app-accordion-summary>
        <app-accordion-details
        [role]="region"
        [id]="('panel' + index)-details"
        [aria-labelledby]="('panel' + index)-summary"
        >
          this is content of accordion {{index}}
        </app-accordion-details>
      </app-accordion>
    </div>
  `,
});

const meta: Meta<AccordionComponent | AccordionSummaryComponent> = {
  title: "surfaces/Accordion",
  component: AccordionComponent,
  decorators: [
    moduleMetadata({
      imports: [
        AccordionComponent,
        AccordionSummaryComponent,
        AccordionDetailsComponent,
        LucideAngularModule,
      ],
    }),
  ],
  parameters: {
    docs: {
      toc: {
        title: "Contents",
      },
      description: {
        component: `A vertically stacked set of interactive headings that each reveal a section of content.
        \nAccordion: the wrapper for grouping related components.
        \nAccordion Summary: the wrapper for the Accordion header, which expands or collapses the content when clicked.
        \nAccordion Details: the wrapper for the Accordion content.`,
      },
      subComponents: {
        AccordionSummary:
          "The summary of the accordion, which is clickable to expand/collapse.",
        AccordionDetails:
          "The details of the accordion that are shown/hidden when expanded.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    component: {
      description: "The component used for the root node",
      control: false,
      table: {
        defaultValue: { summary: "div" },
      },
    },

    defaultExpanded: {
      description: "If true, expands the accordion by default.",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    changed: {
      description:
        "Callback fired when the expand/collapse state changes. Receives the event and the new expanded state.",
      control: false,
      table: {
        type: {
          summary: "(event:Event, expanded: boolean) => void",
        },
      },
    },
    disableGutters: {
      description:
        "If true, removes the default gutters (margin) from the accordion.",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },

    expanded: {
      description: "If true, expands the accordion (controlled mode).",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    expandIcon: {
      description:
        "The icon element to display as the expand/collapse indicator.",
      control: false,
      table: {
        type: { summary: "<TemplateRef>" },
      },
    },

    square: {
      description: "If true, the accordion will remove square corners.",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    disabled: {
      description: "If true, disables the accordion.",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    slots: {
      description: "Slot overrides for internal components like heading",
      control: false,
      table: {
        type: { summary: "{ heading?: { component?: 'h3' } }" },
      },
    },
    classes: {
      description: "Override or extend the styles applied to the component.",
      control: false,
      table: {
        type: { summary: "{ root,summary:{btn,expandIcon,content},details}" },
      },
    },
  },
  render: getAccordionRender,
};

export default meta;
type Story = StoryObj<AccordionComponent>;

// Basic variants
export const Basic: Story = {
  args: {},
};

//expanded Icon variant
export const ExpandedIcon: Story = {
  render: (args) => ({
    props: {
      ...args,
      accordionList: [1, 2, 3],
      icons: icons,
    },
    trackByIndex(item: number): number {
      return item;
    },
    template: `
      <ng-template #customExpandIcon>
      <lucide-angular
        [img]='icons.ArrowDown'
        class="stroke-muted-foreground"
        [size]="18"
        ></lucide-angular>
      </ng-template>

      <div *ngFor="let index of accordionList ; trackBy: trackByIndex" class="max-w-xs mx-auto">
        <app-accordion
          [defaultExpanded]="defaultExpanded ? index === 1 : false"
          [expanded]="expanded"
          [disabled]="disabled ? index === 3 : false"
          [square]="square"
          [disableGutters]="disableGutters"
          [slots]="slots"
          [index]="index"
          [expandIcon]="index === 1 ? customExpandIcon : undefined"
          (changed)="changed($event)"
        >
          <app-accordion-summary
            [aria-controls]="('panel' + index)-content"
            [id]="('panel' + index)-summary"
          >
          Accordion {{index}}
          </app-accordion-summary>
          <app-accordion-details
            [role]="region"
            [id]="('panel' + index)-details"
            [aria-labelledby]="('panel' + index)-summary"
          >
            this is content of accordion {{index}}
          </app-accordion-details>
        </app-accordion>
      </div>
    `,
  }),
};

// DefaultExpanded variant
export const DefaultExpanded: Story = {
  args: {
    defaultExpanded: true,
  },
  render: getAccordionRender,
};

// Disabled variant
export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: getAccordionRender,
};
// controlled mode
export const Controlled: Story = {
  args: {
    expanded: true,
    changed: action("changed toggle"),
  },
  render: (args) => {
    return {
      props: {
        ...args,
        currentExpanded: null as string | null,
        accordionList: [1, 2, 3],

        handleChange: function (
          data: { event: Event; expanded: boolean },
          panelId: string,
        ) {
          if (args.changed) {
            args.changed(data);
          }
          // Update currentExpanded
          this["currentExpanded"] = data.expanded ? panelId : null;
        },
      },
      template: `
              <!-- 
          Component State Management Implementation:
          
          In component.ts we have:
          - currentExpanded: string | null = null;
          - handleChange function to manage the accordion state
          
          handleChange(data: { event: Event; expanded: boolean }, panelId: string) {
            // Custom logic for handling accordion expansion
            this.currentExpanded = data.expanded ? panelId : null;
          }
        -->
          <div *ngFor="let index of accordionList" class="max-w-xs mx-auto">
            <app-accordion
              [expanded]="currentExpanded === ('panel' + index)"
              [disabled]="disabled && index === 3"
              [square]="square"
              [disableGutters]="disableGutters"
              [slots]="slots"
              [index]="index"
              (changed)="handleChange($event, 'panel' + index)"
              [classes]="classes"
            >
              <app-accordion-summary
                [aria-controls]="('panel' + index)-content"
                [id]="('panel' + index)-summary"
                >
                  Accordion {{index}}
              </app-accordion-summary>
              <app-accordion-details
                [role]="region"
                [id]="('panel' + index)-details"
                [aria-labelledby]="('panel' + index)-summary"
              >
                this is content of accordion {{index}}
              </app-accordion-details>
            </app-accordion>
          </div>
      `,
    };
  },
  parameters: {
    docs: {
      description: {
        story: `-This story demonstrates a controlled accordion implementation where the expanded state 
              is managed externally.
            It showcases how to handle multiple accordion panels with programmatic control over which panel is currently expanded
            \nExternal State Management: The currentExpanded property tracks which panel is open
            \nEvent Handling: Custom handleChang function manages expansion state`,
      },
    },
  },
};
// Customization Accordion
export const Customization: Story = {
  args: {
    expanded: true,
    classes: {
      root: "",
      summary: {
        btn: "flex-row-reverse hover:bg-gray-50 rounded ",
        expandIcon: "expanded:90deg",
        content: "text-blue-500",
      },
      details: "",
    },
  },
  render: (args) => {
    return {
      props: {
        ...args,
        currentExpanded: null as string | null,
        accordionList: [1, 2, 3],
        icons: icons,
        handleChange: function (
          data: { event: Event; expanded: boolean },
          panelId: string,
        ) {
          if (args.changed) {
            args.changed(data);
          }
          // Update currentExpanded
          this["currentExpanded"] = data.expanded ? panelId : null;
        },
      },
      template: `
        <ng-template #customExpandIcon>
          <lucide-angular
            [img]='icons.ChevronRight'
            class="stroke-blue-400"
            [size]="18"
            ></lucide-angular>
        </ng-template>
        <div *ngFor="let index of accordionList" class="max-w-xs mx-auto">
          <app-accordion
            [expanded]="currentExpanded === ('panel' + index)"
            [disabled]="disabled && index === 3"
            [square]="square"
            [disableGutters]="disableGutters"
            [slots]="slots"
            [index]="index"
            [expandIcon]="customExpandIcon"
            (changed)="handleChange($event, 'panel' + index)"
            [classes]="classes"
          >
            <app-accordion-summary
            [aria-controls]="('panel' + index)-content"
            [id]="('panel' + index)-summary"
            >
              Accordion {{index}}
            </app-accordion-summary>
            <app-accordion-details
            [role]="region"
            [id]="('panel' + index)-details"
            [aria-labelledby]="('panel' + index)-summary"
            >
              this is content of accordion {{index}}
            </app-accordion-details>
          </app-accordion>
        </div>
      `,
    };
  },
  parameters: {
    docs: {
      description: {
        story: `-This story demonstrates custom styling capabilities of the accordion component.
            \nEx: classes: {
                root: "",
                summary: {
                  btn: "flex-row-reverse hover:bg-gray-50 rounded ",
                  expandIcon: "",
                  content: "text-blue-500",
                },
                details: "",
              },`,
      },
    },
  },
};
// DisableGutters variant
export const DisableGutters: Story = {
  args: {
    disableGutters: true,
    defaultExpanded: true,
  },
  render: getAccordionRender,
};

// Squared variant remove margin between accordion item
export const Squared: Story = {
  args: {
    square: true,
  },
  render: getAccordionRender,
};

// Changing heading of summary from h3 to h5
export const ChangingHeadingLevel: Story = {
  args: {
    slots: { heading: { component: "h5" } },
  },
  render: getAccordionRender,
  parameters: {
    docs: {
      description: {
        story: ` This story demonstrates how to customize the semantic heading level of accordion summary elements
         by changing the default heading tag "h3" to through the "slots".`,
      },
    },
  },
};

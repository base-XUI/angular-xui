import type { Meta, StoryObj } from "@storybook/angular";
import { moduleMetadata } from "@storybook/angular";
import { AccordionComponent } from "./accordion.component";
import { AccordionSummaryComponent } from "./accordion-summary.component";
import { AccordionDetailsComponent } from "./accordion-details.component";
import { ArrowDown } from "lucide-angular";
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
    <div *ngFor="let index of accordionList ; trackBy: trackByIndex" class="w-80 max-w-xs mx-auto">
      <app-accordion
        [defaultExpanded]="defaultExpanded ? index === 1 : false"
        [expanded]="expanded"
        [disabled]="disabled ? index === 3 : false"
        [square]="square"
        [disableGutters]="disableGutters"
        [slots]="slots"
        [index]="index"
        (changed)="changed()"
      >
        <xui-accordion-summary
          [expandIcon]="expandIcon !== undefined && index === 1 ? expandIcon : undefined"
        >
          Accordion {{index}}
        </xui-accordion-summary>
        <xui-accordion-details [role]="region">
          this is content of accordion {{index}}
        </xui-accordion-details>
      </app-accordion>
    </div>
  `,
});

const meta: Meta<AccordionComponent> = {
  title: "surfaces/Accordion",
  component: AccordionComponent,
  decorators: [
    moduleMetadata({
      imports: [
        AccordionComponent,
        AccordionSummaryComponent,
        AccordionDetailsComponent,
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
      control: "object",
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
        type: { summary: "{ root,summary,details}" },
      },
    },
  },
  render: getAccordionRender,
};

export default meta;
type Story = StoryObj<AccordionComponent>;

// Basic variants
export const Basic: Story = {
  args: {
    changed: (event: Event, isExpanded: boolean | string) => {
      console.log("changed called:", event, isExpanded);
    },
  },
};
//expanded Icon variant
export const ExpandedIcon: Story = {
  args: {
    expandIcon: ArrowDown,
  },
  render: getAccordionRender,
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

// DisableGutters variant
export const DisableGutters: Story = {
  args: {
    disableGutters: true,
    defaultExpanded: true,
  },
  render: getAccordionRender,
};
// controlled mode
export const controlled: Story = {
  args: {
    expanded: true,
  },
  render: (args) => ({
    props: {
      ...args,
      accordionList: [1, 2, 3],
      currentExpanded: false as string | false,
    },

    trackByIndex(item: number): number {
      return item;
    },
    template: `
    <div *ngFor="let index of accordionList ; trackBy: trackByIndex" class="w-80 max-w-xs mx-auto">
      <app-accordion
        [expanded]="currentExpanded === ('panel' + index)"
        [disabled]="disabled ? index === 3 : false"
        [defaultExpanded]="defaultExpanded && index === 1"
        [square]="square"
        [disableGutters]="disableGutters"
        [slots]="slots"
        [index]="index"
      >
        <xui-accordion-summary
          [expandIcon]="expandIcon !== undefined && index === 1 ? expandIcon : undefined"
        >
          Accordion {{index}}
        </xui-accordion-summary>
        <xui-accordion-details>
          This is content of accordion {{index}}
        </xui-accordion-details>
      </app-accordion>
    </div>
  `,
  }),
};
// Squared variant
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
};

import type { Meta, StoryObj } from "@storybook/angular";
import { moduleMetadata } from "@storybook/angular";
import { AccordionComponent } from "./accordion.component";
import { AccordionSummaryComponent } from "./accordion-summary.component";
import { AccordionDetailsComponent } from "./accordion-details.component";

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
  tags: ["autodocs"],

  argTypes: {
    component: {
      description: "The component used for the root node",
      control: false,
      table: {
        defaultValue: { summary: "div" },
      },
    },
    children: {
      description:
        "The content of the component (typically AccordionSummary and AccordionDetails).",
      control: false,
      table: {
        type: { summary: "node" },
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
    onChange: {
      description:
        "Callback fired when the expand/collapse state changes. Receives the event and the new expanded state.",
      table: {
        type: {
          summary: "(event: Event, expanded: boolean) => void",
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
      control: "text",
      table: {
        type: { summary: "string" },
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
        type: { summary: "{ heading?: { component?: string } }" },
      },
    },
  },

  parameters: {
    docs: {
      description: {
        component:
          "A vertically stacked set of interactive headings that each reveal a section of content.",
      },
    },
  },

  render: (args) => ({
    props: {
      ...args,
      accordionList: [1, 2, 3], // Example list for demonstration
    },

    template: `
    <div *ngFor="let index of accordionList">
      <app-accordion
        [defaultExpanded]="defaultExpanded && index === 1"
        [disabled]="disabled && index === 3"
      >

        // <xui-accordion-summary>
        //     <span>Accordion {{index}}</span>
         

        // </xui-accordion-summary>
        <app-accordion-details>
          <p>
            This is the content of accordion {{index}}. It can contain any
            HTML or Angular components.
          </p>
        </app-accordion-details>
      </app-accordion>
    </div>
  `,
  }),
  // This is the default value for the component prop
  args: {
    component: "div",
    defaultExpanded: false,
    disabled: false,
    disableGutters: false,
    expanded: false,
    square: false,
    slots: { heading: { component: "h3" } },
  },
};

export default meta;
type Story = StoryObj<AccordionComponent>;

// const actionLog = (msg: string) => console.log(msg);

// Basic variants
export const Basic: Story = {
  args: {},
};

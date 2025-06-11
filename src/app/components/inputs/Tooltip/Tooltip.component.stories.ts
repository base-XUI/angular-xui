import type { Meta, StoryObj } from "@storybook/angular";
import { moduleMetadata } from "@storybook/angular";
import { NgClass, NgStyle } from "@angular/common";
import { tooltipVariantsConfig } from "./variants";
import { TooltipComponent } from "./Tooltip.component";

const placementOptions = Object.keys(tooltipVariantsConfig.variants.placement);
const colorOptions = Object.keys(tooltipVariantsConfig.variants.color);

const meta: Meta<TooltipComponent> = {
  title: "Inputs/Tooltip",
  component: TooltipComponent,
  decorators: [
    moduleMetadata({
      imports: [NgClass, NgStyle, TooltipComponent],
    }),
  ],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A versatile Angular tooltip component that supports different variants, placements, colors, and states using Angular 18 signals and the new input() function.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    // Basic content
    title: {
      description: "The tooltip content text",
      control: { type: "text" },
      table: {
        category: "Content",
        type: { summary: "string" },
      },
    },

    // Appearance
    placement: {
      description: "Placement of the tooltip relative to the trigger element",
      options: placementOptions,
      control: { type: "select" },
      table: {
        category: "Appearance",
        defaultValue: {
          summary: tooltipVariantsConfig.defaultVariants.placement,
        },
        type: { summary: "TooltipPlacement" },
      },
    },
    color: {
      description: "Color scheme of the tooltip",
      options: colorOptions,
      control: { type: "select" },
      table: {
        category: "Appearance",
        defaultValue: {
          summary: tooltipVariantsConfig.defaultVariants.color,
        },
        type: { summary: "TooltipColor" },
      },
    },
    arrow: {
      description:
        "Whether the tooltip includes an arrow pointing to the trigger",
      control: { type: "boolean" },
      table: {
        category: "Appearance",
        defaultValue: {
          summary: String(tooltipVariantsConfig.defaultVariants.arrow),
        },
        type: { summary: "boolean" },
      },
    },

    // Behavior
    interactive: {
      description:
        "Enables pointer and keyboard interaction with the tooltip content",
      control: { type: "boolean" },
      table: {
        category: "Behavior",
        defaultValue: { summary: "true" },
        type: { summary: "boolean" },
      },
    },
    disabled: {
      description: "Completely disables the tooltip functionality",
      control: { type: "boolean" },
      table: {
        category: "Behavior",
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
    followCursor: {
      description:
        "Positions the tooltip relative to the mouse cursor instead of the trigger element",
      control: { type: "boolean" },
      table: {
        category: "Behavior",
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },

    // Event Listeners
    disableFocusListener: {
      description: "Disables tooltip activation on focus events",
      control: { type: "boolean" },
      table: {
        category: "Event Listeners",
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
    disableHoverListener: {
      description: "Disables tooltip activation on hover events",
      control: { type: "boolean" },
      table: {
        category: "Event Listeners",
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
    disableTouchListener: {
      description: "Disables tooltip activation on touch events",
      control: { type: "boolean" },
      table: {
        category: "Event Listeners",
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },

    // Timing
    enterDelay: {
      description:
        "Delay in milliseconds before showing tooltip on hover/focus",
      control: { type: "number", min: 0, max: 2000, step: 50 },
      table: {
        category: "Timing",
        defaultValue: { summary: "100" },
        type: { summary: "number" },
      },
    },
    enterNextDelay: {
      description:
        "Delay in milliseconds for subsequent tooltip displays (when opening quickly after closing)",
      control: { type: "number", min: 0, max: 1000, step: 50 },
      table: {
        category: "Timing",
        defaultValue: { summary: "0" },
        type: { summary: "number" },
      },
    },
    enterTouchDelay: {
      description: "Delay in milliseconds before showing tooltip on touch",
      control: { type: "number", min: 0, max: 2000, step: 50 },
      table: {
        category: "Timing",
        defaultValue: { summary: "700" },
        type: { summary: "number" },
      },
    },
    leaveDelay: {
      description:
        "Delay in milliseconds before hiding tooltip on hover/focus out",
      control: { type: "number", min: 0, max: 2000, step: 50 },
      table: {
        category: "Timing",
        defaultValue: { summary: "0" },
        type: { summary: "number" },
      },
    },
    leaveTouchDelay: {
      description:
        "Delay in milliseconds before hiding tooltip after touch end",
      control: { type: "number", min: 0, max: 3000, step: 100 },
      table: {
        category: "Timing",
        defaultValue: { summary: "1500" },
        type: { summary: "number" },
      },
    },
  },
  args: {
    title: "Tooltip text",
    placement: tooltipVariantsConfig.defaultVariants.placement,
    arrow: tooltipVariantsConfig.defaultVariants.arrow,
    color: tooltipVariantsConfig.defaultVariants.color,
    interactive: true,
    disabled: false,
    disableFocusListener: false,
    disableHoverListener: false,
    disableTouchListener: false,
    followCursor: false,
    enterDelay: 100,
    enterNextDelay: 0,
    enterTouchDelay: 700,
    leaveDelay: 0,
    leaveTouchDelay: 1500,
  },
};

export default meta;

type Story = StoryObj<TooltipComponent>;

export const Basic: Story = {
  args: {
    title: "Basic tooltip text",
    placement: "top",
    color: "primary",
    arrow: true,
    enterDelay: 500,
  },
  render: (args) => ({
    props: args,
    template: `
      <xui-tooltip
        [title]="title"
        [placement]="placement"
        [color]="color"
        [arrow]="arrow"
        [interactive]="interactive"
        [disabled]="disabled"
        [disableFocusListener]="disableFocusListener"
        [disableHoverListener]="disableHoverListener"
        [disableTouchListener]="disableTouchListener"
        [followCursor]="followCursor"
        [enterDelay]="enterDelay"
        [enterNextDelay]="enterNextDelay"
        [enterTouchDelay]="enterTouchDelay"
        [leaveDelay]="leaveDelay"
        [leaveTouchDelay]="leaveTouchDelay"
        [id]="id"
        (onOpen)="onOpen($event)"
        (onClose)="onClose($event)">
        <button class="rounded border border-gray-300 px-4 py-2 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
          Hover or focus me
        </button>
      </xui-tooltip>
    `,
  }),
};

export const AllPlacements: Story = {
  args: {
    title: "Tooltip content",
    arrow: true,
    color: "primary",
  },
  render: (args) => ({
    props: {
      ...args,
      placementOptions: placementOptions,
    },
    template: `
      <div class="grid grid-cols-4 gap-8 p-16">
        <div *ngFor="let placement of placementOptions" class="flex justify-center">
          <xui-tooltip
            [title]="'Placement: ' + placement"
            [placement]="placement"
            [color]="color"
            [arrow]="arrow"
            [interactive]="interactive">
            <button class="rounded border border-gray-300 px-3 py-2 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors text-sm min-w-[100px]">
              {{ placement }}
            </button>
          </xui-tooltip>
        </div>
      </div>
    `,
  }),
};

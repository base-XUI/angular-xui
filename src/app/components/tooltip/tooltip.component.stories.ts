import type { Meta, StoryObj } from "@storybook/angular";
import { TooltipComponent } from "./tooltip.component";
import { moduleMetadata } from "@storybook/angular";

const meta: Meta<TooltipComponent> = {
  title: "Components/Tooltip",
  component: TooltipComponent,
  decorators: [
    moduleMetadata({
      imports: [TooltipComponent],
    }),
  ],
  tags: ["autodocs"],
  argTypes: {
    position: {
      control: "select",
      options: ["top", "right", "bottom", "left"],
    },
    variant: {
      control: "select",
      options: ["dark", "light", "info", "warning", "error"],
    },
    delay: {
      control: "number",
    },
  },
};

export default meta;
type Story = StoryObj<TooltipComponent>;

export const Basic: Story = {
  args: {
    content: "This is a tooltip",
    position: "top",
    variant: "dark",
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="h-[200px] flex items-center justify-center">
        <app-tooltip 
          [content]="content"
          [position]="position"
          [variant]="variant"
        >
          <button class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Hover me
          </button>
        </app-tooltip>
      </div>
    `,
  }),
};

export const Positions: Story = {
  render: () => ({
    template: `
      <div class="h-[400px] flex items-center justify-center gap-8">
        <app-tooltip content="Top tooltip" position="top">
          <button class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Top
          </button>
        </app-tooltip>

        <app-tooltip content="Right tooltip" position="right">
          <button class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Right
          </button>
        </app-tooltip>

        <app-tooltip content="Bottom tooltip" position="bottom">
          <button class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Bottom
          </button>
        </app-tooltip>

        <app-tooltip content="Left tooltip" position="left">
          <button class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Left
          </button>
        </app-tooltip>
      </div>
    `,
  }),
};

export const Variants: Story = {
  render: () => ({
    template: `
      <div class="h-[200px] flex items-center justify-center gap-4">
        <app-tooltip content="Dark variant" variant="dark">
          <button class="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900">
            Dark
          </button>
        </app-tooltip>

        <app-tooltip content="Light variant" variant="light">
          <button class="px-4 py-2 bg-white text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50">
            Light
          </button>
        </app-tooltip>

        <app-tooltip content="Info variant" variant="info">
          <button class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Info
          </button>
        </app-tooltip>

        <app-tooltip content="Warning variant" variant="warning">
          <button class="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600">
            Warning
          </button>
        </app-tooltip>

        <app-tooltip content="Error variant" variant="error">
          <button class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
            Error
          </button>
        </app-tooltip>
      </div>
    `,
  }),
};

export const WithDelay: Story = {
  args: {
    content: "Tooltip with 500ms delay",
    delay: 500,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="h-[200px] flex items-center justify-center">
        <app-tooltip 
          [content]="content"
          [delay]="delay"
        >
          <button class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Hover me (delayed)
          </button>
        </app-tooltip>
      </div>
    `,
  }),
};

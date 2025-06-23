import type { Meta, StoryObj } from "@storybook/angular";
import { ButtonComponent } from "./button.component";
import { moduleMetadata } from "@storybook/angular";
import { buttonVariantsConfig } from "./variants";

// Extract variant options directly from the config
const variantOptions = Object.keys(buttonVariantsConfig.variants.variant);
const colorOptions = Object.keys(buttonVariantsConfig.variants.color);
const sizeOptions = Object.keys(buttonVariantsConfig.variants.size);

const meta: Meta<ButtonComponent> = {
  title: "Inputs/Button",
  component: ButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [ButtonComponent],
    }),
  ],
  tags: ["autodocs"],
  argTypes: {
    variant: {
      description: "Style variant of the button",
      options: variantOptions,
      control: { type: "select" },
      table: {
        defaultValue: { summary: buttonVariantsConfig.defaultVariants.variant },
      },
    },
    color: {
      description: "Color scheme of the button",
      options: colorOptions,
      control: { type: "select" },
      table: {
        defaultValue: { summary: buttonVariantsConfig.defaultVariants.color },
      },
    },
    size: {
      description: "Size of the button",
      options: sizeOptions,
      control: { type: "select" },
      table: {
        defaultValue: { summary: buttonVariantsConfig.defaultVariants.size },
      },
    },
    loading: {
      description: "Loading state of the button",
      control: "boolean",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    loadingPosition: {
      description: "Position of the loading indicator",
      options: ["start", "center", "end"],
      control: { type: "select" },
      table: {
        defaultValue: { summary: "center" },
      },
    },
    disableElevation: {
      description: "Disable elevation (shadow)",
      control: "boolean",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    fullWidth: {
      description: "Whether the button should take full width",
      control: "boolean",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    disabled: {
      description: "Disables the button",
      control: "boolean",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    component: {
      description: "The component used for the root node",
      control: { type: "text" },
      table: {
        defaultValue: { summary: "button" },
      },
    },
    type: {
      description: "Type attribute for the button element",
      control: { type: "select" },
      options: ["button", "submit", "reset"],
      table: {
        defaultValue: { summary: "button" },
      },
    },
    href: {
      description: "URL to navigate to when used as an anchor",
      control: { type: "text" },
    },
    target: {
      description: "Target attribute for links (e.g., _blank)",
      control: { type: "text" },
    },
    clicked: {
      description: "Event emitted when button is clicked",
      control: { type: "object" },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "A versatile button component that supports different variants, sizes, colors, and states.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<ButtonComponent>;

const actionLog = (msg: string) => console.log(msg);

// Basic variants
export const Contained: Story = {
  args: {
    variant: "contained",
    color: "primary",
  },
  render: (args) => ({
    props: {
      ...args,
      clicked: () => actionLog("Button clicked"),
    },
    template: `<xui-button [variant]="variant" [color]="color" (clicked)="clicked()">Contained Button</xui-button>`,
  }),
};

export const Text: Story = {
  args: {
    variant: "text",
    color: "primary",
  },
  render: (args) => ({
    props: {
      ...args,
      clicked: () => actionLog("Button clicked"),
    },
    template: `<xui-button [variant]="variant" [color]="color" (clicked)="clicked()">Text Button</xui-button>`,
  }),
};

export const Outlined: Story = {
  args: {
    variant: "outlined",
    color: "primary",
  },
  render: (args) => ({
    props: {
      ...args,
      clicked: () => actionLog("Button clicked"),
    },
    template: `<xui-button [variant]="variant" [color]="color" (clicked)="clicked()">Outlined Button</xui-button>`,
  }),
};

// Color variants
export const Success: Story = {
  args: {
    color: "success",
  },
  render: (args) => ({
    props: {
      ...args,
      clicked: () => actionLog("Button clicked"),
    },
    template: `<xui-button [color]="color" (clicked)="clicked()">Success Button</xui-button>`,
  }),
};

export const Error: Story = {
  args: {
    color: "error",
  },
  render: (args) => ({
    props: {
      ...args,
      clicked: () => actionLog("Button clicked"),
    },
    template: `<xui-button [color]="color" (clicked)="clicked()">Error Button</xui-button>`,
  }),
};

export const Warning: Story = {
  args: {
    color: "warning",
  },
  render: (args) => ({
    props: {
      ...args,
      clicked: () => actionLog("Button clicked"),
    },
    template: `<xui-button [color]="color" (clicked)="clicked()">Warning Button</xui-button>`,
  }),
};

export const Info: Story = {
  args: {
    color: "info",
  },
  render: (args) => ({
    props: {
      ...args,
      clicked: () => actionLog("Button clicked"),
    },
    template: `<xui-button [color]="color" (clicked)="clicked()">Info Button</xui-button>`,
  }),
};

// Sizes
export const Small: Story = {
  args: {
    size: "small",
  },
  render: (args) => ({
    props: {
      ...args,
      clicked: () => actionLog("Button clicked"),
    },
    template: `<xui-button [size]="size" (clicked)="clicked()">Small Button</xui-button>`,
  }),
};

export const Medium: Story = {
  args: {
    size: "medium",
  },
  render: (args) => ({
    props: {
      ...args,
      clicked: () => actionLog("Button clicked"),
    },
    template: `<xui-button [size]="size" (clicked)="clicked()">Medium Button</xui-button>`,
  }),
};

export const Large: Story = {
  args: {
    size: "large",
  },
  render: (args) => ({
    props: {
      ...args,
      clicked: () => actionLog("Button clicked"),
    },
    template: `<xui-button [size]="size" (clicked)="clicked()">Large Button</xui-button>`,
  }),
};

// States
export const Loading: Story = {
  args: {
    loading: true,
  },
  render: (args) => ({
    props: {
      ...args,
      clicked: () => actionLog("Button clicked"),
    },
    template: `<xui-button [loading]="loading" (clicked)="clicked()">Loading Button</xui-button>`,
  }),
};

export const LoadingStart: Story = {
  args: {
    loading: true,
    loadingPosition: "start",
  },
  render: (args) => ({
    props: {
      ...args,
      clicked: () => actionLog("Button clicked"),
    },
    template: `<xui-button [loading]="loading" [loadingPosition]="loadingPosition" (clicked)="clicked()">Loading Start</xui-button>`,
  }),
};

export const LoadingEnd: Story = {
  args: {
    loading: true,
    loadingPosition: "end",
  },
  render: (args) => ({
    props: {
      ...args,
      clicked: () => actionLog("Button clicked"),
    },
    template: `<xui-button [loading]="loading" [loadingPosition]="loadingPosition" (clicked)="clicked()">Loading End</xui-button>`,
  }),
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => ({
    props: {
      ...args,
      clicked: () => actionLog("Button clicked"),
    },
    template: `<xui-button [disabled]="disabled" (clicked)="clicked()">Disabled Button</xui-button>`,
  }),
};

export const DisabledStates: Story = {
  render: () => ({
    props: {
      clicked: () => actionLog("Button clicked"),
    },
    template: `
      <div style="display: flex; gap: 16px;">
        <xui-button disabled variant="contained" (clicked)="clicked()">Contained</xui-button>
        <xui-button disabled variant="outlined" (clicked)="clicked()">Outlined</xui-button>
        <xui-button disabled variant="text" (clicked)="clicked()">Text</xui-button>
      </div>
    `,
  }),
};

// Example showing icons
export const WithStartIcon: Story = {
  render: () => ({
    props: {
      clicked: () => actionLog("Button clicked"),
    },
    template: `
      <xui-button (clicked)="clicked()">
        <ng-template #startIcon>👈</ng-template>
        With Start Icon
      </xui-button>
    `,
  }),
};

export const WithEndIcon: Story = {
  render: () => ({
    props: {
      clicked: () => actionLog("Button clicked"),
    },
    template: `
      <xui-button (clicked)="clicked()">
        <ng-template #endIcon>👉</ng-template>
        With End Icon
      </xui-button>
    `,
  }),
};

export const WithBothIcons: Story = {
  render: () => ({
    props: {
      clicked: () => actionLog("Button clicked"),
    },
    template: `
      <xui-button (clicked)="clicked()">
        <ng-template #startIcon>👈</ng-template>
        With Both Icons
        <ng-template #endIcon>👉</ng-template>
      </xui-button>
    `,
  }),
};

// Example showing custom elements
export const AsLink: Story = {
  render: () => ({
    template: `
      <xui-button component="a" href="https://example.com" target="_blank">
        Link Button
      </xui-button>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          "Button rendered as an anchor element with href and target attributes.",
      },
    },
  },
};

export const CustomElement: Story = {
  render: () => ({
    template: `
      <xui-button component="div" role="button">
        Custom Div Button
      </xui-button>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          "Button rendered as a custom element (div) with appropriate ARIA attributes.",
      },
    },
  },
};

export const CustomElementDisabled: Story = {
  render: () => ({
    template: `
      <xui-button component="div" role="button" disabled="true">
        Disabled Div Button
      </xui-button>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          "Non-button elements get aria-disabled but not the disabled attribute.",
      },
    },
  },
};

// Example showing all variants together
export const ColorShowcase: Story = {
  render: () => ({
    props: {
      clicked: () => actionLog("Button clicked"),
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div style="display: flex; gap: 16px;">
          <xui-button component="a" target="_blank" color="primary" (clicked)="clicked()">Primary</xui-button>
          <xui-button color="secondary" (clicked)="clicked()">Secondary</xui-button>
          <xui-button color="success" (clicked)="clicked()">Success</xui-button>
          <xui-button color="error" (clicked)="clicked()">Error</xui-button>
          <xui-button color="warning" (clicked)="clicked()">Warning</xui-button>
          <xui-button color="info" (clicked)="clicked()">Info</xui-button>
        </div>

        <div style="display: flex; gap: 16px;">
          <xui-button variant="outlined" color="primary" (clicked)="clicked()">Primary</xui-button>
          <xui-button variant="outlined" color="success" (clicked)="clicked()">Success</xui-button>
          <xui-button variant="outlined" color="error" (clicked)="clicked()">Error</xui-button>
        </div>

        <div style="display: flex; gap: 16px;">
          <xui-button variant="text" color="primary" (clicked)="clicked()">Primary</xui-button>
          <xui-button variant="text" color="success" (clicked)="clicked()">Success</xui-button>
          <xui-button variant="text" color="error" (clicked)="clicked()">Error</xui-button>
        </div>
      </div>
    `,
  }),
};

export const LoadingStates: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px;">
        <xui-button loading loadingPosition="start">Start</xui-button>
        <xui-button loading loadingPosition="center">Center</xui-button>
        <xui-button loading loadingPosition="end">End</xui-button>
      </div>
    `,
  }),
};

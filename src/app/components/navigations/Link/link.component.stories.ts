import type { Meta, StoryObj } from "@storybook/angular";
import { linkVariantsConfig } from "./variants";
import { LinkComponent } from "./link.component";
import { moduleMetadata } from "@storybook/angular";

// Extract variant options directly from the config
const variantOptions = Object.keys(linkVariantsConfig.variants.variant);
//color options
const colorOptions = Object.keys(linkVariantsConfig.variants.color);
//text decoration options as array
const underlineOption = Object.keys(linkVariantsConfig.variants.underline);

const meta: Meta<LinkComponent> = {
  title: "Navigation/Link",
  component: LinkComponent,
  decorators: [
    moduleMetadata({
      imports: [LinkComponent],
    }),
  ],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "The Link component is used to create hyperlinks. It can be styled using the theme typography styles and supports different color schemes. The component can also be rendered as a different element type, such as a button.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    color: {
      description: "Color scheme of the Link",
      options: colorOptions,
      control: { type: "select" },
      table: {
        defaultValue: { summary: linkVariantsConfig.defaultVariants.color },
      },
    },
    underline: {
      control: {
        type: "select",
        options: underlineOption, // Matches the underline options in LinkComponent
      },
      description: "The underline style of the link.",
      defaultValue: linkVariantsConfig.defaultVariants.underline,
      table: {
        type: { summary: '"none" | "hover" | "always"' },
        defaultValue: { summary: "hover" },
      },
    },
    variant: {
      control: {
        type: "select",
        options: variantOptions, // Matches the variant options in LinkComponent
      },
      description: "The variant of the link.",
      defaultValue: linkVariantsConfig.defaultVariants.variant,
      table: {
        defaultValue: { summary: "inherit" },
      },
    },

    role: {
      control: {
        type: "text",
      },
      description: "",
      table: {
        type: { summary: "string" },
      },
    },
    component: {
      description: "The component used for the root node",
      control: { type: "text" },
    },
  },
} satisfies Meta<LinkComponent>;
// Default export for the story
export default meta;

type Story = StoryObj<LinkComponent>;
// Basic variants
export const Basic: Story = {
  args: {
    children: "Link",
    component: "",
    color: "primary",
    underline: "always",
    variant: "inherit",
  },
  render: (args) => ({
    props: {
      ...args,
    },
    template: `<app-link href="#"
      [variant]="variant" 
      [color]="color" 
      [underline]="underline">
      link
      </app-link>`,
  }),
};
// Basic variants
export const underline: Story = {
  args: {
    underline: "none",
  },
  render: (args) => ({
    props: {
      ...args,
      underlineOption: underlineOption,
    },
    template: `<div class="inline-flex  flex-col gap-2">
      <app-link href="#" 
        [variant]="variant"
        [color]="color" 
        [underline]="underline" 
        *ngFor="let underline of underlineOption">
        underline-{{underline}}
      </app-link>
    </div>`,
  }),
};

export const security: Story = {
  args: {
    target: "_blank",
    rel: "noreferrer",
  },
  render: (args) => ({
    props: {
      ...args,
    },
    template: `<app-link href="#" 
      [variant]="variant" 
      [color]="color" 
      [underline]="underline" 
      [target]="target" 
      [rel]="rel">
      Link
      </app-link>`,
  }),
};
// Example of using as a different element
export const AsButton: StoryObj = {
  args: {
    component: "button",
    role: "button",
  },
  render: (args) => ({
    props: {
      ...args,
      clicked: () => console.log("Button clicked"),
    },
    template: `<app-link 
      [variant]="variant" 
      [color]="color"
      [underline]="underline"
      [component]="component" 
      [role]="role" 
      (clicked)="clicked()">
      Link Button
      </app-link>`,
  }),
};

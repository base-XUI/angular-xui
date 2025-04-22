import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from './button.component';
import { moduleMetadata } from '@storybook/angular';

const meta: Meta<ButtonComponent> = {
  title: 'Components/Button',
  component: ButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [ButtonComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'danger'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    disabled: {
      control: 'boolean',
    },
    iconLeft: {
      control: 'text',
    },
    iconRight: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<ButtonComponent>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
  },
  render: (args) => ({
    props: args,
    template: `
      <app-button [variant]="variant" [size]="size">
        Click Me
      </app-button>
    `,
  }),
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'medium',
  },
  render: (args) => ({
    props: args,
    template: `
      <app-button [variant]="variant" [size]="size">
        Click Me
      </app-button>
    `,
  }),
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    size: 'medium',
  },
  render: (args) => ({
    props: args,
    template: `
      <app-button [variant]="variant" [size]="size">
        Click Me
      </app-button>
    `,
  }),
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    size: 'medium',
  },
  render: (args) => ({
    props: args,
    template: `
      <app-button [variant]="variant" [size]="size">
        Click Me
      </app-button>
    `,
  }),
};

export const Small: Story = {
  args: {
    variant: 'primary',
    size: 'small',
  },
  render: (args) => ({
    props: args,
    template: `
      <app-button [variant]="variant" [size]="size">
        Small Button
      </app-button>
    `,
  }),
};

export const Large: Story = {
  args: {
    variant: 'primary',
    size: 'large',
  },
  render: (args) => ({
    props: args,
    template: `
      <app-button [variant]="variant" [size]="size">
        Large Button
      </app-button>
    `,
  }),
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    disabled: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <app-button [variant]="variant" [size]="size" [disabled]="disabled">
        Disabled Button
      </app-button>
    `,
  }),
};

export const WithLeftIcon: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    iconLeft: '👈',
  },
  render: (args) => ({
    props: args,
    template: `
      <app-button [variant]="variant" [size]="size" [iconLeft]="iconLeft">
        Button with Left Icon
      </app-button>
    `,
  }),
};

export const WithRightIcon: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    iconRight: '👉',
  },
  render: (args) => ({
    props: args,
    template: `
      <app-button [variant]="variant" [size]="size" [iconRight]="iconRight">
        Button with Right Icon
      </app-button>
    `,
  }),
};

export const WithBothIcons: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    iconLeft: '👈',
    iconRight: '👉',
  },
  render: (args) => ({
    props: args,
    template: `
      <app-button [variant]="variant" [size]="size" [iconLeft]="iconLeft" [iconRight]="iconRight">
        Button with Both Icons
      </app-button>
    `,
  }),
};

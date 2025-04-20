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
      options: ['text', 'contained', 'outlined']
    },
    color: {
      control: 'select',
      options: ['inherit', 'primary', 'secondary', 'success', 'error', 'info', 'warning']
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large']
    },
    fullWidth: {
      control: 'boolean'
    },
    disableElevation: {
      control: 'boolean'
    },
    disabled: {
      control: 'boolean'
    },
    iconLeft: {
      control: 'text'
    },
    iconRight: {
      control: 'text'
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset']
    }
  }
};

export default meta;
type Story = StoryObj<ButtonComponent>;

export const Contained: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    size: 'medium'
  },
  render: (args) => ({
    props: args,
    template: `
      <app-button [variant]="variant" [color]="color" [size]="size">
        Contained Button
      </app-button>
    `
  })
};

export const Text: Story = {
  args: {
    variant: 'text',
    color: 'primary',
    size: 'medium'
  },
  render: (args) => ({
    props: args,
    template: `
      <app-button [variant]="variant" [color]="color" [size]="size">
        Text Button
      </app-button>
    `
  })
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    color: 'primary',
    size: 'medium'
  },
  render: (args) => ({
    props: args,
    template: `
      <app-button [variant]="variant" [color]="color" [size]="size">
        Outlined Button
      </app-button>
    `
  })
};

export const Small: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    size: 'small'
  },
  render: (args) => ({
    props: args,
    template: `
      <app-button [variant]="variant" [color]="color" [size]="size">
        Small Button
      </app-button>
    `
  })
};

export const Large: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    size: 'large'
  },
  render: (args) => ({
    props: args,
    template: `
      <app-button [variant]="variant" [color]="color" [size]="size">
        Large Button
      </app-button>
    `
  })
};

export const Disabled: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    size: 'medium',
    disabled: true
  },
  render: (args) => ({
    props: args,
    template: `
      <app-button [variant]="variant" [color]="color" [size]="size" [disabled]="disabled">
        Disabled Button
      </app-button>
    `
  })
};

export const WithLeftIcon: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    size: 'medium',
    iconLeft: '👈'
  },
  render: (args) => ({
    props: args,
    template: `
      <app-button [variant]="variant" [color]="color" [size]="size" [iconLeft]="iconLeft">
        Button with Left Icon
      </app-button>
    `
  })
};

export const WithRightIcon: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    size: 'medium',
    iconRight: '👉'
  },
  render: (args) => ({
    props: args,
    template: `
      <app-button [variant]="variant" [color]="color" [size]="size" [iconRight]="iconRight">
        Button with Right Icon
      </app-button>
    `
  })
};

export const WithBothIcons: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    size: 'medium',
    iconLeft: '👈',
    iconRight: '👉'
  },
  render: (args) => ({
    props: args,
    template: `
      <app-button [variant]="variant" [color]="color" [size]="size" [iconLeft]="iconLeft" [iconRight]="iconRight">
        Button with Both Icons
      </app-button>
    `
  })
};

export const FullWidth: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    size: 'medium',
    fullWidth: true
  },
  render: (args) => ({
    props: args,
    template: `
      <app-button [variant]="variant" [color]="color" [size]="size" [fullWidth]="fullWidth">
        Full Width Button
      </app-button>
    `
  })
};

export const NoElevation: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    size: 'medium',
    disableElevation: true
  },
  render: (args) => ({
    props: args,
    template: `
      <app-button [variant]="variant" [color]="color" [size]="size" [disableElevation]="disableElevation">
        No Elevation Button
      </app-button>
    `
  })
}; 
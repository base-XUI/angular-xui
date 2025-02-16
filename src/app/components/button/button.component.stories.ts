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
      options: ['primary', 'secondary', 'outline']
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large']
    },
    disabled: {
      control: 'boolean'
    },
    label: {
      control: 'text'
    },
    iconLeft: {
      control: 'text'
    },
    iconRight: {
      control: 'text'
    }
  }
};

export default meta;
type Story = StoryObj<ButtonComponent>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    label: 'Primary Button',
    size: 'medium',
    disabled: false
  }
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    label: 'Secondary Button',
    size: 'medium',
    disabled: false
  }
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    label: 'Outline Button',
    size: 'medium',
    disabled: false
  }
};

export const Small: Story = {
  args: {
    variant: 'primary',
    label: 'Small Button',
    size: 'small',
    disabled: false
  }
};

export const Large: Story = {
  args: {
    variant: 'primary',
    label: 'Large Button',
    size: 'large',
    disabled: false
  }
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    label: 'Disabled Button',
    size: 'medium',
    disabled: true
  }
};

export const WithLeftIcon: Story = {
  args: {
    variant: 'primary',
    label: 'Button with Left Icon',
    size: 'medium',
    iconLeft: '👈',
    disabled: false
  }
};

export const WithRightIcon: Story = {
  args: {
    variant: 'primary',
    label: 'Button with Right Icon',
    size: 'medium',
    iconRight: '👉',
    disabled: false
  }
};

export const WithBothIcons: Story = {
  args: {
    variant: 'primary',
    label: 'Button with Both Icons',
    size: 'medium',
    iconLeft: '👈',
    iconRight: '👉',
    disabled: false
  }
}; 
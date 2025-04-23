import type { Meta, StoryObj } from '@storybook/angular';
import { TypographyComponent } from './typography.component';
import { moduleMetadata } from '@storybook/angular';

const meta: Meta<TypographyComponent> = {
  title: 'Design System/Typography',
  component: TypographyComponent,
  decorators: [
    moduleMetadata({
      imports: [TypographyComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'h1',
        'h2',
        'h3',
        'h4',
        'subtitle1',
        'subtitle2',
        'body1',
        'body2',
        'caption',
      ],
    },
    text: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<TypographyComponent>;

export const Heading1: Story = {
  args: {
    variant: 'h1',
    text: 'Heading 1 - The quick brown fox jumps over the lazy dog',
  },
};

export const Heading2: Story = {
  args: {
    variant: 'h2',
    text: 'Heading 2 - The quick brown fox jumps over the lazy dog',
  },
};

export const Heading3: Story = {
  args: {
    variant: 'h3',
    text: 'Heading 3 - The quick brown fox jumps over the lazy dog',
  },
};

export const Heading4: Story = {
  args: {
    variant: 'h4',
    text: 'Heading 4 - The quick brown fox jumps over the lazy dog',
  },
};

export const Subtitle1: Story = {
  args: {
    variant: 'subtitle1',
    text: 'Subtitle 1 - The quick brown fox jumps over the lazy dog',
  },
};

export const Subtitle2: Story = {
  args: {
    variant: 'subtitle2',
    text: 'Subtitle 2 - The quick brown fox jumps over the lazy dog',
  },
};

export const Body1: Story = {
  args: {
    variant: 'body1',
    text: 'Body 1 - The quick brown fox jumps over the lazy dog',
  },
};

export const Body2: Story = {
  args: {
    variant: 'body2',
    text: 'Body 2 - The quick brown fox jumps over the lazy dog',
  },
};

export const Caption: Story = {
  args: {
    variant: 'caption',
    text: 'Caption - The quick brown fox jumps over the lazy dog',
  },
};

import type { Meta, StoryObj } from "@storybook/angular";
import { CardComponent } from "./card.component";
import { moduleMetadata } from "@storybook/angular";

const meta: Meta<CardComponent> = {
  title: "Components/Card",
  component: CardComponent,
  decorators: [
    moduleMetadata({
      imports: [CardComponent],
    }),
  ],
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["basic", "bordered", "elevated", "flat"],
    },
    padding: {
      control: "select",
      options: ["none", "small", "medium", "large"],
    },
  },
};

export default meta;
type Story = StoryObj<CardComponent>;

export const Basic: Story = {
  args: {
    variant: "basic",
    padding: "medium",
    title: "Card Title",
    subtitle: "Card Subtitle",
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="p-4 bg-gray-100 dark:bg-gray-900">
        <app-card 
          [variant]="variant"
          [padding]="padding"
          [title]="title"
          [subtitle]="subtitle"
        >
          <p class="text-gray-700 dark:text-gray-300">
            This is a basic card with a title and subtitle. 
            The content can be any valid HTML or Angular components.
          </p>
        </app-card>
      </div>
    `,
  }),
};

export const WithImage: Story = {
  args: {
    variant: "elevated",
    padding: "medium",
    title: "Card with Image",
    imageUrl: "https://source.unsplash.com/random/800x400",
    imageAlt: "Random image",
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="p-4 bg-gray-100 dark:bg-gray-900">
        <app-card 
          [variant]="variant"
          [padding]="padding"
          [title]="title"
          [imageUrl]="imageUrl"
          [imageAlt]="imageAlt"
        >
          <p class="text-gray-700 dark:text-gray-300">
            This card includes an image at the top. 
            Images maintain their aspect ratio and cover the full width.
          </p>
        </app-card>
      </div>
    `,
  }),
};

export const WithFooter: Story = {
  args: {
    variant: "bordered",
    padding: "medium",
    title: "Card with Footer",
    footer: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="p-4 bg-gray-100 dark:bg-gray-900">
        <app-card 
          [variant]="variant"
          [padding]="padding"
          [title]="title"
          [footer]="footer"
        >
          <p class="text-gray-700 dark:text-gray-300">
            This card has a footer section that can contain actions or additional information.
          </p>
          <div footer class="flex justify-end space-x-2">
            <button class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
              Cancel
            </button>
            <button class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
              Save
            </button>
          </div>
        </app-card>
      </div>
    `,
  }),
};

export const Flat: Story = {
  args: {
    variant: "flat",
    padding: "large",
    title: "Flat Card",
    subtitle: "With large padding",
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="p-4 bg-gray-100 dark:bg-gray-900">
        <app-card 
          [variant]="variant"
          [padding]="padding"
          [title]="title"
          [subtitle]="subtitle"
        >
          <p class="text-gray-700 dark:text-gray-300">
            This is a flat card with large padding. 
            It uses a subtle background color to stand out from the page.
          </p>
        </app-card>
      </div>
    `,
  }),
};

export const ImageLeft: Story = {
  args: {
    variant: "elevated",
    padding: "medium",
    title: "Card with Left Image",
    imageUrl: "https://source.unsplash.com/random/400x400",
    imageAlt: "Random image",
    imagePosition: "left",
    imageSize: "medium",
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="p-4 bg-gray-100 dark:bg-gray-900">
        <app-card 
          [variant]="variant"
          [padding]="padding"
          [title]="title"
          [imageUrl]="imageUrl"
          [imageAlt]="imageAlt"
          [imagePosition]="imagePosition"
          [imageSize]="imageSize"
        >
          <p class="text-gray-700 dark:text-gray-300">
            This card features a left-aligned image with customizable width.
            The content flows naturally beside it.
          </p>
        </app-card>
      </div>
    `,
  }),
};

export const BackgroundImage: Story = {
  args: {
    variant: "basic",
    padding: "large",
    title: "Card with Background Image",
    imageUrl: "https://source.unsplash.com/random/1200x800",
    imagePosition: "background",
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="p-4 bg-gray-100 dark:bg-gray-900">
        <app-card 
          [variant]="variant"
          [padding]="padding"
          [title]="title"
          [imageUrl]="imageUrl"
          [imagePosition]="imagePosition"
        >
          <p class="text-gray-100">
            This card uses the image as a background with a dark overlay.
            The text is white for better contrast.
          </p>
        </app-card>
      </div>
    `,
  }),
};

export const LoadingStates: Story = {
  args: {
    padding: "none",
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="p-4 bg-gray-100 dark:bg-gray-900 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <!-- Loading Card -->
        <app-card
          variant="elevated"
          [padding]="padding"
          imagePosition="top"
          imageSize="medium"
          title="Loading..."
        >
          <div class="p-4 space-y-3">
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-2/3"></div>
          </div>
        </app-card>

        <!-- Loaded Card -->
        <app-card
          variant="elevated"
          [padding]="padding"
          imageUrl="https://source.unsplash.com/random/800x600?nature"
          imagePosition="top"
          imageSize="medium"
          title="Loaded Content"
        >
          <div class="p-4">
            <p class="text-gray-700 dark:text-gray-300">This card has loaded its image successfully.</p>
          </div>
        </app-card>

        <!-- Error State Card -->
        <app-card
          variant="elevated"
          [padding]="padding"
          imagePosition="top"
          imageSize="medium"
          title="Error State"
        >
          <div class="p-4">
            <p class="text-red-600 dark:text-red-400">Failed to load image</p>
          </div>
        </app-card>
      </div>
    `,
  }),
};

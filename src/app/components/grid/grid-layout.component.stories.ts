import type { Meta, StoryObj } from '@storybook/angular';
import { GridLayoutComponent } from './grid-layout.component';
import { moduleMetadata } from '@storybook/angular';

const meta: Meta<GridLayoutComponent> = {
  title: 'Layout/Grid',
  component: GridLayoutComponent,
  decorators: [
    moduleMetadata({
      imports: [GridLayoutComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    cols: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6, 12],
    },
    gap: {
      control: 'select',
      options: ['none', 'small', 'medium', 'large'],
    },
    padding: {
      control: 'select',
      options: ['none', 'small', 'medium', 'large'],
    },
    responsive: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<GridLayoutComponent>;

// Helper function to create grid items
const createGridItems = (count: number) => {
  return Array(count)
    .fill(0)
    .map(
      (_, i) => `
    <div class="bg-white p-4 rounded-lg shadow">
      <div class="h-32 bg-gray-100 rounded-md mb-2"></div>
      <h3 class="text-lg font-medium">Item ${i + 1}</h3>
      <p class="text-gray-600">Description for item ${i + 1}</p>
    </div>
  `,
    )
    .join('');
};

export const ThreeColumns: Story = {
  args: {
    cols: 3,
    gap: 'medium',
    padding: 'medium',
    responsive: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="bg-gray-50 min-h-screen">
        <app-grid-layout [cols]="cols" [gap]="gap" [padding]="padding" [responsive]="responsive">
          ${createGridItems(6)}
        </app-grid-layout>
      </div>
    `,
  }),
};

export const TwoColumns: Story = {
  args: {
    cols: 2,
    gap: 'large',
    padding: 'medium',
    responsive: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="bg-gray-50 min-h-screen">
        <app-grid-layout [cols]="cols" [gap]="gap" [padding]="padding" [responsive]="responsive">
          ${createGridItems(4)}
        </app-grid-layout>
      </div>
    `,
  }),
};

export const FourColumns: Story = {
  args: {
    cols: 4,
    gap: 'medium',
    padding: 'medium',
    responsive: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="bg-gray-50 min-h-screen">
        <app-grid-layout [cols]="cols" [gap]="gap" [padding]="padding" [responsive]="responsive">
          ${createGridItems(8)}
        </app-grid-layout>
      </div>
    `,
  }),
};

export const DashboardGrid: Story = {
  args: {
    cols: 12,
    gap: 'medium',
    padding: 'medium',
    responsive: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="bg-gray-50 min-h-screen">
        <app-grid-layout [cols]="cols" [gap]="gap" [padding]="padding" [responsive]="responsive">
          <div class="col-span-8 bg-white p-4 rounded-lg shadow">
            <h2 class="text-xl font-semibold mb-4">Main Content</h2>
            <div class="h-64 bg-gray-100 rounded-md"></div>
          </div>
          <div class="col-span-4 bg-white p-4 rounded-lg shadow">
            <h2 class="text-xl font-semibold mb-4">Sidebar</h2>
            <div class="h-64 bg-gray-100 rounded-md"></div>
          </div>
          <div class="col-span-6 bg-white p-4 rounded-lg shadow">
            <h2 class="text-xl font-semibold mb-4">Half Width</h2>
            <div class="h-32 bg-gray-100 rounded-md"></div>
          </div>
          <div class="col-span-6 bg-white p-4 rounded-lg shadow">
            <h2 class="text-xl font-semibold mb-4">Half Width</h2>
            <div class="h-32 bg-gray-100 rounded-md"></div>
          </div>
        </app-grid-layout>
      </div>
    `,
  }),
};

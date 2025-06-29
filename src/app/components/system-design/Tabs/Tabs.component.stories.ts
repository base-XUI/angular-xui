import { moduleMetadata, type Meta, type StoryObj } from "@storybook/angular";
import { CommonModule } from "@angular/common";

import { TabsComponent } from "./Tabs.component";
import { TabComponent } from "./Tab/Tab.component";
import { TabListComponent } from "./TabList/TabList.component";
import { TabPanelComponent } from "./TabPanel/TabPanel.component";

import { LucideAngularModule, Home, User, Settings } from "lucide-angular";

const meta: Meta<TabsComponent> = {
  title: "System Design/Tabs",
  component: TabsComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        TabsComponent,
        TabComponent,
        TabListComponent,
        TabPanelComponent,
        LucideAngularModule.pick({ Home, User, Settings }), // ✅ register
      ],
    }),
  ],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A complete tabs system with TabList, Tab, and TabPanel components.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      description: "Tab variant style",
      options: ["standard", "scrollable", "fullWidth"],
      control: { type: "select" },
      table: { defaultValue: { summary: "standard" } },
    },
    orientation: {
      description: "Tab orientation",
      options: ["horizontal", "vertical"],
      control: { type: "select" },
      table: { defaultValue: { summary: "horizontal" } },
    },
    indicatorColor: {
      description: "Color of the selection indicator",
      options: ["primary", "secondary"],
      control: { type: "select" },
      table: { defaultValue: { summary: "primary" } },
    },
  },
};

export default meta;
type Story = StoryObj<TabsComponent>;

export const Basic: Story = {
  render: () => ({
    template: `
      <xui-tabs [defaultValue]="0">
        <xui-tablist>
          <xui-tab [value]="0">ITEM ONE</xui-tab>
          <xui-tab [value]="1">ITEM TWO</xui-tab>
          <xui-tab [value]="2">ITEM THREE</xui-tab>
        </xui-tablist>
        <xui-tabpanel [value]="0">ITEM ONE</xui-tabpanel>
        <xui-tabpanel [value]="1">ITEM TWO</xui-tabpanel>
        <xui-tabpanel [value]="2">ITEM THREE</xui-tabpanel>
      </xui-tabs>
    `,
  }),
};

export const Vertical: Story = {
  render: () => ({
    template: `
      <xui-tabs [defaultValue]="0" orientation="vertical">
        <xui-tablist>
          <xui-tab [value]="0">ITEM ONE</xui-tab>
          <xui-tab [value]="1">ITEM TWO</xui-tab>
          <xui-tab [value]="2">ITEM THREE</xui-tab>
        </xui-tablist>
        <xui-tabpanel [value]="0">ITEM ONE</xui-tabpanel>
        <xui-tabpanel [value]="1">ITEM TWO</xui-tabpanel>
        <xui-tabpanel [value]="2">ITEM THREE</xui-tabpanel>
      </xui-tabs>
    `,
  }),
};

export const FullWidth: Story = {
  render: () => ({
    template: `
      <xui-tabs [defaultValue]="0" variant="fullWidth">
        <xui-tablist>
          <xui-tab [value]="0">Full Width Tab 1</xui-tab>
          <xui-tab [value]="1">Full Width Tab 2</xui-tab>
        </xui-tablist>
        <xui-tabpanel [value]="0">Tab 1</xui-tabpanel>
        <xui-tabpanel [value]="1">Tab 2</xui-tabpanel>
      </xui-tabs>
    `,
  }),
};

export const Scrollable: Story = {
  render: () => ({
    template: `
      <div class="w-[300px]">
        <xui-tabs [defaultValue]="0" variant="scrollable">
          <xui-tablist>
            <xui-tab *ngFor="let i of [0,1,2,3,4,5]" [value]="i">
              PAGE {{i + 1}}
            </xui-tab>
          </xui-tablist>
          <xui-tabpanel *ngFor="let i of [0,1,2,3,4,5]" [value]="i">
            PAGE {{i + 1}}
          </xui-tabpanel>
        </xui-tabs>
      </div>
    `,
  }),
};

export const TabVariants: Story = {
  render: () => ({
    template: `
      <div class="flex flex-col gap-4">
        <xui-tabs [defaultValue]="0">
          <xui-tablist>
            <xui-tab [value]="0">Standard Tab</xui-tab>
            <xui-tab [value]="1">
              <div class="flex items-center">
                <lucide-icon name="home" class="h-4 w-4 mr-2" />
                With Icon
              </div>
            </xui-tab>
            <xui-tab [value]="2" [disabled]="true">Disabled</xui-tab>
          </xui-tablist>
          <xui-tabpanel [value]="0">Standard Tab Content</xui-tabpanel>
          <xui-tabpanel [value]="1">Icon Tab Content</xui-tabpanel>
          <xui-tabpanel [value]="2">Disabled Tab Content</xui-tabpanel>
        </xui-tabs>
      </div>
    `,
  }),
};

export const TabListVariants: Story = {
  render: () => ({
    template: `
      <div class="flex flex-col gap-8">
        <xui-tabs [defaultValue]="0">
          <xui-tablist variant="standard">
            <xui-tab [value]="0">Standard List</xui-tab>
            <xui-tab [value]="1">ITEM TWO</xui-tab>
          </xui-tablist>
          <xui-tabpanel [value]="0">Standard List</xui-tabpanel>
          <xui-tabpanel [value]="1">ITEM TWO</xui-tabpanel>
        </xui-tabs>

        <xui-tabs [defaultValue]="0">
          <xui-tablist variant="contained" class="rounded-lg bg-gray-100 p-2">
            <xui-tab [value]="0">Contained List</xui-tab>
            <xui-tab [value]="1">ITEM TWO</xui-tab>
          </xui-tablist>
          <xui-tabpanel [value]="0">Contained List</xui-tabpanel>
          <xui-tabpanel [value]="1">ITEM TWO</xui-tabpanel>
        </xui-tabs>
      </div>
    `,
  }),
};

export const TabPanelVariants: Story = {
  render: () => ({
    template: `
      <xui-tabs [defaultValue]="0">
        <xui-tablist>
          <xui-tab [value]="0" class="px-6 py-2">Default Panel</xui-tab>
          <xui-tab [value]="1" class="px-6 py-2">Boxed Panel</xui-tab>
          <xui-tab [value]="2" class="px-6 py-2">Custom Panel</xui-tab>
        </xui-tablist>

        <div>
          <xui-tabpanel [value]="0">
            Default Panel Content
          </xui-tabpanel>
          <xui-tabpanel [value]="1">
            <div class="rounded-lg border border-gray-200 p-4">
              Boxed Panel Content
            </div>
          </xui-tabpanel>
          <xui-tabpanel [value]="2">
            <div class="rounded-lg bg-gray-50 p-6 shadow-inner">
              Custom Styled Panel
            </div>
          </xui-tabpanel>
        </div>
      </xui-tabs>
    `,
  }),
};

export const InteractiveExample: Story = {
  render: () => ({
    template: `
      <xui-tabs [defaultValue]="0">
        <xui-tablist>
          <xui-tab [value]="0">
            <div class="flex items-center">
              <lucide-icon name="home" class="h-4 w-4 mr-2" />
              Home
            </div>
          </xui-tab>
          <xui-tab [value]="1">
            <div class="flex items-center">
              <lucide-icon name="user" class="h-4 w-4 mr-2" />
              Profile
            </div>
          </xui-tab>
          <xui-tab [value]="2">
            <div class="flex items-center">
              <lucide-icon name="settings" class="h-4 w-4 mr-2" />
              Settings
            </div>
          </xui-tab>
        </xui-tablist>

        <xui-tabpanel [value]="0">
          <div class="space-y-2 p-4">
            <h3 class="text-lg font-bold">Welcome Home</h3>
            <p>This is an interactive example with rich content.</p>
          </div>
        </xui-tabpanel>

        <xui-tabpanel [value]="1">
          <div class="space-y-2 p-4">
            <h3 class="text-lg font-bold">User Profile</h3>
            <p>Profile content with custom styling.</p>
          </div>
        </xui-tabpanel>

        <xui-tabpanel [value]="2">
          <div class="space-y-2 p-4">
            <h3 class="text-lg font-bold">Settings</h3>
            <p>Settings panel with comprehensive example.</p>
          </div>
        </xui-tabpanel>
      </xui-tabs>
    `,
  }),
};

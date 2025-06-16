import { moduleMetadata, type Meta, type StoryObj } from "@storybook/angular";
import { TabsComponent } from "./Tabs.component";
import { TabComponent } from "../Tab/Tab.component";
import { TabListComponent } from "../TabList/TabList.component";
import { TabPanelComponent } from "../TabPanel/TabPanel.component";
import { CommonModule } from "@angular/common";

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
              <span class="h-4 w-4 mr-2">🏠</span>
              With Icon
            </xui-tab>
            <xui-tab [value]="2" [disabled]="true">Disabled</xui-tab>
          </xui-tablist>
          <xui-tabpanel [value]="0">Standard Tab</xui-tabpanel>
          <xui-tabpanel [value]="1">Icon Tab</xui-tabpanel>
          <xui-tabpanel [value]="2">Disabled Tab</xui-tabpanel>
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
          <xui-tab [value]="0">Default Panel</xui-tab>
          <xui-tab [value]="1">Boxed Panel</xui-tab>
          <xui-tab [value]="2">Custom Panel</xui-tab>
        </xui-tablist>
        <xui-tabpanel [value]="0">Default Panel Content</xui-tabpanel>
        <xui-tabpanel [value]="1" class="mt-2 rounded-lg border p-4">
          Boxed Panel Content
        </xui-tabpanel>
        <xui-tabpanel [value]="2" class="mt-2 bg-gray-50 p-6 shadow-inner">
          Custom Styled Panel
        </xui-tabpanel>
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
              <svg class="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
              Home
            </div>
          </xui-tab>
          <xui-tab [value]="1">
            <div class="flex items-center">
              <svg class="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              Profile
            </div>
          </xui-tab>
          <xui-tab [value]="2">
            <div class="flex items-center">
              <svg class="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
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

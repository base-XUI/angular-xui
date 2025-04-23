import type { Meta, StoryObj } from "@storybook/angular";
import { SidemenuComponent } from "./sidemenu.component";
import { moduleMetadata } from "@storybook/angular";
import { Icons } from "../../shared/icons";

const meta: Meta<SidemenuComponent> = {
  title: "Components/Sidemenu",
  component: SidemenuComponent,
  decorators: [
    moduleMetadata({
      imports: [SidemenuComponent],
    }),
  ],
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["light", "dark"],
    },
    brand: {
      control: "text",
    },
    menuItems: {
      control: "object",
    },
  },
};

export default meta;
type Story = StoryObj<SidemenuComponent>;

const defaultMenuItems = [
  {
    label: "Dashboard",
    icon: Icons.dashboard,
    href: "#",
    active: true,
  },
  {
    label: "Team",
    icon: Icons.users,
    href: "#",
    children: [
      { label: "Overview", href: "#", icon: Icons.chart },
      { label: "Members", href: "#", active: true, icon: Icons.users },
      { label: "Calendar", href: "#", icon: Icons.calendar },
    ],
  },
  {
    label: "Projects",
    icon: Icons.folder,
    href: "#",
    children: [
      { label: "All Projects", href: "#", icon: Icons.folder },
      { label: "Documentation", href: "#", icon: Icons.document },
    ],
  },
  {
    label: "Settings",
    icon: Icons.settings,
    href: "#",
  },
];

export const Light: Story = {
  args: {
    variant: "light",
    brand: "Dashboard",
    menuItems: defaultMenuItems,
  },
};

export const Dark: Story = {
  args: {
    variant: "dark",
    brand: "Dashboard",
    menuItems: defaultMenuItems,
  },
};

export const WithoutIcons: Story = {
  args: {
    variant: "light",
    brand: "Dashboard",
    menuItems: defaultMenuItems.map(({ icon, ...item }) => item),
  },
};

export const SimpleMenu: Story = {
  args: {
    variant: "light",
    brand: "Simple Menu",
    menuItems: [
      { label: "Home", href: "#", active: true, icon: Icons.home },
      { label: "Projects", href: "#", icon: Icons.folder },
      { label: "Settings", href: "#", icon: Icons.settings },
    ],
  },
};

export const WithNestedItems: Story = {
  args: {
    variant: "light",
    brand: "Nested Menu",
    menuItems: [
      {
        label: "Projects",
        icon: Icons.folder,
        href: "#",
        children: [
          { label: "Overview", href: "#", icon: Icons.chart },
          { label: "Documents", href: "#", icon: Icons.document },
          { label: "Calendar", href: "#", icon: Icons.calendar },
        ],
      },
      {
        label: "Team",
        icon: Icons.users,
        href: "#",
        children: [
          { label: "Members", href: "#", icon: Icons.users },
          { label: "Schedule", href: "#", icon: Icons.calendar },
        ],
      },
    ],
  },
};

export const WithNotifications: Story = {
  args: {
    variant: "light",
    brand: "Notifications",
    menuItems: [
      {
        label: "Inbox",
        icon: Icons.inbox,
        href: "#",
        active: true,
        badge: "5",
      },
      {
        label: "Messages",
        icon: Icons.message,
        href: "#",
        badge: "3",
      },
      {
        label: "Notifications",
        icon: Icons.bell,
        href: "#",
        badge: "New",
      },
    ],
  },
};

export const WithCommunication: Story = {
  args: {
    variant: "light",
    brand: "Communication",
    menuItems: [
      {
        label: "Team Chat",
        icon: Icons.message,
        href: "#",
        children: [
          {
            label: "General",
            href: "#",
            icon: Icons.message,
            badge: "2",
          },
          {
            label: "Announcements",
            href: "#",
            icon: Icons.notification,
            badge: "New",
          },
        ],
      },
      {
        label: "Notifications",
        icon: Icons.bell,
        href: "#",
        children: [
          {
            label: "Mentions",
            href: "#",
            icon: Icons.notification,
            badge: "3",
          },
          {
            label: "Inbox",
            href: "#",
            icon: Icons.inbox,
            badge: "5",
          },
        ],
      },
    ],
  },
};

export const WithIconsAndBadges: Story = {
  args: {
    variant: "light",
    brand: "Dashboard",
    menuItems: [
      {
        label: "Overview",
        icon: Icons.dashboard,
        href: "#",
        active: true,
      },
      {
        label: "Messages",
        icon: Icons.message,
        href: "#",
        badge: "12",
      },
      {
        label: "Notifications",
        icon: Icons.bell,
        href: "#",
        badge: "New",
        children: [
          {
            label: "Alerts",
            href: "#",
            icon: Icons.notification,
            badge: "3",
          },
          {
            label: "Updates",
            href: "#",
            icon: Icons.inbox,
            badge: "New",
          },
        ],
      },
    ],
  },
};

export const WithLeftIcons: Story = {
  args: {
    variant: "light",
    brand: "Menu with Left Icons",
    menuItems: [
      {
        label: "Dashboard",
        icon: Icons.dashboard,
        leftIcon: Icons.chevronRight,
        href: "#",
        active: true,
      },
      {
        label: "Favorites",
        icon: Icons.star,
        leftIcon: Icons.chevronRight,
        href: "#",
        children: [
          {
            label: "Starred Items",
            href: "#",
            icon: Icons.star,
            leftIcon: Icons.dot,
          },
          {
            label: "Important",
            href: "#",
            icon: Icons.notification,
            leftIcon: Icons.dot,
            badge: "New",
          },
        ],
      },
      {
        label: "Quick Access",
        icon: Icons.arrowRight,
        leftIcon: Icons.chevronRight,
        href: "#",
        children: [
          {
            label: "Recent",
            href: "#",
            icon: Icons.clock,
            leftIcon: Icons.dot,
          },
          {
            label: "Offline",
            href: "#",
            icon: Icons.download,
            leftIcon: Icons.dot,
          },
        ],
      },
    ],
  },
};

export const WithDotIndicators: Story = {
  args: {
    variant: "light",
    brand: "Menu with Dots",
    menuItems: [
      {
        label: "Active Item",
        icon: Icons.dashboard,
        leftIcon: Icons.dot,
        href: "#",
        active: true,
      },
      {
        label: "With Badge",
        icon: Icons.bell,
        leftIcon: Icons.dot,
        href: "#",
        badge: "3",
      },
      {
        label: "Nested Items",
        icon: Icons.folder,
        leftIcon: Icons.dot,
        href: "#",
        children: [
          {
            label: "Sub Item 1",
            href: "#",
            icon: Icons.document,
            leftIcon: Icons.dot,
          },
          {
            label: "Sub Item 2",
            href: "#",
            icon: Icons.chart,
            leftIcon: Icons.dot,
          },
        ],
      },
    ],
  },
};

import type { Meta, StoryObj } from "@storybook/angular";
import { NavbarComponent } from "./navbar.component";
import { moduleMetadata } from "@storybook/angular";

const meta: Meta<NavbarComponent> = {
  title: "Components/Navbar",
  component: NavbarComponent,
  decorators: [
    moduleMetadata({
      imports: [NavbarComponent],
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
type Story = StoryObj<NavbarComponent>;

const defaultMenuItems = [
  { label: "Home", href: "#", active: true },
  { label: "Features", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "About", href: "#" },
  { label: "Contact", href: "#" },
];

export const Light: Story = {
  args: {
    variant: "light",
    brand: "Company",
    menuItems: defaultMenuItems,
  },
};

export const Dark: Story = {
  args: {
    variant: "dark",
    brand: "Company",
    menuItems: defaultMenuItems,
  },
};

export const WithLongBrand: Story = {
  args: {
    variant: "light",
    brand: "Very Long Company Name",
    menuItems: defaultMenuItems,
  },
};

export const WithManyItems: Story = {
  args: {
    variant: "light",
    brand: "Company",
    menuItems: [
      ...defaultMenuItems,
      { label: "Services", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Support", href: "#" },
    ],
  },
};

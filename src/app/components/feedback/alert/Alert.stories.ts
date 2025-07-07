import { Meta, StoryObj, moduleMetadata } from "@storybook/angular";
import { Component, Input } from "@angular/core";
import { AlertComponent } from "./alert.component";
import { AlertTitleComponent } from "./alert-title.component";
import { CommonModule } from "@angular/common";
import {
  LucideAngularModule,
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  XCircle,
  X,
  Popcorn,
} from "lucide-angular";

@Component({
  selector: "button-wrapper",
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [class]="
        'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors ' +
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2' +
        'disabled:pointer-events-none disabled:opacity-50' +
        (color === 'inherit' ? 'border border-current' : '')
      "
      [style.padding]="size === 'small' ? '0 8px' : '0 16px'"
      [style.height]="size === 'small' ? '24px' : '36px'"
    >
      <ng-content></ng-content>
    </button>
  `,
})
export class ButtonComponent {
  @Input() color: "inherit" | "primary" = "inherit";
  @Input() size: "small" | "medium" = "small";
}

const meta: Meta<AlertComponent> = {
  title: "Feedback/Alert",
  component: AlertComponent,
  tags: ["autodocs"],
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        AlertTitleComponent,
        ButtonComponent,
        LucideAngularModule.pick({
          CheckCircle,
          AlertCircle,
          AlertTriangle,
          XCircle,
          X,
          Popcorn,
        }),
      ],
    }),
  ],
  argTypes: {
    severity: {
      control: "select",
      options: ["success", "info", "warning", "error"],
      description: "The severity of the alert",
      defaultValue: "success",
    },
    variant: {
      control: "select",
      options: ["default", "filled", "outlined"],
      description: "The variant of the alert",
      defaultValue: "default",
    },
    color: {
      control: "select",
      options: ["success", "info", "warning", "error"],
      description: "Override the default color for the specified severity",
    },
    icon: {
      control: "boolean",
      description: "Whether to show the icon",
      defaultValue: true,
    },
    closeHandle: {
      action: "closed",
      description: "Callback fired when the component requests to be closed",
    },
  },
};

export default meta;
type Story = StoryObj<AlertComponent>;

// Severity Stories
export const Severity: Story = {
  args: {
    severity: "success",
  },
  render: (args) => ({
    props: args,
    template: `<div class='flex w-[500px] m-auto flex-col gap-4'>
    <xui-alert severity="success">This is a success Alert.</xui-alert>
    <xui-alert severity="info">This is a info Alert.</xui-alert>
    <xui-alert severity="warning">This is a warning Alert.</xui-alert>
    <xui-alert severity="error">This is a error Alert.</xui-alert>
    
    </div>`,
  }),
};

// Variant Stories
export const FilledVariants: Story = {
  render: () => ({
    template: `
      <div class="flex w-[500px] m-auto flex-col gap-4">
        <xui-alert variant="filled" severity="success">This is a filled success Alert.</xui-alert>
        <xui-alert variant="filled" severity="info">This is a filled info Alert.</xui-alert>
        <xui-alert variant="filled" severity="warning">This is a filled warning Alert.</xui-alert>
        <xui-alert variant="filled" severity="error">This is a filled error Alert.</xui-alert>
      </div>
    `,
  }),
};

export const OutlinedVariants: Story = {
  render: () => ({
    template: `
      <div class="flex w-[500px] m-auto flex-col gap-4">
        <xui-alert variant="outlined" severity="success">This is an outlined success Alert.</xui-alert>
        <xui-alert variant="outlined" severity="info">This is an outlined info Alert.</xui-alert>
        <xui-alert variant="outlined" severity="warning">This is an outlined warning Alert.</xui-alert>
        <xui-alert variant="outlined" severity="error">This is an outlined error Alert.</xui-alert>
      </div>
    `,
  }),
};

// Color Story
export const ColorOverride: Story = {
  args: {
    severity: "success",
    color: "warning",
  },
  render: (args) => ({
    props: args,
    template: `<div class='flex w-[500px] m-auto flex-col gap-4'>
    <xui-alert [severity]="severity" [color]="color">This is a success Alert with warning colors.</xui-alert>,
    </div>`,
  }),
};

// Actions Story
export const Actions: Story = {
  render: () => ({
    props: {
      onCloseHandler: () => {
        console.log("Alert closed");
      },
    },
    template: `
      <div class="flex w-[500px] m-auto flex-col gap-4">
      <ng-template #actionTpl>
            <button-wrapper color="primary" size="small">Undo</button-wrapper>
          </ng-template>
        <xui-alert severity="warning" (closeHandle)="onCloseHandler()">This Alert displays the default close icon.</xui-alert>
        <xui-alert severity="success" [action]="actionTpl">
          This Alert uses a Button component for its action.
          
        </xui-alert>
      </div>
    `,
  }),
};

// Icons Story
export const Icons: Story = {
  render: () => ({
    template: `
      <div class='flex w-[600px] m-auto flex-col gap-4'>
       <xui-alert severity="info">
          This Alert uses a custom icon.
          <ng-template #icon>
            😎
          </ng-template>
        </xui-alert>
        <xui-alert severity="success" [icon]="false">
          This success Alert has no icon.
        </xui-alert>
        <ng-template #customSuccessIcon>
          🤖
        </ng-template>

      <xui-alert
        severity="success"
        [iconMapping]="{ success: customSuccessIcon }"
      >
        This success Alert uses <code>iconMapping</code> to override the default icon.
      </xui-alert>
       
      </div>
    `,
  }),
};

// Titles Story
export const Titles: Story = {
  render: () => ({
    template: `
      <div class='flex w-[500px] m-auto flex-col gap-4'>
        <xui-alert severity="success">
          <xui-alert-title>Success</xui-alert-title>
          This is a success Alert with an encouraging title.
        </xui-alert>
        <xui-alert severity="info">
          <xui-alert-title>Info</xui-alert-title>
          This is an info Alert with an informative title.
        </xui-alert>
        <xui-alert severity="warning">
          <xui-alert-title>Warning</xui-alert-title>
          This is a warning Alert with a cautious title.
        </xui-alert>
        <xui-alert severity="error">
          <xui-alert-title>Error</xui-alert-title>
          This is an error Alert with a scary title.
        </xui-alert>
      </div>
    `,
  }),
};
export const ShadeCNLike: Story = {
  render: () => ({
    template: `
      <div class='flex w-[500px] m-auto flex-col gap-4'>
        <xui-alert severity="success" variant="outlined">
          <xui-alert-title>Success! Your changes have been saved</xui-alert-title>
          This is an alert with icon, title and description.
        </xui-alert>
        <xui-alert severity="success" variant="outlined">
            <xui-alert-title>This Alert has a title and an icon. No description.</xui-alert-title>
          <ng-template #icon>
              <lucide-icon name="Popcorn" class="text-green-600 mt-0.5 h-5 w-5"></lucide-icon>          
          </ng-template>
        </xui-alert>

        <xui-alert severity="error" variant='outlined'>
          <xui-alert-title>Unable to process your payment.</xui-alert-title>
            <p class="mt-2">Please verify your billing information and try again.</p>
            <ul class="mt-2 list-inside list-disc text-sm">
              <li>Check your card details</li>
              <li>Ensure sufficient funds</li>
              <li>Verify billing address</li>
            </ul>
        </xui-alert>
      </div>
    `,
  }),
};

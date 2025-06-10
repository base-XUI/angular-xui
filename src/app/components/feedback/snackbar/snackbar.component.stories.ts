import {
  Meta,
  StoryObj,
  moduleMetadata,
  applicationConfig,
} from "@storybook/angular";
import { SnackbarComponent } from "./snackbar.component";
import { Component, Input, TemplateRef, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { provideAnimations } from "@angular/platform-browser/animations";
import { SnackbarAnchorOrigin } from "./snackbar.types";
import { ButtonComponent } from "../../inputs/button/button.component";

@Component({
  selector: "snackbar-story-wrapper",
  standalone: true,
  imports: [SnackbarComponent, CommonModule, ButtonComponent],
  template: `
    <div class="p-4">
      <div class="mb-4 flex gap-2">
        <button
          (click)="toggleSnackbar()"
          class="rounded bg-primary px-4 py-2 text-white"
        >
          {{ open ? "Close" : "Open" }} Snackbar
        </button>
      </div>

      <ng-template #actionTemplate>
        <button
          (click)="handleAction()"
          class="rounded px-2 py-1 text-xs font-medium text-cyan-950 focus:outline-none"
          [ngClass]="actionButtonClass"
        >
          ACTION
        </button>
      </ng-template>

      <app-snackbar
        [open]="open"
        [message]="message"
        [action]="showAction ? actionTemplate : undefined"
        [autoHideDuration]="autoHideDuration"
        [anchorOrigin]="anchorOrigin"
        [withCloseIcon]="withCloseIcon"
        (closeHandle)="handleClose()"
      >
      </app-snackbar>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        min-height: 400px;
      }
    `,
  ],
})
class SnackbarStoryWrapperComponent {
  @ViewChild("actionTemplate") actionTemplate!: TemplateRef<unknown>;

  @Input() open: boolean = false;
  @Input() message: string = "";
  @Input() showAction: boolean = false;
  @Input() customIcon?: TemplateRef<unknown> = undefined;
  @Input() autoHideDuration: number = 5000;
  @Input() anchorOrigin: SnackbarAnchorOrigin = {
    vertical: "bottom",
    horizontal: "left",
  };

  @Input() withCloseIcon: boolean = true;
  @Input() closeIcon?: TemplateRef<unknown> = undefined;

  get actionButtonClass(): string {
    return "text-white border border-white hover:bg-white hover:bg-opacity-10";
  }

  toggleSnackbar(): void {
    this.open = !this.open;
  }

  handleClose(): void {
    this.open = false;
    console.log("Snackbar closed");
  }

  handleAction(): void {
    console.log("Action clicked");
    this.open = false;
  }

  resetAutoHide(): void {
    this.open = false;
    setTimeout(() => {
      this.open = true;
    }, 100);
  }
}

// New component for position demo
@Component({
  selector: "snackbar-position-wrapper",
  standalone: true,
  imports: [SnackbarComponent, CommonModule, ButtonComponent],
  template: `
    <div class="p-4">
      <div class="m-auto w-[500px]">
        <!-- Top row -->
        <div class="mb-8 flex justify-center">
          <button
            (click)="showSnackbarAt('top', 'center')"
            class="rounded bg-blue-500 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-600"
          >
            TOP-CENTER
          </button>
        </div>
        <div class="mb-8 flex justify-between">
          <button
            (click)="showSnackbarAt('top', 'left')"
            class="rounded bg-blue-500 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-600"
          >
            TOP-LEFT
          </button>
          <button
            (click)="showSnackbarAt('top', 'right')"
            class="rounded bg-blue-500 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-600"
          >
            TOP-RIGHT
          </button>
        </div>

        <!-- Bottom row -->
        <div class="mb-8 flex justify-between">
          <button
            (click)="showSnackbarAt('bottom', 'left')"
            class="rounded bg-blue-500 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-600"
          >
            BOTTOM-LEFT
          </button>

          <button
            (click)="showSnackbarAt('bottom', 'right')"
            class="rounded bg-blue-500 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-600"
          >
            BOTTOM-RIGHT
          </button>
        </div>
        <div class="mb-8 flex justify-center">
          <button
            (click)="showSnackbarAt('bottom', 'center')"
            class="rounded bg-blue-500 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-600"
          >
            BOTTOM-CENTER
          </button>
        </div>
      </div>

      <ng-template #actionTemplate>
        <app-button
          (click)="handleAction()"
          variant="outlined"
          color="primary"
          size="small"
        >
          Undo
        </app-button>
      </ng-template>

      <app-snackbar
        [open]="open"
        [message]="currentMessage"
        [action]="showAction ? actionTemplate : undefined"
        [autoHideDuration]="autoHideDuration"
        [anchorOrigin]="currentPosition"
        [withCloseIcon]="withCloseIcon"
        (closeHandle)="handleClose()"
      >
      </app-snackbar>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        min-height: 500px;
      }
    `,
  ],
})
class SnackbarPositionWrapperComponent {
  @ViewChild("actionTemplate") actionTemplate!: TemplateRef<unknown>;

  @Input() showAction: boolean = false;
  @Input() autoHideDuration: number = 0; // Don't auto-hide for position demo
  @Input() withCloseIcon: boolean = true;

  open: boolean = false;
  currentMessage: string = "";
  currentPosition: SnackbarAnchorOrigin = {
    vertical: "bottom",
    horizontal: "left",
  };

  showSnackbarAt(
    vertical: "top" | "bottom",
    horizontal: "left" | "center" | "right",
  ): void {
    this.currentPosition = { vertical, horizontal };
    this.currentMessage = `Snackbar positioned at ${vertical}-${horizontal}`;
    this.open = true;
  }

  closeSnackbar(): void {
    this.open = false;
  }

  handleClose(): void {
    this.open = false;
    console.log("Snackbar closed");
  }

  handleAction(): void {
    console.log("Action clicked");
    this.open = false;
  }
}

export default {
  title: "Components/Feedback/Snackbar",
  component: SnackbarComponent,
  decorators: [
    moduleMetadata({
      imports: [
        SnackbarComponent,
        SnackbarStoryWrapperComponent,
        SnackbarPositionWrapperComponent,
        CommonModule,
      ],
    }),
    applicationConfig({
      providers: [provideAnimations()],
    }),
  ],
  tags: ["autodocs"],
  render: (args) => ({
    props: args,
    template: `
      <snackbar-story-wrapper
        [open]="open"
        [message]="message"
        [showAction]="showAction"
        [autoHideDuration]="autoHideDuration"
        [anchorOrigin]="anchorOrigin"
        [withCloseIcon]="withCloseIcon">
      </snackbar-story-wrapper>
    `,
  }),
  parameters: {
    docs: {
      description: {
        component: `
# Snackbar Component

The Snackbar component provides brief messages about app processes. They appear temporarily at the bottom or top of the screen.

## Features

- Customizable position
- Auto-hide functionality
- Custom actions
- Animation transitions
`,
      },
    },
  },
  argTypes: {
    message: {
      control: "text",
      description: "The message to display in the snackbar",
    },
    open: {
      control: "boolean",
      description: "Controls the visibility of the snackbar",
    },
    showAction: {
      control: "boolean",
      description: "Whether to show an action button",
    },
    autoHideDuration: {
      control: { type: "number", min: 0, step: 1000 },
      description:
        "The number of milliseconds to wait before automatically closing the snackbar",
    },
    anchorOrigin: {
      control: "object",
      description: "The position where the snackbar should appear",
    },

    withCloseIcon: {
      control: "boolean",
      description: "Whether to show a close icon",
    },
  },
} as Meta<SnackbarStoryWrapperComponent>;

type Story = StoryObj<SnackbarStoryWrapperComponent>;

export const Basic: Story = {
  args: {
    open: true,
    message: "This is a default snackbar",
    showAction: false,
    autoHideDuration: 5000,
    anchorOrigin: { vertical: "bottom", horizontal: "left" },
    withCloseIcon: true,
  },
};

export const Positions: StoryObj<SnackbarPositionWrapperComponent> = {
  render: (args) => ({
    moduleMetadata: {
      imports: [SnackbarPositionWrapperComponent],
    },
    props: args,
    template: `
      <snackbar-position-wrapper
        [showAction]="showAction"
        [autoHideDuration]="autoHideDuration"
        [withCloseIcon]="withCloseIcon">
      </snackbar-position-wrapper>
    `,
  }),
  args: {
    showAction: false,
    autoHideDuration: 0, // Don't auto-hide for position demo
    withCloseIcon: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Click the position buttons to see how the snackbar appears in different locations on the screen.",
      },
    },
  },
};

export const BottomCenter: Story = {
  args: {
    ...Basic.args,
    message: "This snackbar appears in the bottom center.",
    anchorOrigin: { vertical: "bottom", horizontal: "center" },
  },
};

// Custom story wrapper component for demonstrating content projection
@Component({
  selector: "snackbar-custom-content-wrapper",
  standalone: true,
  imports: [SnackbarComponent, CommonModule],
  template: `
    <div class="p-4">
      <div class="mb-4 flex gap-2">
        <button
          (click)="toggleSnackbar()"
          class="rounded bg-primary px-4 py-2 text-white"
        >
          {{ open ? "Close" : "Open" }} Snackbar
        </button>
      </div>

      <app-snackbar
        [open]="open"
        [autoHideDuration]="autoHideDuration"
        [anchorOrigin]="anchorOrigin"
        [withCloseIcon]="withCloseIcon"
        (closeHandle)="handleClose()"
      >
        <div>
          <h3>Custom content title</h3>
          <div class="flex items-center">
            <span class="mr-2 text-lg">🎉</span>
            <span class="font-medium">Custom Content</span>
            <span class="ml-2 text-sm italic">with rich formatting</span>
          </div>
        </div>
      </app-snackbar>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        min-height: 400px;
      }
    `,
  ],
})
class SnackbarCustomContentWrapperComponent {
  @Input() open: boolean = false;
  @Input() autoHideDuration: number = 5000000;
  @Input() anchorOrigin: SnackbarAnchorOrigin = {
    vertical: "bottom",
    horizontal: "left",
  };

  @Input() withCloseIcon: boolean = true;

  toggleSnackbar(): void {
    this.open = !this.open;
  }

  handleClose(): void {
    this.open = false;
    console.log("Snackbar closed");
  }
}

export const WithCustomContent: Story = {
  render: (args) => ({
    moduleMetadata: {
      imports: [SnackbarCustomContentWrapperComponent],
    },
    props: args,
    template: `
      <snackbar-custom-content-wrapper
        [open]="open"
        [autoHideDuration]="autoHideDuration"
        [anchorOrigin]="anchorOrigin"
        [severity]="severity"
        [variant]="variant"
        [withCloseIcon]="withCloseIcon">
      </snackbar-custom-content-wrapper>
    `,
  }),
  args: {
    ...Basic.args,
    message: undefined, // No message as we're using custom content
  },
  parameters: {
    docs: {
      description: {
        story:
          'This example demonstrates how to use custom content projection instead of the "message" property. When content is projected into the component, it takes precedence over the message property.',
      },
    },
  },
};

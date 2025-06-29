import { moduleMetadata, Meta, StoryObj } from "@storybook/angular";
import {
  LucideAngularModule,
  Check,
  Minus,
  Heart,
  Star,
  Circle,
  MinusSquare,
  CheckCircle,
  Square,
  CheckSquare,
} from "lucide-angular";
import { CommonModule } from "@angular/common";
import { useArgs } from "@storybook/preview-api";
import { CheckboxComponent } from "./checkbox.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

const meta: Meta<CheckboxComponent> = {
  title: "Inputs/Checkbox",
  component: CheckboxComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        LucideAngularModule.pick({
          Check,
          Minus,
          Heart,
          Star,
          Circle,
          MinusSquare,
          CheckCircle,
          Square,
          CheckSquare,
        }),
        CheckboxComponent,
      ],
    }),
  ],
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    checked: {
      control: "boolean",
      description: "If `true`, the component is controlled and checked.",
    },
    defaultChecked: {
      control: "boolean",
      description:
        "The default checked state when the component is not controlled.",
    },
    indeterminate: {
      control: "boolean",
      description: "If `true`, the checkbox is in an indeterminate state.",
    },

    color: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "success",
        "error",
        "info",
        "warning",
        "muted",
      ],
      description: "The color of the component.",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "The size of the component.",
    },
    className: {
      control: "text",
      description: "The CSS class name of the wrapper element.",
    },

    disabled: {
      control: "boolean",
      description: "If `true`, the component is disabled.",
    },
    required: {
      control: "boolean",
      description: "If `true`, the `input` element is required.",
    },

    name: {
      control: "text",
      description: "The `name` attribute of the `input` element.",
    },
    value: {
      control: "text",
      description: "The `value` attribute of the `input` element.",
    },
    id: {
      control: "text",
      description:
        "The `id` of the `input` element. If not provided, a unique ID is generated.",
    },

    icon: {
      control: "text",
      description:
        "The Lucide icon name for the unchecked state. Set to empty string for default circle border.",
    },
    checkedIcon: {
      control: "text",
      description: "The Lucide icon name for the checked state.",
    },
    indeterminateIcon: {
      control: "text",
      description: "The Lucide icon name for the indeterminate state.",
    },
    checkboxChange: {
      action: "checkboxChange",
      description: "Callback fired when the state is changed.",
    },
  },
};

export default meta;

type Story = StoryObj<CheckboxComponent>;

export const Interactive: Story = {
  args: {
    checked: false,
    defaultChecked: true,
    color: "primary",
    size: "medium",
    disabled: false,
    required: false,
    indeterminate: false,
    icon: "",
    checkedIcon: "Check",
    indeterminateIcon: "Minus",
    name: "interactive-checkbox",
    value: "interactive-value",
    className: "",
    id: "interactive-checkbox-1",
  },
  render: (args) => {
    const [_, updateArgs] = useArgs();

    const handleChange = (event: Event) => {
      const input = event.target as HTMLInputElement;
      updateArgs({ checked: input.checked, defaultChecked: input.checked });
    };

    return {
      props: {
        ...args,
        checkboxChange: handleChange,
      },
      template: `
        <div class="p-4">
          <xui-checkbox
            [id]="id"
            [name]="name"
            [className]="className"
            [checked]="checked || defaultChecked"
            [defaultChecked]="defaultChecked"
            [value]="value"
            [color]="color"
            [size]="size"
            [disabled]="disabled"
            [required]="required"
            [indeterminate]="indeterminate"
            [icon]="icon"
            [checkedIcon]="checkedIcon"
            [indeterminateIcon]="indeterminateIcon"
            (change)="checkboxChange($event)"
          ></xui-checkbox>
     
        </div>
      `,
    };
  },
};

export const AllColors: Story = {
  render: () => ({
    template: `
      <div class="grid grid-cols-4 gap-4 p-4">
        ${[
          "primary",
          "secondary",
          "success",
          "error",
          "info",
          "warning",
          "muted",
          "default",
        ]
          .map(
            (color) => `
            <div class="text-center">
              <xui-checkbox color="${color}" [checked]="true"></xui-checkbox>
              <p class="mt-2 text-sm capitalize">${color}</p>
            </div>
          `,
          )
          .join("")}
      </div>
    `,
  }),
};

export const AllSizes: Story = {
  render: () => ({
    template: `
      <div class="flex items-center justify-center gap-6 p-4">
        ${["small", "medium", "large"]
          .map(
            (size) => `
            <div class="text-center">
              <xui-checkbox size="${size}" [checked]="true"></xui-checkbox>
              <p class="mt-2 text-sm capitalize">${size}</p>
            </div>
          `,
          )
          .join("")}
      </div>
    `,
  }),
};
export const States: Story = {
  render: () => ({
    template: `
      <div class="grid grid-cols-2 gap-4 p-4">
        ${[
          { label: "Unchecked", checked: false, disabled: false },
          { label: "Checked", checked: true, disabled: false },
          { label: "Indeterminate", indeterminate: true, disabled: false },
          { label: "Disabled Unchecked", checked: false, disabled: true },
          { label: "Disabled Checked", checked: true, disabled: true },
          { label: "Required", required: true, checked: false },
        ]
          .map(
            (item) => `
          <div class="flex items-center gap-2">
            <xui-checkbox
              [checked]="${item.checked}"
              [indeterminate]="${item.indeterminate || false}"
              [disabled]="${item.disabled || false}"
              [required]="${item.required || false}"
            ></xui-checkbox>
            <span ${item.disabled ? 'class="text-gray-400"' : ""}>${item.label}</span>
          </div>
        `,
          )
          .join("")}
      </div>
    `,
  }),
};

export const CustomIcons: Story = {
  render: () => ({
    template: `
      <div class="space-y-6 p-4">
        <div class="space-y-4">
          <h3 class="text-lg font-medium">Custom Icons for Different States</h3>
          <div class="grid grid-cols-3 gap-6">
            <div class="text-center space-y-2">
              <xui-checkbox 
                [checked]="false" 
                icon="Circle"
                checkedIcon="CheckCircle"
                color="primary"
              ></xui-checkbox>
              <p class="text-sm">Unchecked: Circle<br>Checked: CheckCircle</p>
            </div>
            <div class="text-center space-y-2">
              <xui-checkbox 
                [checked]="true" 
                icon="Heart"
                checkedIcon="Heart"
                color="error"
              ></xui-checkbox>
              <p class="text-sm">Heart Icon (Both States)</p>
            </div>
            <div class="text-center space-y-2">
              <xui-checkbox 
                [indeterminate]="true" 
                icon="Square"
                checkedIcon="CheckSquare"
                indeterminateIcon="MinusSquare"
                color="info"
              ></xui-checkbox>
              <p class="text-sm">Square Icons<br>Indeterminate</p>
            </div>
          </div>
        </div>
        
        <div class="space-y-4">
          <h3 class="text-lg font-medium">With vs Without Icon</h3>
          <div class="flex items-center gap-8">
            <div class="text-center space-y-2">
              <xui-checkbox [checked]="false" color="primary"></xui-checkbox>
              <p class="text-sm">Default (No unchecked icon)</p>
            </div>
            <div class="text-center space-y-2">
              <xui-checkbox 
                [checked]="false" 
                icon="Circle"
                checkedIcon="Check"
                color="primary"
              ></xui-checkbox>
              <p class="text-sm">With Circle icon when unchecked</p>
            </div>
            <div class="text-center space-y-2">
              <xui-checkbox 
                [checked]="false" 
                icon="Star"
                checkedIcon="Star"
                color="warning"
              ></xui-checkbox>
              <p class="text-sm">Star icon (both states)</p>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
};

const preferences = [
  {
    value: "newsletter",
    label: "Subscribe to newsletter (Required)",
    required: true,
  },
  { value: "notifications", label: "Enable notifications", required: false },
  {
    value: "marketing",
    label: "Receive marketing emails",
    defaultChecked: true,
  },
];

export const FormIntegration: Story = {
  render: () => ({
    props: {
      onSubmit: (event: Event) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const selectedPreferences = Array.from(
          form.querySelectorAll('input[name="preferences"]:checked'),
        ).map((input) => (input as HTMLInputElement).value);
        alert(`Form Submitted! Preferences: ${selectedPreferences.join(", ")}`);
      },
    },
    template: `
      <form class="p-4 space-y-4 border rounded-md" (ngSubmit)="onSubmit($event)">
        <div>
          <label class="block text-sm font-medium mb-2">Choose your preferences:</label>
          <div class="space-y-2">
            ${preferences
              .map(
                (pref) => `
              <div class="flex items-center gap-2">
                <xui-checkbox 
                  name="preferences"
                  value="${pref.value}"
                  [required]="${pref.required || false}"
                  [defaultChecked]="${pref.defaultChecked || false}"
                ></xui-checkbox>
                <span>${pref.label}</span>
              </div>
            `,
              )
              .join("")}
          </div>
        </div>
        <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded">
          Submit Form
        </button>
      </form>
    `,
  }),
};

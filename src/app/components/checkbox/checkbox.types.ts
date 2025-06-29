import { TemplateRef, Type } from "@angular/core";

export type CheckboxColor =
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "info"
  | "warning"
  | "muted";

export type CheckboxSize = "small" | "medium" | "large";

export type Primitive = string | number | boolean | undefined;

export type CheckboxState = "checked" | "unchecked" | "indeterminate";

export type IconType = string | TemplateRef<unknown> | Type<unknown>;

export type CheckboxBaseProps = {
  id?: string;
  name?: string;
  value?: Primitive;
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  required?: boolean;
  color?: CheckboxColor;
  size?: CheckboxSize;
  className?: string;
  icon?: string;
  checkedIcon?: string;
  indeterminateIcon?: string;
  checkedChange?: (checked: boolean) => void;
};

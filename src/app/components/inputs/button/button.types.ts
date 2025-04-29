import { TemplateRef } from "@angular/core";
import { VariantProps } from "class-variance-authority";
import { buttonVariants } from "./variants";

/**
 * Base props for the Button component
 */
export type ButtonBaseProps = {
  /**
   * If true, the button will show a loading indicator.
   */
  loading?: boolean;
  /**
   * The position of the loading indicator.
   */
  loadingPosition?: "start" | "center" | "end";
  /**
   * Element displayed when the button is in loading state.
   */
  loadingIndicator?: TemplateRef<unknown>;
  /**
   * Element placed before the children.
   */
  startIcon?: TemplateRef<unknown>;
  /**
   * Element placed after the children.
   */
  endIcon?: TemplateRef<unknown>;
  /**
   * If true, the button will be disabled.
   */
  disabled?: boolean;
  /**
   * Type of the button.
   */
  type?: "button" | "submit" | "reset";
  /**
   * The component type to render as (for polymorphic usage)
   */
  component?: string;
  /**
   * Optional href for when component is 'a'
   */
  href?: string;
  /**
   * Optional target for when component is 'a'
   */
  target?: string;
  /**
   * Optional ARIA role
   */
  role?: string;
} & VariantProps<typeof buttonVariants>;

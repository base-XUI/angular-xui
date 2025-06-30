import { TemplateRef } from "@angular/core";

/**
 * Alert severity levels
 */
export type AlertSeverity = "success" | "info" | "warning" | "error";

/**
 * Alert style variants
 */
export type AlertVariant = "filled" | "outlined" | "default";

/**
 * Alert component props
 */
export interface AlertProps {
  /**
   * The severity of the alert. This defines the color and icon used.
   * @default 'success'
   */
  severity?: AlertSeverity;

  /**
   * The variant to use for styling the alert.
   * @default 'default'
   */
  variant?: AlertVariant;

  /**
   * Override the default color for the specified severity.
   */
  color?: AlertSeverity;

  /**
   * Override the icon displayed before the message.
   * Set to false to remove the icon altogether.
   */
  icon?: TemplateRef<unknown> | boolean;

  /**
   * The action to display at the end of the alert.
   */
  action?: TemplateRef<unknown>;

  /**
   * Callback fired when the component requests to be closed.
   */
  onClose?: () => void;

  /**
   * Override the default icons for each severity level.
   */
  iconMapping?: {
    [key in AlertSeverity]?: TemplateRef<unknown>;
  };
}

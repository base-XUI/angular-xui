import { TemplateRef } from "@angular/core";

export interface TabBaseProps {
  /**
   * The content of the component.
   */
  // children are handled by Angular's content projection

  /**
   * If true, the component is disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * The icon to display.
   */
  icon?: TemplateRef<any> | null;

  /**
   * The label for the tab.
   */
  label?: string;

  /**
   * You can provide your own value. Otherwise, we fallback to the child position index.
   */
  value: any;

  /**
   * If true, the tab will have a ripple effect when clicked.
   * @default true
   */
  disableRipple?: boolean;

  /**
   * Override or extend the styles applied to the component.
   */
  className?: string;

  /**
   * If true, the keyboard focus ripple is disabled.
   * @default false
   */
  disableFocusRipple?: boolean;
}

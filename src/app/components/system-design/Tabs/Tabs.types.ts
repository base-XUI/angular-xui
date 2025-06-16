import { EventEmitter } from "@angular/core";

export interface TabsBaseProps {
  /**
   * Callback fired when the value changes.
   */
  valueChange?: EventEmitter<any>;

  /**
   * The value of the currently selected tab.
   */
  value?: any;

  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue?: any;

  /**
   * The orientation of the tabs.
   * @default 'horizontal'
   */
  orientation?: "horizontal" | "vertical";

  /**
   * Determines the tabs display variant.
   * @default 'standard'
   */
  variant?: "standard" | "scrollable" | "fullWidth";

  /**
   * Determines the color of the indicator.
   * @default 'primary'
   */
  indicatorColor?: "primary" | "secondary";

  /**
   * Determines the color of the text.
   * @default 'inherit'
   */
  textColor?: "inherit" | "primary" | "secondary";

  /**
   * Custom class name
   */
  className?: string;

  /**
   * Aria label for the tabs container
   */
  ["aria-label"]?: string | null;
}

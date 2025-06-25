export interface TabListBaseProps {
  /**
   * Override or extend the styles applied to the component.
   */
  className?: string;

  /**
   * The component orientation (layout flow direction).
   * @default 'horizontal'
   */
  orientation?: "horizontal" | "vertical";

  /**
   * If true, the scrollbar is visible.
   * @default false
   */
  visibleScrollbar?: boolean;

  /**
   * If true, the tabs will be centered.
   * @default false
   */
  centered?: boolean;

  /**
   * The variant to use.
   * @default 'standard'
   */
  variant?: "standard" | "contained" | "borderless";

  /**
   * The size of the component.
   * @default 'md'
   */
  size?: "sm" | "md" | "lg";
}

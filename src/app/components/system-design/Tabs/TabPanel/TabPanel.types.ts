export interface TabPanelBaseProps {
  /**
   * The value of the corresponding tab. Must match the value of the tab in the tab list.
   */
  value: any;

  /**
   * Override or extend the styles applied to the component.
   */
  className?: string;

  /**
   * The id of the tab panel.
   */
  id?: string;

  /**
   * Callback fired when the panel is visible.
   */
  onEnter?: () => void;

  /**
   * Callback fired when the panel is hidden.
   */
  onExit?: () => void;

  /**
   * If true, the panel will be displayed with a fade animation.
   * @default true
   */
  animate?: boolean;

  /**
   * If true, the panel will be mounted when hidden.
   * @default false
   */
  keepMounted?: boolean;

  /**
   * The variant of the tab panel.
   * @default 'standard'
   */
  variant?: "standard" | "boxed" | "borderless";

  /**
   * The animation type to use when transitioning.
   * @default 'fade'
   */
  animation?: "fade" | "slide" | "none";
}

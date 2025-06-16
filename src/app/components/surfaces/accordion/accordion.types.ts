import type { VariantProps } from "class-variance-authority";
import { accordionVariants } from "./variants";
import { TemplateRef } from "@angular/core";

/**
 * Base props for the Accordion component
 */
export type AccordionBaseProps = {
  /**
   * The content of the accordion.
   */
  children: TemplateRef<any>; //eslint-disable-line @typescript-eslint/no-explicit-any
  /**
   * The component used for the root node.
   * Either a string to use as an HTML element or a component reference.
   */
  component?: string | TemplateRef<any>; //eslint-disable-line @typescript-eslint/no-explicit-any
  /**
   * If true, disables the accordion.
   */
  disabled?: boolean;
  /**
   * The icon element to display as the expand/collapse indicator.
   */
  expandIcon?: TemplateRef<any>; //eslint-disable-line @typescript-eslint/no-explicit-any
  /**
   * If true, expands the accordion by default.
   */
  defaultExpanded?: boolean;
  /**
   * Callback fired when the accordion is expanded/collapsed.
   *  Uncontrolled mode
   */
  onChange?: (event: Event, expanded: boolean) => void;
  /**
   * If true, removes the default gutters (padding) from the accordion.
   */
  disableGutters?: boolean;
  /**
   * If true, expands the accordion (controlled mode).
   */
  expanded?: boolean;
  /**
   * If true, the accordion will have square corners.
   */
  square?: boolean;
  /**
   * Additional class name(s) for custom styling.
   */
  classes?: { root: string; details: string; summary: string };
  /**
  /**
   * The id of the accordion element.
   */
  id?: string;
  /**
   *  change the heading element using the slots
   */
  slots?: {
    heading?: { component?: string };
  };
  /**
   * The position of the icon relative to the summary text.
   * Can be "left" or "right".
   */
  iconPosition?: "left" | "right";
} & VariantProps<typeof accordionVariants>;

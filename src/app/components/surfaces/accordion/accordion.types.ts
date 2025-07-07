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
  children?: TemplateRef<any>; //eslint-disable-line @typescript-eslint/no-explicit-any
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
  expandIcon?: TemplateRef<unknown>;
  /**
   * The icon element to display as the expand/collapse indicator.
   */
  defaultIconValue?: TemplateRef<unknown>;
  /**
   * If true, expands the accordion by default.
   */
  defaultExpanded?: boolean;

  /**
   * If true, removes the default gutters (margin) from the accordion.
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
  classes?: {
    root?: string;
    summary?: { btn?: string; expandIcon?: string; content?: string };
    details?: string;
  };
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
} & VariantProps<typeof accordionVariants>;

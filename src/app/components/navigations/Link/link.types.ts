import { VariantProps } from "class-variance-authority";
import { LinkVariants } from "./variants";

/**
 * Base props for the Link component
 */
export type LinkBaseProps = {
  className?: string;
  variant?:
    | "inherit"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "subtitle1"
    | "subtitle2"
    | "body1"
    | "body2"
    | "body3"
    | "caption";
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
  underline?: "always" | "hover" | "none";
  target?: "_blank" | "_self" | string;
  rel?: "noopener" | "noreferrer";
  component?: string;
  href?: string;

  /**
   * Optional ARIA role
   */
  role?: string;
} & VariantProps<typeof LinkVariants>;

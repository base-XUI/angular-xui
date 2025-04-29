import { cva } from "class-variance-authority";

// Define variant types for better type safety
type ButtonVariant = "text" | "contained" | "outlined";
type ButtonColor =
  | "inherit"
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "info"
  | "warning";
type ButtonSize = "small" | "medium" | "large";

// Configuration object that we can export for use in stories
export const buttonVariantsConfig = {
  variants: {
    variant: {
      text: "bg-transparent hover:bg-gray-100",
      contained: "shadow-sm",
      outlined: "border bg-transparent",
    },
    color: {
      inherit: "",
      primary: "",
      secondary: "",
      success: "",
      error: "",
      info: "",
      warning: "",
    },
    size: {
      small: "h-8 px-3 text-xs",
      medium: "h-10 px-4 text-sm",
      large: "h-12 px-6 text-base",
    },
    fullWidth: {
      true: "w-full",
    },
    disableElevation: {
      true: "shadow-none",
    },
  },
  defaultVariants: {
    variant: "contained",
    color: "primary",
    size: "medium",
    fullWidth: false,
    disableElevation: false,
  },
};

export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: buttonVariantsConfig.variants,
    compoundVariants: [
      // Contained variant colors
      {
        variant: "contained",
        color: "inherit",
        className: "text-inherit hover:bg-gray-100",
      },
      {
        variant: "contained",
        color: "primary",
        className: "text-primary-foreground bg-primary hover:bg-primary/90",
      },
      {
        variant: "contained",
        color: "secondary",
        className:
          "text-secondary-foreground bg-secondary hover:bg-secondary/90",
      },
      {
        variant: "contained",
        color: "success",
        className: "text-success-foreground bg-success hover:bg-success/90",
      },
      {
        variant: "contained",
        color: "error",
        className: "text-error-foreground bg-error hover:bg-error/90",
      },
      {
        variant: "contained",
        color: "info",
        className: "text-info-foreground bg-info hover:bg-info/90",
      },
      {
        variant: "contained",
        color: "warning",
        className: "text-warning-foreground bg-warning hover:bg-warning/90",
      },
      // Outlined variant colors
      {
        variant: "outlined",
        color: "inherit",
        className: "text-inherit border-current",
      },
      {
        variant: "outlined",
        color: "primary",
        className: "text-primary border-primary",
      },
      {
        variant: "outlined",
        color: "secondary",
        className: "text-secondary border-secondary",
      },
      {
        variant: "outlined",
        color: "success",
        className: "text-success border-success",
      },
      {
        variant: "outlined",
        color: "error",
        className: "text-error border-error",
      },
      {
        variant: "outlined",
        color: "info",
        className: "text-info border-info",
      },
      {
        variant: "outlined",
        color: "warning",
        className: "text-warning border-warning",
      },
      // Text variant colors
      {
        variant: "text",
        color: "inherit",
        className: "text-inherit",
      },
      {
        variant: "text",
        color: "primary",
        className: "text-primary hover:bg-primary/10",
      },
      {
        variant: "text",
        color: "secondary",
        className: "text-secondary hover:bg-secondary/10",
      },
      {
        variant: "text",
        color: "success",
        className: "text-success hover:bg-success/10",
      },
      {
        variant: "text",
        color: "error",
        className: "text-error hover:bg-error/10",
      },
      {
        variant: "text",
        color: "info",
        className: "text-info hover:bg-info/10",
      },
      {
        variant: "text",
        color: "warning",
        className: "text-warning hover:bg-warning/10",
      },
    ],
    defaultVariants: {
      variant: "contained" as ButtonVariant,
      color: "primary" as ButtonColor,
      size: "medium" as ButtonSize,
      fullWidth: false,
      disableElevation: false,
    },
  },
);

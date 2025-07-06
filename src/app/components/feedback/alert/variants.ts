import { cva } from "class-variance-authority";

export const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 flex justify-between  gap-2",
  {
    variants: {
      variant: {
        default: "",
        filled: "border-transparent",
        outlined: "bg-transparent",
      },
      severity: {
        success: "",
        info: "",
        warning: "",
        error: "",
      },
    },
    compoundVariants: [
      // Default variant with different severities
      {
        variant: "default",
        severity: "success",
        className: "bg-success/5 text-success ",
      },
      {
        variant: "default",
        severity: "info",
        className: "bg-info/5 text-info ",
      },
      {
        variant: "default",
        severity: "warning",
        className: "bg-warning/5 text-warning ",
      },
      {
        variant: "default",
        severity: "error",
        className: "bg-error/5 text-error",
      },
      // Filled variant with different severities
      {
        variant: "filled",
        severity: "success",
        className: "bg-success text-success-foreground",
      },
      {
        variant: "filled",
        severity: "info",
        className: "bg-info text-info-foreground",
      },
      {
        variant: "filled",
        severity: "warning",
        className: "bg-warning text-warning-foreground",
      },
      {
        variant: "filled",
        severity: "error",
        className: "bg-error text-error-foreground",
      },
      // Outlined variant with different severities
      {
        variant: "outlined",
        severity: "success",
        className: "border-success/50  text-success",
      },
      {
        variant: "outlined",
        severity: "info",
        className: "border-info/50  text-info",
      },
      {
        variant: "outlined",
        severity: "warning",
        className: "border-warning/50  text-warning",
      },
      {
        variant: "outlined",
        severity: "error",
        className: "border-error/50  text-error",
      },
    ],
    defaultVariants: {
      variant: "default",
      severity: "success",
    },
  },
);

export const alertIconVariants = cva("flex-shrink-0", {
  variants: {
    variant: {
      default: "",
      filled: "text-white",
      outlined: "",
    },
    severity: {
      success: "text-success",
      info: "text-info",
      warning: "text-warning",
      error: "text-error",
    },
  },
  compoundVariants: [
    {
      variant: "filled",
      severity: ["success", "info", "warning", "error"],
      className: "text-white",
    },
  ],
  defaultVariants: {
    variant: "default",
    severity: "success",
  },
});

export const alertTitleClasses = "font-medium text-base mb-1";

export const alertActionVariants = cva("ml-auto flex-shrink-0", {
  variants: {
    variant: {
      default: "",
      filled: "",
      outlined: "",
    },
    severity: {
      success: "",
      info: "",
      warning: "",
      error: "",
    },
  },
  defaultVariants: {
    variant: "default",
    severity: "success",
  },
});
